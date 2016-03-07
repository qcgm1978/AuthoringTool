var React = require('react');

var _ = require("underscore");
var postal = require("postal");

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
        if (this.props.data===null) {
            this.data = {
                singleScreenWidgets: [],
                doubleScreenLeftWidgets: [],
                doubleScreenRightWidgets: [],
                widgetContents: {}
            };
        } else {
            this.data = this.props.data;
        }
        this.initGridster();
        this.subscribeChanel();
    },


    subscribeChanel: function() {
        var layout = this;
        postal.subscribe({
            channel: "activities",
            topic: "single-choice",
            callback: function(data, envelope) {
                layout.addActivity("single-choice");
                // `data` is the data published by the publisher.
                // `envelope` is a wrapper around the data & contains
                // metadata about the message like the channel, topic,
                // timestamp and any other data which might have been
                // added by the sender.
            }
        });

        postal.subscribe({
            channel: "workspace",
            topic: "empty.clicked",
            callback: function(data, envelope) {
                layout.enableGridster();
            }
        });
    },


    /**When propeties and states change */
    componentWillUpdate : function(nextProps, nextState) {
        this.saveGridData();
        /**When screen mode is single to double, try to set/init the double screen widgets */
        if (nextProps.doubleScreen!=this.props.doubleScreen) {
            if (nextProps.doubleScreen) {  // Single -> Double
                if (this.data.doubleScreenLeftWidgets.length===0 && this.data.doubleScreenRightWidgets.length===0) {
                    this.data.doubleScreenLeftWidgets = this.data.singleScreenWidgets;
                }
            }
        }
    },

    /**Extract n save grid data*/
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
                layout.data.widgetContents[this.id] = this.coiinntent;
                delete this.content;
            });
            return wlist;
        }
        return this.data;
    },

    /**Load gridster widgets from layout.data */
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

        /**Initialize the grid first*/
        $(".footer").css("position", "initial");
        if (this.props.double) {
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

        /**Add blocks to gridster*/
        this.loadGridData();
        this.initBlockEvents();
        /**If it is in edit mode , disable gridster resize and movements, init the mce editor*/

        /*
        if(!this.state.layoutable) {
            $(".gridster ul").gridster().data('gridster').disable().disable_resize();
            tinymce.init({
                selector: '.gridster li .rtf',
                inline: true,
                menubar: false,
                toolbar: 'undo redo| bold italic underline strikethrough'
            });
        }
        */
    },
    startDraging : false,

    initSingleMode: function(screenCount=1) {
        var layout = this;
        /*
        style={{
            width: (this.props.double&&this.props.expandMode===2)? this.props.width*2: this.props.width
        }}
        */
        console.log("init single mode", this.props);
        $("#main-grid").css("width", this.props.width);
        $("#main-grid").css("min-height", this.props.height);

        var gridsterWidth = this.props.width;
        if (this.props.padding) {
            $("#main-grid").css("padding", this.props.padding.join(" "));
            $("#main-grid>ul").css("width", "100%");
            $("#main-grid>ul").css("height", "100%");
        }

        $("#main-grid>ul").gridster(_.extend({
            namespace: '#main-grid',
            widget_base_dimensions: [(this.props.width) / 12 - 2, (this.props.height) / 10 - 2],
            draggable: {
                start: function() {
                    layout.startDraging = true;
                },
                stop: function(event, ui) {
                    /**
                     * When on double screen and the expand mode is 'extra' or 'portrait',
                     * Move the widget from left to right
                     * */
                    if (layout.props.pageSetting.doubleScreen && (layout.props.pageSetting.expandMode===1||layout.props.pageSetting.expandMode===3)
                        && ui.pointer.left>=layout.props.pageSetting.width+70) {
                        layout.moveBlock(ui.$player, true);
                    }
                }
            },
            resize: {
                enabled: true,
                start: function() {
                    layout.startDraging = true;
                    console.log("start resizing");
                },

                resize: function() {
                    console.log("resizing");
                },

                stop: function() {
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
            },
            resize:  {
                enabled: true
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
            },
            resize:  {
                enabled: true
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
            },
            resize:  {
                enabled: true
            }
        },this.defaultGridOptions));
    },

    componentDidUpdate: function (prevProps, prevState) {
        /**When the layout attributes changed, reset the gridster*/
        this.initGridster();

        /*
        if (this.props.doubleScreen!==prevProps.doubleScreen || this.props.width!==prevProps.width
            || this.props.expandMode!==prevProps.expandMode
            || this.props.headerHeight!==prevProps.headerHeight
            || this.props.footerHeight!==prevProps.footerHeight
            || this.props.padding!==prevProps.padding
            || this.props.gdata!==prevProps.gdata
        ) {

        }
        */
    },

    addActivity: function(type) {
        var gridster = $("#main-grid ul").gridster().data('gridster');
        var sizex = 12;
        var sizey = 4;
        var blockId = _.uniqueId(this.BLOCK_ID_PREFIX);
        gridster.add_widget("<li data-id='" + blockId + "'>" + type + "</li>", sizex, sizey, 1, 100);
        this.initBlockEvents();

        this.data.doubleScreenLeftWidgets.push({
            id: blockId,
            col: 1,
            row: 100,
            size_x: sizex,
            size_y: sizey
        });
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
        gridster.add_widget("<li data-id='" + blockId + "' data-btype='text-block'>" + template + "</li>", sizex, sizey, 1, 100);

        this.initBlockEvents();

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

    enableGridster: function() {
        $(".gridster ul").gridster().data('gridster').enable().enable_resize();
        $(".gridster ul li.current").removeClass("current");
    },

    initBlockEvents: function(block) {
        $(block).off("click").on("click", function(event) {
            event.stopPropagation();
            $(".gridster ul li.current").removeClass("current");
            $(this).addClass("current");
            $(".gridster ul").gridster().data('gridster').disable().disable_resize();
        });
        var gridlayout = this;
        $(".gridster li").unbind('click').bind("click", function(event) {
            event.stopPropagation();
            if (gridlayout.startDraging) {
                gridlayout.startDraging = false;
                return;
            }
            $(".gridster ul li.current").removeClass("current");
            $(this).addClass("current");

            //gridlayout.props.editBlock($(this).data("btype"));
            $(".gridster ul").gridster().data('gridster').disable().disable_resize();
        });
        tinymce.init({
            selector: '.gridster li .rtf',
            inline: true,
            menubar: false,
            toolbar: 'undo redo| bold italic underline strikethrough'
        });
    },

    render: function () {
        return (
            <div className={this.state.layoutable?"layoutable":"editable"}>
                <div className="gridster" id="main-grid">
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