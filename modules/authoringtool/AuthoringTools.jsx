/**
 * Created by liuhan on 2015/11/27.
 */

var React = require('react');
var ReactDOM = require('react-dom');
var NavBar = require("./NavBar.jsx");
var PageToolWorkspace = require("./PageToolWorkspace.jsx");
var FileNameDialog = require("./FileNameDialog.jsx");
var OpenPageDialog = require("./OpenPageDialog.jsx");
var AuthoringTool = React.createClass({//Create a component class
    NEW_NAME: "new",
    //Invoked once before the component is mounted. The return value will be used as the initial value of this.state.
    getInitialState: function () {
        return {
            work: null,
            name: this.NEW_NAME
        };
    },
    //Invoked once, only on the client (not on the server), immediately after the initial rendering occurs.
    componentDidMount: function () {
        //console.log('it is initial rendering')
    },
    configurationChanged: function (config) {
        if (config.name !== "") {
            this.setState({
                work: "authoring",
                name: config.name,
                data: null
            });
        }
    },
    newProject: function () {
        //debugger;
        if (this.refs.fndialog) {
            this.refs.fndialog.show();
        }
    },
    listProjects: function () {
        debugger;
        this.refs.openfile.showDialog();
    },
    newHoneyComb: function () {
        debugger;
    },
    saveProject: function () {
        var tool = this;
        if (this.state.name === this.NEW_NAME) {
            this.newProject();
        } else {
            this.refs.pageworkspace.refs.page.savePageData();
            /**
            var layoutData = this.refs.themescreen.refs.layout.getData();
            $.post("/authoring/update",
                {
                    name: tool.state.name,
                    showHeader: tool.state.showHeader,
                    showFooter: tool.state.showFooter,
                    expandMode: tool.state.expandMode,
                    theme: tool.state.theme,
                    data: JSON.stringify(layoutData)
                },
                function () {
                }
            );
             */
        }
    },
// implements a render method which returns one single child.
//    When called, it should examine this.props and this.state and return a single child element.
    render: function () {
        var pageWorkspace = "<div/>";
        if (this.state.work === "authoring") {
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
                <FileNameDialog configurationChange={this.configurationChanged} />
                <OpenPageDialog ref="openfile" configurationChange={this.configurationChanged}
                                loadLayoutData={this.loadLayoutData}/>
            </div>
        );
    }
});
//Render a ReactElement into the DOM in the supplied container and return a reference to the component (or returns null for stateless components).
ReactDOM.render(
    <AuthoringTool />,
    document.getElementById('AuthoringTool')
);
