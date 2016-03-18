var React = require('react');

var EditTextPanel = require("./EditTextPanel.jsx");
var SingleChoicePanel = require("./SingleChoicePanel.jsx");
var postal = require("postal");

/**
 * Abstract base panel class
 */

var RightPanel = React.createClass({

    getInitialState: function () {
        return {
            panel: null
        }
    },

    stateChange: function(newstate) {
        this.setState(newstate);
    },

    componentDidMount: function () {
        var panel = this;
        postal.subscribe({
            channel: "block",
            topic: "selected",
            callback: function(data, envelope) {
                $(".rightPanel").show();
                var li = $("li[data-id='" + data.blockId + "']");
                console.log(li);
                if (li.data("type")==="text") {
                    panel.setState({
                        panel: "edit-text"
                    });

                }
            }
        });

        postal.subscribe({
            channel: "workspace",
            topic: "reset",
            callback: function(data, envelope) {
                $(".rightPanel").hide();
            }
        })
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
                    display: "none"
            }} onClick={this.preventUp}>
                <div className="pn-header">
                    <div className="pn-title">Edit Block</div>
                    <span className="glyphicon glyphicon-remove btn-close" onClick={this.close}></span>
                </div>
                <div className="pn-body">
                    <EditTextPanel display={this.state.panel==="edit-text"}/>
                    <SingleChoicePanel display={this.state.panel==="edit-single-choice"}/>
                </div>
            </div>
        );
    }
});

module.exports = RightPanel;