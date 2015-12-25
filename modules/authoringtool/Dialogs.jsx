var React = require('react');
var FileNameDialog = require("./FileNameDialog.jsx");

var Dialogs = React.createClass({
    getInitialState: function () {
        return {
        }
    },

    openNameDialog: function() {

    },

    componentDidMount: function () {
    },

    componentWillReceiveProps: function(nextProps) {
    },


    render: function () {
        return (
            <div>
                <FileNameDialog ref="filename"/>
            </div>
        );
    }
});

module.exports = Dialogs;
