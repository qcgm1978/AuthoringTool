/**
 * Created by liuhan on 2015/11/27.
 */

var React = require('react');
var ReactDOM = require('react-dom');

var $ = require("jquery");

var NavBar = require("./NavBar.jsx");
var ThemeScreen = require("./ThemeScreen.jsx");

/*
var EditPanel = require("../panel/EditorPanel.jsx");
var EditBar = require("../editorbar/EditorBar.jsx");
*/
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
            expandMode: 1,
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
                             expandMode={this.state.expandMode}
                             width={this.state.width} height={this.state.minHeight}
                             showHeader={this.state.showHeader} showFooter={this.state.showFooter} showGrid={this.state.showGrid}
                             ref="themescreen"/>

            </div>
        );
    }
});

ReactDOM.render(
    <PageEditor />,
    document.getElementById('AuthoringTool')
);
