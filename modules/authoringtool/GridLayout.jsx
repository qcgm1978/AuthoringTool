var React = require('react');

var LeftMenu = require("./LeftMenu.jsx");

//require("tinymce");

/**
var EditPanel = require("../panel/EditorPanel.jsx");
<GridLayout width={this.state.width} height={this.state.height} contentHeight={this.state.contentHeight}
            contentWidth={this.state.contentWidth}
            doubleScreen={this.state.doubleScreen}/>
*/
var GridLayout = React.createClass({

    getInitialState: function () {
        return {
            layoutable: true,
            oneScreenGrids: [],
            multiScreen: {
              model: 1,
              grids: []
            },
            minHeight: 768,
            zoom: 1,
            doubleScreen: 0,
            showHeader: true,
            showFooter: true,
            theme: "default"
        };
    },

    GRID_TEMPLATE: '<li><div class="content"><span>Change it in edit mode</span></spahn></div></li>',

    componentDidMount: function () {
       this.initGridster();
    },

    initGridster: function() {
        if(!this.state.layoutable) {
            $(".gridster ul").gridster().data('gridster').disable().disable_resize();
            tinymce.init({
                selector: '.gridster li .content',
                inline: true,
                menubar: false,
                toolbar: 'undo redo|mybutton formatselect bold italic underline strikethrough bullist numlist'
            });
            return;
        } else {
            tinymce.execCommand('mceRemoveControl', true, '.gridster li .content');
        }

        if ($("#main-grid>ul").data("gridster")) {
            $("#main-grid>ul").data("gridster").remove_style_tags();
        }
        if ($("#extra-grid>ul").data("gridster")) {
            $("#extra-grid>ul").data("gridster").remove_style_tags();
        }

        $(".gs-resize-handle").remove();
        $(".gridster ul li").removeAttr("style");

        var mHtml = $("#main-grid>ul").html();
        var eHtml = $("#extra-grid>ul").html();

        $(".footer").css("position", "initial");

        if (this.props.doubleScreen) {

            $("#main-grid").empty();
            $("#main-grid").append("<ul>" + mHtml + "</ul>");

            $("#extra-grid").empty();
            $("#extra-grid").append("<ul>" + eHtml + "</ul>");

            if (this.props.expandMode===2) {  //expand mode
                var contentHeight = this.props.height;
                if (this.props.showHeader) {
                    contentHeight -= this.props.headerHeight;
                }
                if (this.props.showFooter) {
                    contentHeight -= this.props.footerHeight;
                }
                var contentWidth = this.props.width*2 - this.props.padding[1] - this.props.padding[3];
                $("#main-grid ul").css("min-height", contentHeight);
                $("#main-grid ul").css("margin-left", this.props.padding[3]);

                $("#main-grid ul").gridster({
                    namespace: '#main-grid',
                    widget_margins: [1, 1],
                    widget_base_dimensions: [(contentWidth) / 12 - 2, (contentHeight) / 10 - 2],
                    min_cols: 12,
                    min_rows: 10,
                    resize: {
                        enabled: true
                    }
                });
                $("#extra-grid").hide();
            }

            if (this.props.expandMode===1) {  //portrait cut model
                $(".footer").css("position", "absolute").css("bottom", 0).css("right", 0);
                var contentWidth = this.props.width - this.props.padding[1] - this.props.padding[3];

                var extraHeight = this.props.height;
                if (this.props.showFooter) {
                    extraHeight -= this.props.footerHeight;
                }
                extraHeight -= this.props.padding[0];
                $("#extra-grid").css("position", "absolute").css("top", this.props.padding[0]).css("right", this.props.padding[1]).
                    css("width", contentWidth).show();
                $("#extra-grid ul").gridster({
                    namespace: '#extra-grid',
                    widget_margins: [1, 1],
                    widget_base_dimensions: [(contentWidth) / 12 - 2, (extraHeight) / 10 - 2],
                    min_cols: 12,
                    min_rows: 10,
                    resize: {
                        enabled: true
                    }
                });

                var contentHeight = this.props.height;
                if (this.props.showHeader) {
                    contentHeight -= this.props.headerHeight;
                }
                contentHeight -= this.props.padding[2];

                $("#main-grid ul").css("min-height", contentHeight);
                $("#main-grid ul").css("margin-left", this.props.padding[3]);

                $("#main-grid ul").gridster({
                    namespace: '#main-grid',
                    widget_margins: [1, 1],
                    widget_base_dimensions: [(contentWidth) / 12 - 2, (contentHeight) / 10 - 2],
                    min_cols: 12,
                    min_rows: 10,
                    max_rows: 10,
                    max_cols: 12,
                    resize: {
                        enabled: true
                    }
                });
            }

            if (this.props.expandMode===3) {  //extra mode
                $("#extra-grid").css("position", "absolute").css("top", 0).css("right", 0).css("width", this.props.width).show();
                $("#extra-grid ul").gridster({
                    namespace: '#extra-grid',
                    widget_margins: [1, 1],
                    widget_base_dimensions: [(this.props.width) / 12 - 2, (this.props.height) / 10 - 2],
                    min_cols: 12,
                    min_rows: 10,
                    resize: {
                        enabled: true
                    }
                });

                var contentHeight = this.props.height;
                if (this.props.showHeader) {
                    contentHeight -= this.props.headerHeight;
                }
                if (this.props.showFooter) {
                    contentHeight -= this.props.footerHeight;
                }
                var contentWidth = this.props.width - this.props.padding[1] - this.props.padding[3];

                $("#main-grid ul").css("width", contentWidth).css("margin-left", this.props.padding[3])
                    .css("min-height", contentHeight);

                $("#main-grid ul").gridster({
                    namespace: '#main-grid',
                    widget_margins: [1, 1],
                    widget_base_dimensions: [(contentWidth) / 12 - 2, (contentHeight) / 10 - 2],
                    min_cols: 12,
                    min_rows: 10,
                    resize: {
                        enabled: true
                    }
                });
            }
        } else {
            $("#main-grid").empty();
            $("#main-grid").append("<ul>" + mHtml + "</ul>");
            //$("#main-grid ul").append(eHtml);

            var contentHeight = this.props.height;
            if (this.props.showHeader) {
                contentHeight -= this.props.headerHeight;
            }
            if (this.props.showFooter) {
                contentHeight -= this.props.footerHeight;
            }
            var contentWidth = this.props.width - this.props.padding[1] - this.props.padding[3];
            $("#main-grid ul").css("min-height", contentHeight);
            $("#main-grid ul").css("margin-left", this.props.padding[3]);

            $("#main-grid ul").gridster({
                namespace: '#main-grid',
                widget_margins: [1, 1],
                widget_base_dimensions: [(contentWidth) / 12 - 2, (contentHeight) / 10 - 2],
                min_cols: 12,
                min_rows: 10,
                resize: {
                    enabled: true
                }
            });
            $("#extra-grid").hide();
        }
    },

    componentDidUpdate: function () {
       this.initGridster();
    },

    addBlock: function () {
        $("#btn-add-block").popover({
            title: "Add Block with type",
            content: "Wanta To add New Blocks?"
        });
        /*
        var gridster = $("#main-grid ul").gridster().data('gridster');
        gridster.add_widget(this.GRID_TEMPLATE, 12, 2, 1, 100);
        */
        //EditPanel.init()g;
    },

    disableLayout: function() {
        $("nav li.dropdown").hide();
        this.setState({
            layoutable: false
        });
    },

    enableLayout: function() {
        $("nav li.dropdown").show();
        this.setState({
            layoutable: true
        });
        //$(".gridster ul").gridster().data('gridster').enable().enable_resize();
    },

    saveGridInfo: function () {

    },

    render: function () {
        return (
            <div className={this.state.layoutable?"layoutable":"editable"}>
                <LeftMenu layoutable={this.state.layoutable} addBlock={this.addBlock} disableLayout={this.disableLayout}
                    enableLayout={this.enableLayout}/>

                <div className="gridster" id="main-grid">
                    <ul>
                        <li data-row="1" data-col="1" data-sizex="12" data-sizey="1"
                            className="j-grid-block player-revert">
                        </li>
                    </ul>
                </div>
                <div className="gridster" id="extra-grid">
                    <ul>

                    </ul>
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