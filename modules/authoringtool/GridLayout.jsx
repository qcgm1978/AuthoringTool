var React = require('react');

var LeftMenu = require("./LeftMenu.jsx");

var GridLayout = React.createClass({

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

    GRID_TEMPLATE: '<li><div class="content"><span>Change it in edit mode</span></div></li>',

    componentDidMount: function () {
       this.initGridster();
    },

    componentWillUpdate : function(nextProps, nextState) {
        /**
         * 当用户切换单双屏幕时进行处理
         */
        if (nextProps.doubleScreen!=this.props.doubleScreen) {

            if (nextProps.doubleScreen) {  //单屏到双屏时
                this.singleScreenHtml = $("#main-grid>ul").html();
            } else {
                this.doubleMainHtml = $("#main-grid>ul").html();
                this.doubleExtraHtml = $("#extra-grid>ul").html();
            }
        }
    },

    singleScreenHtml: null,
    doubleMainHtml: null,
    doubleExtraHtml: null,

    initGridster: function() {
        var gridlayout = this;
        if(!this.state.layoutable) {
            $(".gridster ul").gridster().data('gridster').disable().disable_resize();
            tinymce.init({
                selector: '.gridster li .rtf',
                inline: true,
                menubar: false,
                toolbar: 'undo redo|mybutton formatselect bold italic underline strikethrough bullist numlist'
            });
            return;
        } else {
            $(".mce-content-body").removeClass("mce-content-body").removeAttr("id contenteditable spellcheck");
            $(".mce-edit-focus").removeClass("mce-edit-focus");
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

            if (this.doubleMainHtml!=null) {
                mHtml = this.doubleMainHtml;
            }
            if (this.doubleExtraHtml!=null) {
                eHtml = this.doubleExtraHtml;
            }

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
                $("#main-grid>ul").css("min-height", contentHeight);
                $("#main-grid>ul").css("margin-left", this.props.padding[3]);

                $("#main-grid>ul").gridster({
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
                $("#extra-grid>ul").gridster({
                    namespace: '#extra-grid',
                    widget_margins: [1, 1],
                    widget_base_dimensions: [(contentWidth) / 12 - 2, (extraHeight) / 10 - 2],
                    min_cols: 12,
                    min_rows: 10,
                    resize: {
                        enabled: true
                    },
                    draggable: {
                        stop: function(event, ui) {
                            if (ui.pointer.left<=gridlayout.props.width-200) {
                                gridlayout.moveBlock(ui.$player, false);
                            }
                        }
                    }
                });

                var contentHeight = this.props.height;
                if (this.props.showHeader) {
                    contentHeight -= this.props.headerHeight;
                }
                contentHeight -= this.props.padding[2];

                $("#main-grid>ul").css("min-height", contentHeight);
                $("#main-grid>ul").css("margin-left", this.props.padding[3]);

                $("#main-grid>ul").gridster({
                    namespace: '#main-grid',
                    widget_margins: [1, 1],
                    widget_base_dimensions: [(contentWidth) / 12 - 2, (contentHeight) / 10 - 2],
                    min_cols: 12,
                    min_rows: 10,
                    max_rows: 10,
                    max_cols: 12,
                    resize: {
                        enabled: true
                    },
                    draggable: {
                        stop: function(event, ui) {
                            if (ui.pointer.left>=gridlayout.props.width+70) {
                                gridlayout.moveBlock(ui.$player, true);
                            }
                        }
                    }
                });
            }

            if (this.props.expandMode===3) {  //extra mode
                $("#extra-grid").css("position", "absolute").css("top", 0).css("right", 0).css("width", this.props.width).show();
                $("#extra-grid>ul").gridster({
                    namespace: '#extra-grid',
                    widget_margins: [1, 1],
                    widget_base_dimensions: [(this.props.width) / 12 - 2, (this.props.height) / 10 - 2],
                    min_cols: 12,
                    min_rows: 10,
                    resize: {
                        enabled: true
                    },
                    draggable: {
                        stop: function(event, ui) {
                            /**
                             * When on double screen and the expand mode is 'extra' or 'portrait',
                             * Move the widget from left to right
                             * */
                            if (ui.pointer.left<=gridlayout.props.width-200) {
                                gridlayout.moveBlock(ui.$player, false);
                            }
                        }
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

                $("#main-grid>ul").css("width", contentWidth).css("margin-left", this.props.padding[3])
                    .css("min-height", contentHeight);

                $("#main-grid>ul").gridster({
                    namespace: '#main-grid',
                    widget_margins: [1, 1],
                    widget_base_dimensions: [(contentWidth) / 12 - 2, (contentHeight) / 10 - 2],
                    min_cols: 12,
                    min_rows: 10,
                    resize: {
                        enabled: true
                    },
                    draggable: {
                        stop: function(event, ui) {
                            /**
                             * When on double screen and the expand mode is 'extra' or 'portrait',
                             * Move the widget from left to right
                             * */
                            if (ui.pointer.left>=gridlayout.props.width+70) {
                                gridlayout.moveBlock(ui.$player, true);
                            }
                        }
                    }
                });
            }
        } else {
            $("#main-grid").empty();
            if (this.singleScreenHtml!=null) {
                mHtml = this.singleScreenHtml;
            }
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
            $("#main-grid>ul").css("min-height", contentHeight);
            $("#main-grid>ul").css("margin-left", this.props.padding[3]);

            $("#main-grid>ul").gridster({
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

    addBlock: function (event) {
        var template = $(event.target).removeAttr("data-reactid").prop('outerHTML');
        var gridster = $("#main-grid ul").gridster().data('gridster');
        gridster.add_widget("<li>" + template + "</li>", 12, 2, 1, 100);
        this.refs["leftmenu"].setState({showBlockTypes: false});
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

    moveBlock: function(li, direction) {
        var src,target;

        if (direction) {
            src = $("#main-grid>ul").gridster().data('gridster');
            target = $("#extra-grid>ul").gridster().data('gridster');
        } else {
            target = $("#main-grid>ul").gridster().data('gridster');
            src = $("#extra-grid>ul").gridster().data('gridster');
        }

        target.add_widget("<li>"+ li.find(">div").prop("outerHTML") + "</li>",
            li.data("sizex"), li.data("sizey"), 1, 100);
        src.remove_widget(li);
    },

    closeSetting: function() {

    },


    saveGridInfo: function () {

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