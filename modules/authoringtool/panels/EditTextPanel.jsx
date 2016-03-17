var React = require('react');

var RightPanelMixin = require("./RightPanelMixin.jsx");

var EditTextPanel = React.createClass({

    mixins: [RightPanelMixin], // Use the mixin
    getInitialState: function () {
        return {

        }
    },

    getName: function() {
      return "Text";
    },


    componentDidMount: function () {

    },

    componentWillReceiveProps: function(nextProps) {

    },

    renderEditor: function() {
      return <div>Hi</div>
    }
    /*
    render: function () {
        return (
            <div className="editTextPanel" style={{
                    display: this.props.display? "inherit":"none"
            }} >
                <div className="form-group">
                    <p className="label">Horizontal Align</p>
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
    */
});

module.exports = EditTextPanel;