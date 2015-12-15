var React = require('react');
var $ = require("jquery");
var EditPanel = require("../panel/EditorPanel.jsx");

var GridLayout = React.createClass({
    componentDidMount: function () {
       this.initGridster();
    },

    initGridster: function() {
        var rhtml = $(".gridster").html();
        $(".gridster ul").remove();
        $(".gridster").append(rhtml);

        var col = 12;
        if (this.props.doubleScreen) {
            col = col * 2;
        }

        $(".gridster ul").gridster({
            widget_margins: [1, 1],
            widget_base_dimensions: [(this.props.width) / 12 - 2, (this.props.minHeight) / 10 - 2],
            min_cols: col,
            resize: {
                enabled: true
            }
        });
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
                    <li data-row="1" data-col="1" data-sizex="12" data-sizey="2"
                        className="j-grid-block player-revert"></li>
                    <li data-row="3" data-col="1" data-sizex="8" data-sizey="2"
                        className="j-grid-block player-revert"></li>
                </ul>
            </div>
        );
    }

});


module.exports = GridLayout;