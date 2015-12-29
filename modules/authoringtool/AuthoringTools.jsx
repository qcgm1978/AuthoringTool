/**
 * Created by liuhan on 2015/11/27.
 */

var React = require('react');
var ReactDOM = require('react-dom');

var NavBar = require("./NavBar.jsx");
var ThemeScreen = require("./ThemeScreen.jsx");
var FileNameDialog = require("./FileNameDialog.jsx");
var OpenPageDialog = require("./OpenPageDialog.jsx");



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
            work : null,
            name: this.NEW_NAME
        };
    },

    componentDidMount: function () {

    },

    themeInitialize: function() {

    },

    configurationChanged: function(state) {
        this.setState(state);
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
        this.refs.openfile.showDialog();
    },


    newHoneyComb: function() {

    },

    saveProject: function() {
        var tool = this;
        if (this.state.name===this.NEW_NAME) {
            this.newProject();
        } else {
            var layoutData = this.refs.themescreen.refs.layout.getData();
            $.post("/authoring/update",
                {name: tool.state.name,
                    showHeader: tool.state.showHeader,
                    showFooter: tool.state.showFooter,
                    expandMode: tool.state.expandMode,
                    theme: tool.state.theme,
                    data: JSON.stringify(layoutData)
                },

                function() {

                }
            );
        }
    },

    render: function () {
        var workingspace = "<div/>";
        if (this.state.work==="authoring") {
            workingspace = <ThemeScreen configurationChange={this.configurationChanged} show={this.state.work==="authoring"}
                                        theme={this.state.theme} resize={this.themeInitialize} doubleScreen={this.state.doubleScreen}
                                        expandMode={this.state.expandMode}
                                        width={this.state.width} height={this.state.minHeight}
                                        gdata={this.state.gdata}
                                        showHeader={this.state.showHeader} showFooter={this.state.showFooter} showGrid={this.state.showGrid}
                                        ref="themescreen"/>;
        }
        return (
            <div>
                <NavBar onChange={this.updateState} onAddGrid={this.addGrid}
                        saveProject={this.saveProject}
                        listProjects={this.listProjects}
                        newProject={this.newProject}
                        newHoneyComb={this.newHoneyComb}
                />
                {workingspace}
                <FileNameDialog configurationChange={this.configurationChanged} ref="newfile"/>
                <OpenPageDialog ref="openfile" configurationChange={this.configurationChanged} loadLayoutData={this.loadLayoutData} />
            </div>
        );
    }
});

ReactDOM.render(
    <AuthoringTool />,
    document.getElementById('AuthoringTool')
);
