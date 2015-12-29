var React = require('react');

var moment = require('moment');

var OpenPageDialog = React.createClass({

    getInitialState: function () {
        return {
           files: []
        }
    },

    componentDidMount: function () {

    },

    showDialog: function() {
        var dialog = this;
        $.getJSON("/authoring/list",{},
            function(data) {
                $('#list-file-dialog').modal('show');
                dialog.setState({
                    files: data
                });
        });

    },
    open : function(item) {
        console.log(item);
        this.props.configurationChange({
            "name": item.name,
            'expandMode': parseInt(item.expandMode),
            'showFooter': Boolean.valueOf(item.showFooter),
            'theme': item.theme,
            'showHeader': Boolean.valueOf(item.showHeader),
            "work":"authoring",
            "gdata": JSON.parse(item.data)
        });
        $('#list-file-dialog').modal('hide');
    },

    componentWillReceiveProps: function(nextProps) {

    },

    render: function () {
        var dialog = this;
        var createItem =  function(item) {
            return <li className="list-group-item" key={item._id} onClick={dialog.open.bind(dialog, item)}>
                    <span className="badge">14</span>
                    {item.name}
                    </li>;
        };

        return (
            <div className="modal fade bs-example-modal-sm" id="list-file-dialog" role="dialog" aria-labelledby="mySmallModalLabel">
                <div className="modal-dialog modal-sm">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <h4 className="modal-title">Recent Pages</h4>
                        </div>
                        <div className="modal-body">
                            <ul className="list-group">{this.state.files.map(createItem)}</ul>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = OpenPageDialog;