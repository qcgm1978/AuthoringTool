/**
 * Created by liuhan on 2015/11/27.
 */

var React = require('react');
var ReactDOM = require('react-dom');

var $ = require("jquery");

var GridLines = require("./GridLines.jsx");
var EditPanel = require("../panel/EditorPanel.jsx");
var EditBar = require("../editorbar/EditorBar.jsx");

var ThemeMixins = require("./ThemeMixins");

var PageEditor = React.createClass({

    getInitialState: function () {
        return {
            width: 1024,
            minHeight: 768,
            zoom: 1,
            doubleScreen: false,
            showHeader: true,
            showFooter: true,
            themeName: "default"
        };
    },

    /**在这个DOM ready之中使用jquery与grister初始化格子系统*/
    componentDidMount: function () {

    },

    updateState: function(state) {
        console.log("update state " + JSON.stringify(state));
        this.setState(state);
    },

    render: function () {
        return (
            <div>
                <NavBar onChange={this.updateState}/>
                <ThemeScreen theme={this.state.themeName} doubleScreen={this.state.doubleScreen} width={this.state.width}
                             showHeader={this.state.showHeader} showFooter={this.state.showFooter}
                             minHeight={this.state.minHeight} ref="themescreen"/>
                <EditBar/>
                <EditPanel/>
            </div>
        );
    }
});


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

/**
 * 最终页面组件。 包括了Theme、footer、header等相关设置。
 * 包括虚线指示可布局区域。
 * @type {*|Function}
 */
var ThemeScreen = React.createClass({
    getThemeConfig: function(name) {
        var remote = $.ajax({
            type: "GET",
            url: "templates/default/config.json",
            async: false
        }).responseText;

        this.themeConfig = JSON .parse(remote);
        return this.themeConfig;
    },

    loadTheme: function() {
        var themeConfig = this.getThemeConfig();
        $.ajax({
            type: "GET",
            url: "templates/default/" + themeConfig.default.html,
            dataType : 'html',
            success: function(html) {
                $(".styles").empty();
                $(".header").empty().append($(html).filter("header"));
                $(".footer").empty().append($(html).filter("footer"));
                $(html).filter("link").each(function() {
                    $(".styles").append('<link rel="stylesheet" href="templates/default/'
                        + $(this).attr("href") + '">');
                });
                $(".header").height()+ $(".footer").height();
            }
        });
    },

    componentDidMount: function () {
        this.loadTheme();
    },

    render: function () {
        var swidth = this.props.width;

        if (this.props.doubleScreen) {
            swidth = swidth * 2;
        }
        return (
            <div className="screen" style={{
                        width:  this.props.width,
                        minHeight: this.props.minHeight,
                        WebkitTransform:'scale(' + this.props.zoom + ')'}}>
                <div className="styles"></div>
                <div className="header"></div>
                <GridLayout/>
                <GridLines width={this.props.width} minHeight={this.props.minHeight}
                           doubleScreen={this.props.doubleScreen}/>
                <div className="footer"></div>
            </div>
        );
    }
});

var GridLayout = React.createClass({

    componentDidMount: function () {
        $(".gridster ul").gridster({
            widget_margins: [1, 1],
            widget_base_dimensions: [Math.floor((this.props.width) / 12 - 2), (this.props.minHeight) / 30 - 2],
            min_cols: 12,
            resize: {
                enabled: true
            }
        });
        EditPanel.init();
    },

    componentDidUpdate: function () {
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
        EditPanel.init();
    },

    addGrid: function () {
        var gridster = $(".gridster ul").gridster().data('gridster');
        gridster.add_widget("<li class='j-grid-block player-revert'></li>", 12, 2, 1, 1);
        EditPanel.init();
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

var Screen = React.createClass({
    mixins: [ThemeMixins],

    componentDidMount: function () {
        this.loadTheme();

        $(".gridster ul").gridster({
            widget_margins: [1, 1],
            widget_base_dimensions: [Math.floor((this.props.width) / 12 - 2), (this.props.minHeight) / 30 - 2],
            min_cols: 12,
            resize: {
                enabled: true
            }
        });
        EditPanel.init();
    },

    componentDidUpdate: function () {
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
        EditPanel.init();
    },

    addGrid: function () {
        var gridster = $(".gridster ul").gridster().data('gridster');
        gridster.add_widget("<li class='j-grid-block player-revert'></li>", 12, 2, 1, 1);
        EditPanel.init();
    },

    saveGridInfo: function () {

    },

    render: function () {
        var swidth = this.props.width;

        if (this.props.doubleScreen) {
            swidth = swidth * 2;
        }
        return (
            <div className="screen" style={{
                        width:  this.props.width,
                        minHeight: this.props.minHeight,
                        WebkitTransform:'scale(' + this.props.zoom + ')'}}>
                <div className="styles"></div>
                <div className="header"></div>
                <div className="gridster">
                    <ul>
                        <li data-row="1" data-col="1" data-sizex="12" data-sizey="2"
                            className="j-grid-block player-revert"></li>
                        <li data-row="3" data-col="1" data-sizex="8" data-sizey="2"
                            className="j-grid-block player-revert"></li>
                    </ul>
                </div>
                <div className="footer"></div>
            </div>
        );
    }
});

ReactDOM.render(
    <PageEditor />,
    document.getElementById('AuthoringTool')
);
