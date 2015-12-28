var React = require('react');
var LinkedStateMixin = require('react-addons-linked-state-mixin');


var FileNameDialog = React.createClass({

    mixins: [LinkedStateMixin],
    getInitialState: function () {
        return {
            name : ""
        }
    },

    componentDidMount: function () {

    },

    showDialog: function() {
        $('#save-file-name-dialog').modal('show');
    },

    saveDialog: function() {
        if (this.state.name!="") {
            $('#save-file-name-dialog').modal('hide');
            this.props.configurationChange({"name": this.state.name, "work":"authoring"});
        }
    },

    componentWillReceiveProps: function(nextProps) {

    },

    render: function () {
        return (
            <div className="modal fade bs-example-modal-sm" id="save-file-name-dialog" role="dialog" aria-labelledby="mySmallModalLabel">
                <div className="modal-dialog modal-sm">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <h4 className="modal-title">New Project Name</h4>
                        </div>
                        <div className="modal-body">
                            <p><input type="text" className="form-control" valueLink={this.linkState('name')}/></p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                            <button type="button" onClick={this.saveDialog} className="btn btn-primary">Confirm</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = FileNameDialog;