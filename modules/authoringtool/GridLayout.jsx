var React = require('react');

var LeftMenu = require("./LeftMenu.jsx");
var _ = require("underscore");

var GridLayout = React.createClass({

    BLOCK_ID_PREFIX: "block_",

    getInitialState: function () {
        return {
            layoutable: true,
            minHeight: 768,
            zoom: 1,
            doubleScreen: 0,
            showHeader: true,
            showFooter: true,
            theme: "default"
        };
    },

    data: {
        singleScreenWidgets: [],
        doubleScreenLeftWidgets: [],
        doubleScreenRightWidgets: [],
        widgetContents: {}
    },

    /**
     * Default gridster options
     * */
    defaultGridOptions: {
        widget_margins: [1, 1],
        min_cols: 12,
        min_rows: 10,
        resize: {
            enabled: true
        },
        serialize_params: function ($w, wgd) {
            var cli = $w.clone();
            cli.find(".gs-resize-handle").remove();
            cli.find(".mce-content-body").removeAttr("id").removeAttr("contenteditable")
            .removeAttr("spellcheck").removeAttr("style").removeClass("mce-content-body");

            return {
                content: cli.html(),
                id: $w.data('id'),
                col: wgd.col,
                row: wgd.row,
                size_x: wgd.size_x,
                size_y: wgd.size_y,
            };
        }
    },

    componentDidMount: function () {
        if (this.props.gdata===null) {
            this.data = {
                singleScreenWidgets: [],
                doubleScreenLeftWidgets: [],
                doubleScreenRightWidgets: [],
                widgetContents: {}
            };
        } else {
            this.data = this.props.gdata;
        }
       this.initGridster();
    },

    componentWillUpdate : function(nextProps, nextState) {
        this.saveGridData();
        if (nextProps.doubleScreen!=this.props.doubleScreen) {
            if (nextProps.doubleScreen) {  // Single -> Double
                if (this.data.doubleScreenLeftWidgets.length===0 && this.data.doubleScreenRightWidgets.length===0) {
                    this.data.doubleScreenLeftWidgets = this.data.singleScreenWidgets;
                }
            }
        }
    },

    saveGridData: function() {
        var layout = this;
        /**cache the state of grids by current screen(s) content*/

        if (this.props.doubleScreen===true) {
            //current double screen setting
            this.data.doubleScreenLeftWidgets = pured("#main-grid>ul");
            this.data.doubleScreenRightWidgets = pured("#extra-grid>ul");
        } else {
            //current single screeny setting
            this.data.singleScreenWidgets = pured("#main-grid>ul");
        }

        function pured(id) {
            var wlist =  $(id).gridster().data('gridster').serialize();
            $(wlist).each(function() {
                layout.data.widgetContents[this.id] = this.content;
                delete this.content;
            });
            return wlist;
        }
        console.log(this.data);
        return this.data;
    },

    loadGridData: function() {
        var layout = this;
        if (layout.props.doubleScreen) {
            foreachAddWidget("#main-grid > ul", layout.data.doubleScreenLeftWidgets);
            foreachAddWidget("#extra-grid > ul", layout.data.doubleScreenRightWidgets);
        } else {
            foreachAddWidget("#main-grid > ul", layout.data.singleScreenWidgets);
        }
        function foreachAddWidget(selector, data) {
            var gridster = $(selector).gridster().data('gridster');
            $.each(data, function() {
                var li = "<li data-id='" + this.id + "'>" + layout.data.widgetContents[this.id] + "</li>";
                gridster.add_widget(li, this.size_x, this.size_y, this.col, this.row);
            });
        }
    },

    setData: function(data) {
        this.data = data;
        this.initGridster();
    },

    getData: function() {
        this.saveGridData();
        return this.data;
    },

    initGridster: function() {
        var layout = this;
        $("#main-grid").empty();
        $("#extra-grid").empty();
        $("#main-grid").append("<ul></ul>");
        $("#extra-grid").append("<ul></ul>");

        $(".footer").css("position", "initial");
        if (this.props.doubleScreen) {
            if (this.props.expandMode===1) {  //portrait cut model
                layout.initPortraitCutMode();
            }
            if (this.props.expandMode===2) {  //expand mode
                this.initExpandMode();
            }
            if (this.props.expandMode===3) {  //extra mode
                layout.initExtraMode();
            }
        } else {
            layout.initSingleMode();
        }

        this.loadGridData();

        if(!this.state.layoutable) {
            $(".gridster ul").gridster().data('gridster').disable().disable_resize();
            tinymce.init({
                selector: '.gridster li .rtf',
                inline: true,
                menubar: false,
                toolbar: 'undo redo|mybutton formatselect bold italic underline strikethrough bullist numlist'
            });
        }
    },

    initSingleMode: function(screenCount=1) {
        var layout = this;
        var contentHeight = this.props.height;
        if (this.props.showHeader) {
            contentHeight -= this.props.headerHeight;
        }
        if (this.props.showFooter) {
            contentHeight -= this.props.footerHeight;
        }
        var contentWidth = this.props.width*screenCount - this.props.padding[1] - this.props.padding[3];
        $("#main-grid>ul").css("min-height", contentHeight);
        $("#main-grid>ul").css("margin-left", this.props.padding[3]);

        $("#main-grid>ul").gridster(_.extend({
            namespace: '#main-grid',
            widget_base_dimensions: [(contentWidth) / 12 - 2, (contentHeight) / 10 - 2],
            draggable: {
                stop: function(event, ui) {
                    /**
                     * When on double screen and the expand mode is 'extra' or 'portrait',
                     * Move the widget from left to right
                     * */
                    if (layout.props.doubleScreen && (layout.props.expandMode===1||layout.props.expandMode===3)
                        && ui.pointer.left>=layout.props.width+70) {
                        layout.moveBlock(ui.$player, true);
                    }
                }
            }
        }, this.defaultGridOptions));
        $("#extra-grid").hide();
    },

    /***
     * Expand Mode: expand the single screen(1024 width) to doubled width (2048 width)
     */
    initExpandMode: function() {
        this.initSingleMode(2);
    },


    /**
     * Extra Mode: the right screen is full screened for media plays(Movie) or full screen demonstration
     */
    initExtraMode: function() {
        var layout = this;
        layout.initSingleMode(1);
        $("#extra-grid").show();

        $("#extra-grid").css("position", "absolute").css("top", 0).css("right", 0).css("width", this.props.width).show();

        $("#extra-grid>ul").gridster(_.extend({
            namespace: '#extra-grid',
            widget_base_dimensions: [(this.props.width) / 12 - 2, (this.props.height) / 10 - 2],
            draggable: {
                stop: function(event, ui) {
                    /**
                     * When on double screen and the expand mode is 'extra' or 'portrait',
                     * Move the widget from left to right
                     * */
                    if (ui.pointer.left <= layout.props.width-200) {
                        layout.moveBlock(ui.$player, false);
                    }
                }
            }
        }, this.defaultGridOptions));
    },

    initPortraitCutMode: function() {
        var layout = this;
        $(".footer").css("position", "absolute").css("bottom", 0).css("right", 0);
        var contentWidth = this.props.width - this.props.padding[1] - this.props.padding[3];

        var extraHeight = this.props.height;
        if (this.props.showFooter) {
            extraHeight -= this.props.footerHeight;
        }
        extraHeight -= this.props.padding[0];
        $("#extra-grid").css("position", "absolute").css("top", this.props.padding[0]).css("right", this.props.padding[1]).
            css("width", contentWidth).show();
        $("#extra-grid>ul").gridster(_.extend({
            namespace: '#extra-grid',
            widget_base_dimensions: [(contentWidth) / 12 - 2, (extraHeight) / 10 - 2],
            draggable: {
                stop: function(event, ui) {
                    if (ui.pointer.left <= layout.props.width-200) {
                        layout.moveBlock(ui.$player, false);
                    }
                }
            }
        }, this.defaultGridOptions));

        var contentHeight = this.props.height;
        if (this.props.showHeader) {
            contentHeight -= this.props.headerHeight;
        }
        contentHeight -= this.props.padding[2];

        $("#main-grid>ul").css("min-height", contentHeight);
        $("#main-grid>ul").css("margin-left", this.props.padding[3]);

        $("#main-grid>ul").gridster(_.extend({
            namespace: '#main-grid',
            widget_base_dimensions: [(contentWidth) / 12 - 2, (contentHeight) / 10 - 2],
            draggable: {
                stop: function(event, ui) {
                    if (ui.pointer.left>=layout.props.width+70) {
                        layout.moveBlock(ui.$player, true);
                    }
                }
            }
        },this.defaultGridOptions));
    },

    componentDidUpdate: function () {
       this.initGridster();
    },

    addBlock: function (template, sizex, sizey) {
        var gridster = $("#main-grid ul").gridster().data('gridster');
        if (!sizex) {
            sizex = 12;
        }
        if (!sizey) {
            sizey = 2;
        }
        var blockId = _.uniqueId(this.BLOCK_ID_PREFIX)
        gridster.add_widget("<li data-id='" + blockId + "'>" + template + "</li>", sizex, sizey, 1, 100);

        this.data.doubleScreenLeftWidgets.push({
            id: blockId,
            col: 1,
            row: 100,
            size_x: sizex,
            size_y: sizey
        });
    },

    disableLayout: function() {
        this.setState({
            layoutable: false
        });
    },

    enableLayout: function() {
        this.setState({
            layoutable: true
        });
    },

    moveBlock: function(li, direction) {
        var src,target;
        if (direction) {
            src = $("#main-grid>ul").gridster().data('gridster');
            target = $("#extra-grid>ul").gridster().data('gridster');
        } else {
            target = $("#main-grid>ul").gridster().data('gridster');
            src = $("#extra-grid>ul").gridster().data('gridster');
        }

        var cli = li.clone();
        cli.find(".gs-resize-handle").remove();
        cli.find(".mce-content-body").removeAttr("id").removeAttr("contenteditable")
            .removeAttr("spellcheck").removeAttr("style").removeClass("mce-content-body");
        target.add_widget("<li data-id='" + li.data("id") + "'>"+ li.html() + "</li>",
            li.data("sizex"), li.data("sizey"), 1, 100);
        src.remove_widget(li);
    },

    closeSetting: function() {

    },

    render: function () {
        return (
            <div className={this.state.layoutable?"layoutable":"editable"}>
                <LeftMenu configurationChange={this.props.configurationChange}
                          doubleScreen={this.props.doubleScreen}
                          addBlock={this.addBlock}
                          layoutable={this.state.layoutable} disableLayout={this.disableLayout}
                          enableLayout={this.enableLayout} ref="leftmenu" closeSetting={this.closeSetting}
                          showHeader={this.props.showHeader} showFooter={this.props.showFooter}
                          width={this.props.width}/>

                <div className="gridster" id="main-grid" style={{
                    width: (this.props.doubleScreen&&this.props.expandMode===2)? this.props.width*2: this.props.width
                }}>
                    <ul></ul>
                </div>
                <div className="gridster" id="extra-grid">
                    <ul></ul>
                </div>
            </div>
        );
    }
});


tinymce.PluginManager.add('stylebuttons', function(editor, url) {
    ['pre', 'p', 'code', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'].forEach(function(name){
        editor.addButton("style-" + name, {
            tooltip: "Toggle " + name,
            text: name.toUpperCase(),
            onClick: function() { editor.execCommand('mceToggleFormat', false, name); },
            onPostRender: function() {
                var self = this, setup = function() {
                    editor.formatter.formatChanged(name, function(state) {
                        self.active(state);
                    });
                };
                editor.formatter ? setup() : editor.on('init', setup);
            }
        })
    });
});


module.exports = GridLayout;