/**
 * Created by liuhan on 2015/11/27.
 */

var React = require('react');
var ReactDOM = require('react-dom');
var $ = require("jquery");

var PageEditor = React.createClass({

    getInitialState: function() {
        return {ratio: 1920, zoom:1};
    },

    ratioChange: function(event) {
        this.setState({ratio: event.target.value});
    },

    zoomChange: function(event) {
        this.setState({zoom: event.target.value});
    },

    /**在这个DOM ready之中使用jquery与grister初始化格子系统*/
    componentDidMount: function() {
    },

    render: function() {
        var ratio = this.state.ratio;
        var width = 1920;
        if (ratio==="x169") {
            width = 1920;
        } else
        if (ratio==="x1610") {
            width = 1080/10*16;
        } else
        if (ratio==="x43") {
            width = 1080/3*4;
        }
        return (
            <div>
                <div className="tools-bar">
                    <span>screen : </span>
                    <select onChange={this.ratioChange}>
                        <option value="x169" >1920x1080(16:9)</option>
                        <option value="x1610" >1200x800(16:10)</option>
                        <option value="x43" >1024x768(4:3)</option>
                    </select>
                    <span>x2</span>
                    <input type="checkbox"/>
                    <span>zoom</span>
                    <input type="number" onChange={this.zoomChange}/>
                </div>
                <Screen width={width} zoom={this.state.zoom}/>
            </div>
        );
    }
});

var Screen = React.createClass({
    componentDidMount: function() {
        $(".gridster ul").gridster({
            widget_margins: [1, 1],
            widget_base_dimensions: [140, 140],
            resize: {
                enabled: true
            }
        });
    },

    render: function() {
        return (
            <div className="screen" style={{
                width: 1024,//this.props.width,
                minHeight: 768,
                WebkitTransform:'scale(' + this.props.zoom + ')'}}>
                <div className="gridster">
                    <ul>
                        <li data-row="1" data-col="1" data-sizex="1" data-sizey="1"></li>
                        <li data-row="2" data-col="1" data-sizex="1" data-sizey="1"></li>
                        <li data-row="3" data-col="1" data-sizex="1" data-sizey="1"></li>

                        <li data-row="1" data-col="2" data-sizex="2" data-sizey="1"></li>
                        <li data-row="2" data-col="2" data-sizex="2" data-sizey="2"></li>

                        <li data-row="1" data-col="4" data-sizex="1" data-sizey="1"></li>
                        <li data-row="2" data-col="4" data-sizex="2" data-sizey="1"></li>
                    </ul>
                </div>
            </div>
        );
    }
});


ReactDOM.render(
    <PageEditor />,
    document.getElementById('AuthoringTool')
);
