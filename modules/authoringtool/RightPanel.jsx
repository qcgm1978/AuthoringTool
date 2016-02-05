var React = require('react');

var RightPanel = React.createClass({

    getInitialState: function () {
        return {
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
        alert(this);
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
                    <div className="block-setting text-content">
                        <button type="button" className="btn btn-primary btn-lg btn-block">Edit Text</button>
                    </div>
                    <div className="common-config">
                        <div className="form-group">
                            <p className="label" >Horizontal</p>
                            <div className="btn-group" role="group" aria-label="...">
                                <button type="button" className="btn btn-default glyphicon glyphicon-align-left"></button>
                                <button type="button" className="btn btn-default glyphicon glyphicon-align-center"></button>
                                <button type="button" className="btn btn-default glyphicon glyphicon-align-right"></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = RightPanel;