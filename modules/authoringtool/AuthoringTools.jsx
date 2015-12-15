/**
 * Created by liuhan on 2015/11/27.
 */

var React = require('react');
var ReactDOM = require('react-dom');

var $ = require("jquery");

var NavBar = require("./NavBar.jsx");
var ThemeScreen = require("./ThemeScreen.jsx");

var EditPanel = require("../panel/EditorPanel.jsx");
var EditBar = require("../editorbar/EditorBar.jsx");

var PageEditor = React.createClass({

    getInitialState: function () {
        return {
            width: 1024,
            minHeight: 768,
            zoom: 1,
            doubleScreen: false,
            showHeader: true,
            showFooter: true,
            theme: "default",
            showGrid: true
        };
    },

    componentDidMount: function () {

    },

    themeInitialize: function() {

    },

    addGrid: function() {
        this.refs["themescreen"].moreGrid();
    },

    updateState: function(state) {
        this.setState(state);
    },

    render: function () {
        return (
            <div>
                <NavBar onChange={this.updateState} onAddGrid={this.addGrid}/>
                <ThemeScreen theme={this.state.theme} resize={this.themeInitialize} doubleScreen={this.state.doubleScreen}
                             width={this.state.width} height={this.state.minHeight}
                             showHeader={this.state.showHeader} showFooter={this.state.showFooter} showGrid={this.state.showGrid}
                             ref="themescreen"/>
                <EditBar/>
                <EditPanel/>
            </div>
        );
    }
});

var Screen = React.createClass({
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
