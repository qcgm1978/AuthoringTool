/**
 * Created by Liuhan on 2015/12/8.
 */
var React = require('react');
var $ = require("jquery");

/**
 * Params:
<AxisLines
    width={this.state.width}
    height={this.state.height}
    contentHeight={this.state.contentHeight}
    contentWidth={this.state.contentWidth}
    doubleScreen={this.state.doubleScreen}/>
*/

var AxisLines = React.createClass({

    getInitialState: function() {
        return {lines: []};
    },

    render: function() {

        this.state.lines = [];

        this.state.lines.push(
            {
                key: "t1",
                x1: 0,
                y1: 70 + this.props.headerHeight,
                x2: "100%",
                y2: 70 + this.props.headerHeight
            }
        );

        this.state.lines.push(
            {
                key: "t2",
                x1: 0,
                y1: 70 + this.props.height,
                x2: "100%",
                y2: 70 + this.props.height
            }
        );

        this.state.lines.push(
            {
                key: "l1",
                x1: 70,
                y1: 0,
                x2: 70,
                y2: "100%"
            }
        );

        this.state.lines.push(
            {
                key: "l2",
                x1: 70 + this.props.width,
                y1: 0,
                x2: 70 + this.props.width,
                y2: "100%"
            }
        );

        var w_width = $(window).width();
        var svgWidth = 140 + this.props.width;
        if (svgWidth<w_width) {
            svgWidth = w_width;
        }
        if(this.props.doubleScreen) {
            this.state.lines.push({
                key: "l3",
                x1: 70 + this.props.width*2,
                y1: 0,
                x2: 70 + this.props.width*2,
                y2: "100%"
            });
            svgWidth = (this.props.width+70)*2;
        }

        var lines = this.state.lines.map(function(line) {
            return (

                <line key={line.key} x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2} className="frontLine" ></line>
            );
        });

        return (
            <svg className="gridLines" style={{
                        width: svgWidth
                     }}>
                {lines}
            </svg>
        );
    }
});

module.exports = AxisLines;