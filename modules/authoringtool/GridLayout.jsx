var React = require('react');
var $ = require("jquery");

/**
var EditPanel = require("../panel/EditorPanel.jsx");
<GridLayout width={this.state.width} height={this.state.height} contentHeight={this.state.contentHeight}
            contentWidth={this.state.contentWidth}
            doubleScreen={this.state.doubleScreen}/>
*/
var GridLayout = React.createClass({

    getInitialState: function () {
        return {
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

    componentDidMount: function () {
       this.initGridster();
    },

    initGridster: function() {
        var mHtml = $(".mainGrid>ul").html();
        var eHtml = $(".extraGrid>ul").html();

        $(".gs-resize-handle").remove();

        $(".footer").css("position", "initial");

        if (this.props.doubleScreen) {
            $(".mainGrid").empty();
            $(".mainGrid").append("<ul>" + mHtml + "</ul>");

            $(".extraGrid").empty();
            $(".extraGrid").append("<ul>" + eHtml + "</ul>");

            if (this.props.expandMode===2) {
                var contentHeight = this.props.height;
                if (this.props.showHeader) {
                    contentHeight -= this.props.headerHeight;
                }
                if (this.props.showFooter) {
                    contentHeight -= this.props.footerHeight;
                }
                var contentWidth = this.props.width*2 - this.props.padding[1] - this.props.padding[3];
                $(".mainGrid ul").css("min-height", contentHeight);
                $(".mainGrid ul").css("margin-left", this.props.padding[3]);

                $(".mainGrid ul").gridster({
                    widget_margins: [1, 1],
                    widget_base_dimensions: [(contentWidth) / 12 - 2, (contentHeight) / 10 - 2],
                    min_cols: 12,
                    min_rows: 10,
                    resize: {
                        enabled: true
                    }
                });
                $(".extraGrid").hide();
            }

            if (this.props.expandMode===1) {  //portrait cut model
                $(".footer").css("position", "absolute").css("bottom", 0).css("right", 0);
                var contentWidth = this.props.width - this.props.padding[1] - this.props.padding[3];

                var extraHeight = this.props.height;
                if (this.props.showFooter) {
                    extraHeight -= this.props.footerHeight;
                }
                extraHeight -= this.props.padding[0];
                $(".extraGrid").css("position", "absolute").css("top", this.props.padding[0]).css("right", this.props.padding[1]).show();
                $(".extraGrid ul").gridster({
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

                $(".mainGrid ul").css("min-height", contentHeight);
                $(".mainGrid ul").css("margin-left", this.props.padding[3]);

                $(".mainGrid ul").gridster({
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
                $(".extraGrid").css("position", "absolute").css("top", 0).css("right", 0).css("width", this.props.width).show();
                $(".extraGrid ul").gridster({
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
                $(".mainGrid ul").css("min-height", contentHeight);
                $(".mainGrid ul").css("margin-left", this.props.padding[3]);

                $(".mainGrid ul").gridster({
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
            $(".mainGrid").empty();
            $(".mainGrid").append("<ul>" + mHtml + "</ul>");
            //$(".mainGrid ul").append(eHtml);

            var contentHeight = this.props.height;
            if (this.props.showHeader) {
                contentHeight -= this.props.headerHeight;
            }
            if (this.props.showFooter) {
                contentHeight -= this.props.footerHeight;
            }
            var contentWidth = this.props.width - this.props.padding[1] - this.props.padding[3];
            $(".mainGrid ul").css("min-height", contentHeight);
            $(".mainGrid ul").css("margin-left", this.props.padding[3]);

            $(".mainGrid ul").gridster({
                widget_margins: [1, 1],
                widget_base_dimensions: [(contentWidth) / 12 - 2, (contentHeight) / 10 - 2],
                min_cols: 12,
                min_rows: 10,
                resize: {
                    enabled: true
                }
            });
            $(".extraGrid").hide();
        }

        var col = 12;
        if (this.props.expandMode===2) {
            col = col * 2;
        }
        //EditPanel.init();
    },

    componentDidUpdate: function () {
       this.initGridster();
    },

    addBlock: function () {
        var gridster = $(".mainGrid ul").gridster().data('gridster');
        gridster.add_widget("<li class='j-grid-block player-revert'></li>", 12, 2, 1, 100);
        //EditPanel.init();
    },

    saveGridInfo: function () {

    },

    render: function () {
        return (
            <div>
                <div className="gridster mainGrid">
                    <ul>
                        <li data-row="1" data-col="1" data-sizex="12" data-sizey="4"
                            className="j-grid-block player-revert">
                        </li>
                    </ul>
                </div>
                <div className="gridster extraGrid">
                    <ul>
                        <li data-row="1" data-col="1" data-sizex="12" data-sizey="4"
                            className="j-grid-block player-revert"></li>
                    </ul>
                </div>
            </div>
        );
    }
});


module.exports = GridLayout;