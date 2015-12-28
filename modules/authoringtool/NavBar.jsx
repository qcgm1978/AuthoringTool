/**
 * Created by liuhan
 * on 2015/12/15.
 */
var React = require('react');

var NavBar = React.createClass({

    changeProp: function(state) {
        this.props.onChange(state);
        this.setState(state);
    },

    render: function() {
        return (
            <nav className="navbar navbar-default navbar-fixed-top">
                <a className="navbar-brand" href="#">Authoring Tool</a>

                <ul className="nav navbar-nav navbar-left">

                    <li className="dropdown">
                        <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                            <span className="resolute-value">Project</span>
                            <span className="caret"></span>
                        </a>
                        <ul className="dropdown-menu" aria-labelledby="Resolution">
                            <li><a onClick={this.props.newProject}>New Page..</a></li>
                            <li><a onClick={this.props.newHoneyComb}>New Honeycomb..</a></li>
                            <li><a onClick={this.props.listProjects}>Open</a></li>
                        </ul>
                    </li>
                </ul>

                <ul className="nav navbar-nav navbar-right">
                    <li className="save">
                        <button type="button" href="#" onClick={this.props.saveProject} className="btn btn-success" >Save</button>
                        <button type="button" href="#"  className="btn btn-primary" >Export</button></li>
                </ul>
            </nav>
        );
    }
});

module.exports = NavBar;