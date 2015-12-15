var React = require('react');
var $ = require("jquery");
var EditPanel = require("../panel/EditorPanel.jsx");
/**
<GridLayout width={this.state.width} height={this.state.height} contentHeight={this.state.contentHeight}
            contentWidth={this.state.contentWidth}
            doubleScreen={this.state.doubleScreen}/>
*/
var GridLayout = React.createClass({
    componentDidMount: function () {
       this.initGridster();
    },

    initGridster: function() {
        var rhtml = $(".gridster").html();
        $(".gridster ul").remove();
        $(".gridster").append(rhtml);

        console.log(this.props);
        var col = 12;
        if (this.props.doubleScreen) {
            col = col * 2;
        }
        $(".gridster ul").gridster({
            widget_margins: [1, 1],
            widget_base_dimensions: [(this.props.contentWidth) / 12 - 2, (this.props.contentHeight) / 10 - 2],
            min_cols: col,
            min_rows: 10,
            resize: {
                enabled: true
            }
        });
        $(".gridster ul").css("min-height", this.props.contentHeight);
        //EditPanel.init();
    },

    componentDidUpdate: function () {
       this.initGridster();
    },

    addGrid: function () {
        var gridster = $(".gridster ul").gridster().data('gridster');
        gridster.add_widget("<li class='j-grid-block player-revert'></li>", 12, 2, 1, 1);
        //EditPanel.init();
    },

    saveGridInfo: function () {

    },

    render: function () {
        return (
            <div className="gridster">
                <ul>
                    <li data-row="1" data-col="1" data-sizex="12" data-sizey="4"
                        className="j-grid-block player-revert"></li>
                </ul>
            </div>
        );
    }

});


module.exports = GridLayout;