/**
 * Created by liuhan on 2015/11/27.
 */

var React = require('react');
var ReactDOM = require('react-dom');

var NavBar = require("./NavBar.jsx");
var PageToolWorkspace = require("./PageToolWorkspace.jsx");
var FileNameDialog = require("./FileNameDialog.jsx");
var OpenPageDialog = require("./OpenPageDialog.jsx");

var AuthoringTool = React.createClass({

    NEW_NAME: "new",

    getInitialState: function () {
        return {
            work : null,
            name: this.NEW_NAME
        };
    },

    componentDidMount: function () {

    },

    configurationChanged: function(config) {

        if(config.name!=="") {
            this.setState({
                work: "authoring",
                name: config.name,
                data: null
            });
        }
    },

    newProject: function() {
        this.refs.fndialog.show();
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
            this.refs.pageworkspace.refs.page.savePageData();
            /**
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
             */
        }
    },

    render: function () {
        var pageWorkspace = "<div/>";
        if (this.state.work==="authoring") {
            pageWorkspace = <PageToolWorkspace data={this.state.data} ref="pageworkspace"/>;
        }
        return (
            <div>
                <NavBar onChange={this.updateState}
                        saveProject={this.saveProject}
                        listProjects={this.listProjects}
                        newProject={this.newProject}
                        newHoneyComb={this.newHoneyComb}
                />
                {pageWorkspace}
                <FileNameDialog configurationChange={this.configurationChanged} ref="fndialog"/>
                <OpenPageDialog ref="openfile" configurationChange={this.configurationChanged} loadLayoutData={this.loadLayoutData} />
            </div>
        );
    }
});

ReactDOM.render(
    <AuthoringTool />,
    document.getElementById('AuthoringTool')
);
