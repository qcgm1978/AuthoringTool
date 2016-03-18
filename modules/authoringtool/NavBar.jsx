/**
 * Created by liuhan
 * on 2015/12/15.
 */
var React = require('react');
var ExportToZip = require("./ExportToZip");

var NavBar = React.createClass({
    changeProp: function (state) {
        this.props.onChange(state);
        this.setState(state);
    },

    exportZip: function() {
        this.props.saveProject();
        ExportToZip.exportZ();
    },

    render: function() {
        return (
            //The HTML nav element (HTML Navigation Element) represents a section of a page that links to other pages
            /*The aria-labelledby attribute contains the element IDs of labels in objects such as input elements, widgets, and groups.*/
            <nav className="navbar navbar-default navbar-fixed-top">
                <a className="navbar-brand" href="javascript:void(0)">Authoring Tool</a>

                <ul className="nav navbar-nav navbar-left">

                    <li className="dropdown">
                        <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button"
                           aria-haspopup="true" aria-expanded="false">
                            <span className="resolute-value">Project</span>
                            <span className="caret"></span>
                        </a>
                        <ul className="dropdown-menu" aria-labelledby="Resolution">
                            <li><a data-toggle="modal" data-target=".bs-example-modal-lg">New Page..</a></li>
                            <li><a onClick={this.props.newHoneyComb}>New Honeycomb..</a></li>
                            <li><a onClick={this.props.listProjects}>Open</a></li>
                        </ul>

                    </li>
                </ul>

                <ul className="nav navbar-nav navbar-right">
                    <li className="save">
                        <button type="button" href="#" onClick={this.props.saveProject} className="btn btn-success" >Save</button>
                        <button type="button" href="#" onClick={this.exportZip} className="btn btn-primary" >Export</button></li>
                </ul>
            </nav>
        );
    }
});
//Here we make use of the special object module and place a reference of our variable into module.exports so the CommonJS module system knows this is the object of our module we want to show to the world
module.exports = NavBar;