/**
 * Created by liuhan
 * on 2015/12/15.
 */
var React = require('react');

var NavBar = React.createClass({

    SCREEN_MODEL_PORTRAIT: "Portrait Mode",
    SCREEN_MODEL_EXPAND: "Landscape Mode",
    SCREEN_MODEL_EXTRA: "Extra Mode",

    setState: function(state) {
        this.props.onChange(state);
    },

    ratioChange: function (event) {
        var ratio = event.target.value;
        if (ratio === "1920x1080(16:9)") {
            this.setState({width: 1920, minHeight: 1080});
        } else if (ratio === "x1610") {
            this.setState({width: 1280, minHeight: 800});
        } else if (ratio === "x43") {
            this.setState({width: 1024, minHeight: 768});
        }
    },

    resolution: function(event) {
        var value = $(event.target).html();
        if (value === "1920x1080(16:9)") {
            this.setState({width: 1920, minHeight: 1080});
        } else if (value === "1200x800(16:10)") {
            this.setState({width: 1280, minHeight: 800});
        } else if (value === "1024x768(4:3)") {
            this.setState({width: 1024, minHeight: 768});
        }
    },

    toggleScreen: function (event) {
        this.setState({
            doubleScreen: event.target.checked
        });
    },

    screenModel: function(event) {
        var value = $(event.target).html();
        $("#expandType span.value").html(value);

        var mode = 1;
        if (value===this.SCREEN_MODEL_PORTRAIT) {
            mode = 1
        }
        if (value===this.SCREEN_MODEL_EXPAND) {
            mode = 2;
        }
        if (value===this.SCREEN_MODEL_EXTRA) {
            mode = 3;
        }
        this.setState({
           expandMode: mode
        });
    },

    selectTheme: function (event) {
        this.setState({
            themeName: event.target.value
        });
    },

    addGridClick: function () {
        this.props.onAddGrid();
    },

    zoomChange: function (event) {
        this.setState({zoom: event.target.value});
    },
    /**
     * <li>
     //    <button type="button" className="btn btn-success navbar-btn" onClick={this.addGridClick}>
     //        Add Block
     //    </button>
     //</li>

     * @returns {XML}
     */
    render: function() {
        return (
            <nav className="navbar navbar-default navbar-fixed-top">
                <a className="navbar-brand" href="#">Authoring Tool</a>
                <ul className="nav navbar-nav navbar-right">

                    <li className="dropdown">
                        <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                            Screen Resolution
                            <span className="caret"></span>
                        </a>
                        <ul className="dropdown-menu" aria-labelledby="Resolution">
                            <li><a onClick={this.resolution}>1024x768(4:3)</a></li>
                            <li><a onClick={this.resolution}>1200x800(16:10)</a></li>
                            <li><a onClick={this.resolution}>1920x1080(16:9)</a></li>
                        </ul>
                    </li>

                    <li className="dropdown">
                        <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                            Theme
                            <span className="caret"></span>
                        </a>
                        <ul className="dropdown-menu" aria-labelledby="themeMenu">
                            <li><a href="#">Default</a></li>
                        </ul>
                    </li>

                    <li className="dropdown">
                        <input type="checkbox" onClick={this.toggleScreen}/>Double Screen
                    </li>

                    <li className="dropdown">
                        <a href="#" className="dropdown-toggle" id="expandType" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                            <span className="value">Screen Model</span>
                            <span className="caret"></span>
                        </a>
                        <ul className="dropdown-menu" aria-labelledby="screenMenu">
                            <li><a onClick={this.screenModel}>{this.SCREEN_MODEL_PORTRAIT}</a></li>
                            <li><a onClick={this.screenModel}>{this.SCREEN_MODEL_EXPAND}</a></li>
                            <li><a onClick={this.screenModel}>{this.SCREEN_MODEL_EXTRA}</a></li>
                        </ul>
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