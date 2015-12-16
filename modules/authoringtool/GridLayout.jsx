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
        var rhtml = $(".gridster").html();
        $(".gridster ul").remove();
        $(".gridster").append(rhtml);

        if (this.props.doubleScreen) {
            if (this.props.expandMode===2) {
                var contentHeight = this.props.height;
                if (this.props.showHeader) {
                    contentHeight -= this.props.headerHeight;
                }
                if (this.props.showFooter) {
                    contentHeight -= this.props.footerHeight;
                }
                var contentWidth = this.props.width*2 - this.props.padding[1] - this.props.padding[3];
                $(".gridster ul").css("min-height", contentHeight);
                $(".gridster ul").css("margin-left", this.props.padding[3]);

                $(".gridster ul").gridster({
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

        } else {
            var contentHeight = this.props.height;
            if (this.props.showHeader) {
                contentHeight -= this.props.headerHeight;
            }
            if (this.props.showFooter) {
                contentHeight -= this.props.footerHeight;
            }
            var contentWidth = this.props.width - this.props.padding[1] - this.props.padding[3];
            $(".gridster ul").css("min-height", contentHeight);
            $(".gridster ul").css("margin-left", this.props.padding[3]);

            $(".gridster ul").gridster({
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
        var gridster = $(".gridster ul").gridster().data('gridster');
        gridster.add_widget("<li class='j-grid-block player-revert'></li>", 12, 2, 1, 100);
        //EditPanel.init();
    },

    saveGridInfo: function () {
    },

    render: function () {
        return (
            <div >
                <div className="gridster">
                    <ul>
                        <li data-row="1" data-col="1" data-sizex="12" data-sizey="4"
                            className="j-grid-block player-revert"></li>
                    </ul>
                </div>
                <div className="extraGrid">
                    <ul>
                    </ul>
                </div>
            </div>
        );
    }

});


module.exports = GridLayout;