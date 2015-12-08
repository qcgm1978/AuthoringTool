/**
 * Created by liuhan on 2015/11/27.
 */

var React = require('react');
var ReactDOM = require('react-dom');

var $ = require("jquery");
var  GridLines = require("./GridLines.jsx");

var PageEditor = React.createClass({

    getInitialState: function() {
        return {width: 1024, minHeight: 768, zoom:1, doubleScreen: false};
    },

    ratioChange: function(event) {
        var ratio = event.target.value;
        if (ratio==="x169") {
            this.setState({width: 1920, minHeight: 1080});
        } else if (ratio==="x1610") {
            this.setState({width: 1280, minHeight: 800});
        } else if (ratio==="x43") {
            this.setState({width: 1024, minHeight: 768});
        }
    },

    toggleScreen: function(event) {
        this.setState({
            doubleScreen: event.target.checked
        });
    },

    addGrid: function() {
       this.refs["screen"].addGridX();

    },

    zoomChange: function(event) {
        this.setState({zoom: event.target.value});
    },

    /**在这个DOM ready之中使用jquery与grister初始化格子系统*/
    componentDidMount: function() {

    },

    render: function() {
        return (
            <div>
                <nav className="navbar navbar-default navbar-fixed-top">
                    <a className="navbar-brand" href="#">Authoring Tool</a>
                    <ul className="nav navbar-nav navbar-right">
                        <li>
                            <button type="button" className="btn btn-success navbar-btn" onClick={this.addGrid}>Add Grid</button>
                        </li>

                        <li >
                            <select onChange={this.ratioChange}>
                                <option value="x43" >1024x768(4:3)</option>
                                <option value="x169" >1920x1080(16:9)</option>
                                <option value="x1610" >1200x800(16:10)</option>
                            </select>
                        </li>

                        <li>
                            <input type="checkbox" onClick={this.toggleScreen}/>
                        </li>

                        <li><a href="#">Save</a></li>
                        <li><a href="#">Preview</a></li>
                        <li><a href="#">Export</a></li>
                    </ul>
                </nav>
                <Screen doubleScreen={this.state.doubleScreen} width={this.state.width} minHeight={this.state.minHeight} zoom={this.state.zoom} ref="screen"/>
                <GridLines width={this.state.width} minHeight={this.state.minHeight} doubleScreen={this.state.doubleScreen}/>
            </div>
        );
    }
});

var Screen = React.createClass({
    componentDidMount: function() {
        $(".gridster ul").gridster({
            widget_margins: [1, 1],
            widget_base_dimensions: [Math.floor((this.props.width)/12-2), (this.props.minHeight)/12-2],
            min_cols: 12,
            resize: {
                enabled: true
            }
        });
    },

    componentDidUpdate: function() {
        var rhtml = $(".gridster").html();
        $(".gridster ul").remove();
        $(".gridster").append(rhtml);

        var col = 12;
        if (this.props.doubleScreen) {
            col = col * 2;
        }

        $(".gridster ul").gridster({
            widget_margins: [1, 1],
            widget_base_dimensions: [(this.props.width) / 12 - 2, (this.props.minHeight) / 12 - 2],
            min_cols: col,
            resize: {
                enabled: true
            }
        });
    },

    addGridX: function() {
        var gridster = $(".gridster ul").gridster().data('gridster');
        gridster.add_widget("<li></li>", 12, 2, 1, 1);
    },

    render: function() {
        var swidth = this.props.width;

        if (this.props.doubleScreen) {
            swidth = swidth * 2;
        }
        return (
            <div className="screen" style={{
                        width:  this.props.width,
                        minHeight: this.props.minHeight,
                        WebkitTransform:'scale(' + this.props.zoom + ')'}}>
                <div className="gridster">
                    <ul>
                        <li data-row="1" data-col="1" data-sizex="12" data-sizey="2"></li>
                        <li data-row="3" data-col="1" data-sizex="8" data-sizey="2"></li>
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
