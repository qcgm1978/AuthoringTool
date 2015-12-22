/**
 * Created by liuhan
 * on 2015/12/15.
 */
var React = require('react');

var NavBar = React.createClass({

    SCREEN_MODEL_PORTRAIT: "Portrait Mode",
    SCREEN_MODEL_EXPAND: "Landscape Mode",
    SCREEN_MODEL_EXTRA: "Extra Mode",

    changeProp: function(state) {
        this.props.onChange(state);
        this.setState(state);
    },

    getInitialState: function () {
        return {
            doubleScreen: false
        };
    },


    resolution: function(event) {
        var value = $(event.target).html();
        if (value === "1920x1080(16:9)") {
            this.props.onChange({width: 1920, minHeight: 1080});
        } else if (value === "1200x800(16:10)") {
            this.props.onChange({width: 1280, minHeight: 800});
        } else if (value === "1024x768(4:3)") {
            this.props.onChange({width: 1024, minHeight: 768});
        }
        $("resolute-value").html(value);
    },

    toggleScreen: function (event) {
        this.props.onChange({
            doubleScreen: !this.state.doubleScreen
        });
        this.state.doubleScreen = !this.state.doubleScreen;
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
        this.props.onChange({
           expandMode: mode
        });
    },

    selectTheme: function (event) {
        this.props.onChange({
            themeName: event.target.value
        });
    },

    addGridClick: function () {
        this.props.onAddGrid();
    },

    zoomChange: function (event) {
        this.props.onChange({zoom: event.target.value});
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

                <ul className="nav navbar-nav navbar-left">
                    <li><a onClick={this.resolution}>New</a></li>
                    <li><a onClick={this.resolution}>Open</a></li>
                    <li role="presentation" ><a href="#">Save</a></li>
                </ul>

                <ul className="nav navbar-nav navbar-right">
                    <li className="dropdown">
                        <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                            <span className="resolute-value">1024x768(4:3)</span>
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
                        <a onClick={this.toggleScreen} style={{
                            fontSize: "20px",
                            color: "#000"
                        }}>
                        <span  className={this.state.doubleScreen?"glyphicon glyphicon-blackboard":"glyphicon glyphicon-sound-stereo"}></span>
                            </a>
                    </li>

                    <li className="dropdown" style={{
                        display:this.state.doubleScreen?"inherit": "none"
                    }}>
                        <a href="#" className="dropdown-toggle" id="expandType" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                            <span className="value">{this.SCREEN_MODEL_PORTRAIT}</span>
                            <span className="caret"></span>
                        </a>
                        <ul className="dropdown-menu" aria-labelledby="screenMenu">
                            <li><a onClick={this.screenModel}>{this.SCREEN_MODEL_PORTRAIT}</a></li>
                            <li><a onClick={this.screenModel}>{this.SCREEN_MODEL_EXPAND}</a></li>
                            <li><a onClick={this.screenModel}>{this.SCREEN_MODEL_EXTRA}</a></li>
                        </ul>
                    </li>

                    <li className="save">
                        <button type="button" href="#" className="btn btn-success" >Save</button>
                        <button type="button" href="#"  className="btn btn-primary" >Export</button></li>
                </ul>
            </nav>
        );
    }
});

module.exports = NavBar;