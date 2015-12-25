/**
 * Created by liuhan on 2015/11/27.
 */

var React = require('react');
var ReactDOM = require('react-dom');

var NavBar = require("./NavBar.jsx");
var ThemeScreen = require("./ThemeScreen.jsx");
var FileNameDialog = require("./FileNameDialog.jsx");


var AuthoringTool = React.createClass({

    NEW_NAME: "new",

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
            showGrid: true,
            name: this.NEW_NAME
        };
    },

    componentDidMount: function () {

    },

    themeInitialize: function() {

    },

    configurationChanged: function(state) {
        console.log(state);
        this.setState(state);
    },


    loadProject: function(project) {
        this.refs.themescreen.refs.layout.setLayoutData(

        );

    },

    setDoubleScreen: function(d) {
        this.setState({
            doubleScreen: d
        });
    },

    newProject: function() {
        this.refs.newfile.showDialog();
    },

    listProjects: function() {

    },

    saveProject: function() {
        var tool = this;

        if (this.state.name===this.NEW_NAME) {
            this.newProject();
        } else {
            var layoutData = this.refs.themescreen.refs.layout.getLayoutData();

            $.post("/authoring/update", {
                    name: tool.state.name,
                    showHeader: tool.state.showHeader,
                    showFooter: tool.state.showFooter,
                    expandMode: tool.state.expandMode,
                    theme: tool.state.theme,
                    singleScreenHtml: layoutData.singleScreenHtml,
                    doubleMainHtml: layoutData.doubleMainHtml,
                    doubleExtraHtml: layoutData.doubleExtraHtml
                },
                function() {

                }
            );
        }
    },

    render: function () {
        return (
            <div>
                <NavBar onChange={this.updateState} onAddGrid={this.addGrid}
                        saveProject={this.saveProject}
                        listProjects={this.listProjects}
                        newProject={this.newProject}
                />
                <ThemeScreen configurationChange={this.configurationChanged}
                            theme={this.state.theme} resize={this.themeInitialize} doubleScreen={this.state.doubleScreen}
                            expandMode={this.state.expandMode}
                            width={this.state.width} height={this.state.minHeight}
                            showHeader={this.state.showHeader} showFooter={this.state.showFooter} showGrid={this.state.showGrid}
                            ref="themescreen"/>
                <FileNameDialog configurationChange={this.configurationChanged} ref="newfile"/>
            </div>
        );
    }
});

ReactDOM.render(
    <AuthoringTool />,
    document.getElementById('AuthoringTool')
);
