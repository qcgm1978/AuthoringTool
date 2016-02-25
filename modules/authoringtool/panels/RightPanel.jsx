var React = require('react');

var EditTextPanel = require("./EditTextPanel.jsx");
var SingleChoicePanel = require("./SingleChoicePanel.jsx");


var RightPanel = React.createClass({

    getInitialState: function () {
        return {
            subpanel: 'edit-text'
        }
    },

    stateChange: function(newstate) {
        this.setState(newstate);
    },

    componentDidMount: function () {

    },

    componentWillReceiveProps: function(nextProps) {

    },

    close: function() {

    },

    preventUp: function(event) {
        event.stopPropagation();
    },

    render: function () {
        return (
            <div className="rightPanel" style={{
                    display: this.props.display? "inherit":"none"
            }} onClick={this.preventUp}>
                <div className="pn-header">
                    <div className="pn-title">Header</div>
                    <span className="glyphicon glyphicon-remove btn-close" onClick={this.close}></span>
                </div>
                <div className="pn-body">
                    <EditTextPanel display={this.props.subpanel==="edit-text"}/>
                    <SingleChoicePanel display={this.props.subpanel==="edit-single-choice"}/>
                </div>
            </div>
        );
    }
});

module.exports = RightPanel;