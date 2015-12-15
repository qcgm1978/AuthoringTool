/**
 * Created by ¡ı∫≠ on 2015/12/15.
 */
var React = require('react');

var NavBar = React.createClass({
    setState: function(state) {
        this.props.onChange(state);
    },

    ratioChange: function (event) {
        var ratio = event.target.value;
        if (ratio === "x169") {
            this.setState({width: 1920, minHeight: 1080});
        } else if (ratio === "x1610") {
            this.setState({width: 1280, minHeight: 800});
        } else if (ratio === "x43") {
            this.setState({width: 1024, minHeight: 768});
        }
    },

    toggleScreen: function (event) {
        this.setState({
            doubleScreen: event.target.checked
        });
    },

    selectTheme: function (event) {
        this.setState({
            themeName: event.target.value
        });
    },

    addGridClick: function () {
        this.refs["screen"].addGrid();
    },

    zoomChange: function (event) {
        this.setState({zoom: event.target.value});
    },

    render: function() {
        return (
            <nav className="navbar navbar-default navbar-fixed-top">
                <a className="navbar-brand" href="#">Authoring Tool</a>
                <ul className="nav navbar-nav navbar-right">
                    <li>
                        <button type="button" className="btn btn-success navbar-btn" onClick={this.addGridClick}>Add
                            Grid
                        </button>
                    </li>
                    <li >
                        <select onChange={this.ratioChange}>
                            <option value="x43">1024x768(4:3)</option>
                            <option value="x169">1920x1080(16:9)</option>
                            <option value="x1610">1200x800(16:10)</option>
                        </select>
                    </li>
                    <li>
                        <select onChange={this.selectTheme}>
                            <option value="default">default</option>
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
        );
    }
});

module.exports = NavBar;