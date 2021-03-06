var React = require('react');
//This package provides the React LinkedStateMixin add-on.
//ReactLink is an easy way to express two-way binding with React.
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var FileNameDialog = React.createClass({
    mixins: [LinkedStateMixin],
    getInitialState: function () {
        return {
            name: "Lesson"
        }
    },
    componentDidMount: function () {
        $('.form-control').focus()

    },
    show: function () {
        $('#save-file-name-dialog').modal('show');
    },
    handleKeyUp: function (evt) {
        if (evt.keyCode == 13) {
            this.saveDialog();
        }
    },
    saveDialog: function () {
        if (this.state.name !== "") {
            $('#save-file-name-dialog').modal('toggle');
            this.props.configurationChange({
                "name": this.state.name
            });
        }
    },
    componentWillReceiveProps: function (nextProps) {
    },
    componentDidUpdate: ()=> {
    },
    render: function () {
        return (
            <div className="modal fade bs-example-modal-lg"
                 id="save-file-name-dialog" role="dialog"
                 aria-labelledby="mySmallModalLabel">
                <div className="modal-dialog modal-sm">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span
                                aria-hidden="true">&times;</span></button>
                            <h4 className="modal-title">New Project Name</h4>
                        </div>
                        <div className="modal-body">
                            <p><input type="text" className="form-control" onChange={this.linkState} value={('name')}
                                      onKeyUp={this.handleKeyUp}/></p>
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