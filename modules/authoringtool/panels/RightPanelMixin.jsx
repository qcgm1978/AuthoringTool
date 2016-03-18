var React = require('react');
var postal = require("postal");
var _ = require("underscore");
var RightPanelMixin = {
    componentDidMount: function () {
        var panel = this;
    },
    componentWillReceiveProps: function (nextProps) {
    },
    sendJSON2Block: function (json) {
        postal.publish({
            channel: "block",
            topic: "update",
            data: json
        });
    },
    close: function () {
        $(".rightPanel").hide();
        $(".panelSwitcher").hide()
    },
    preventUp: function (event) {
        event.stopPropagation();
    },
    render: function () {
        if (!_.isFunction(this.renderEditor)) {
            return <div>
                Your component require to implement renderEditor() method
            </div>;
        }
        var editor = this.renderEditor();
        var width = this.state.width || 420;
        return (
            <div onClick={this.preventUp} style={{
                width: width
            }}>
                <div className="pn-header">
                    <div className="pn-title">Edit {this.getName()}</div>
                    <span className="glyphicon glyphicon-remove btn-close" onClick={this.close}></span>
                </div>
                <div className="pn-body">
                    <div className="basic page">
                        <form className="form-horizontal">
                            <div className="form-group">
                                <label className="col-xs-5 control-label">Horizontal Align</label>

                                <div className="btn-group" role="group">
                                    <button type="button"
                                            className="btn btn-default glyphicon glyphicon-align-left"></button>
                                    <button type="button"
                                            className="btn btn-default glyphicon glyphicon-align-center"></button>
                                    <button type="button"
                                            className="btn btn-default glyphicon glyphicon-align-right"></button>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-xs-5 control-label">Vertical Align</label>

                                <div className="btn-group" role="group">
                                    <button type="button"
                                            className="btn btn-default glyphicon glyphicon-align-left"></button>
                                    <button type="button"
                                            className="btn btn-default glyphicon glyphicon-align-center"></button>
                                    <button type="button"
                                            className="btn btn-default glyphicon glyphicon-align-right"></button>
                                </div>
                            </div>
                        </form>
                    </div>

                    <div className="content page">
                        {editor}
                    </div>
                </div>
            </div>
        );
    }
};
module.exports = RightPanelMixin;