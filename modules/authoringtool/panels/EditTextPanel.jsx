var React = require('react');

var EditTextPanel = React.createClass({

    getInitialState: function () {
        return {

        }
    },

    componentDidMount: function () {

    },

    componentWillReceiveProps: function(nextProps) {

    },

    preventUp: function(event) {
        event.stopPropagation();
    },

    render: function () {
        return (
            <div className="editTextPanel" style={{
                    display: this.props.display? "inherit":"none"
            }} >
                <div className="form-group">
                    <p className="label" >Horizontal Align</p>
                    <div className="btn-group" role="group" aria-label="...">
                        <button type="button" className="btn btn-default glyphicon glyphicon-align-left"></button>
                        <button type="button" className="btn btn-default glyphicon glyphicon-align-center"></button>
                        <button type="button" className="btn btn-default glyphicon glyphicon-align-right"></button>
                    </div>
                </div>

                <div className="form-group">
                    <p className="label" >Vertical Align</p>
                    <div className="btn-group" role="group" aria-label="...">
                        <button type="button" className="btn btn-default glyphicon glyphicon-align-left"></button>
                        <button type="button" className="btn btn-default glyphicon glyphicon-align-center"></button>
                        <button type="button" className="btn btn-default glyphicon glyphicon-align-right"></button>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = EditTextPanel;