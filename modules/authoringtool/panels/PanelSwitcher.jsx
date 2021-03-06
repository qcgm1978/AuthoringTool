//editor component
var React = require('react');
var EditTextPanel = require("./EditTextPanel.jsx");
var SingleChoicePanel = require("./SingleChoicePanel.jsx");
var AuthoringInfo = require("../AuthoringInfo");
var postal = require("postal");
var PanelSwitcher = React.createClass({
    getInitialState: function () {
        return {
            panel: null,
            json: null
        }
    },
    panels: {},
    componentWillMount: function () {
        this.panels["text"] = EditTextPanel;
        this.panels["single-choice"] = SingleChoicePanel;
    },
    componentDidMount: function () {
        var switcher = this;
        postal.subscribe({
            channel: "block",
            topic: "selected",
            callback: function (data, envelope) {
                $(".panelSwitcher").show();
                switcher.setState({
                    panel: data.type,
                    json: AuthoringInfo.data.widgetJSON[data.blockId],
                    blockId: data.blockId
                });
            }
        });
        postal.subscribe({
            channel: "workspace",
            topic: "reset",
            callback: function (data, envelope) {
                $(".panelSwitcher").hide();
            }
        });
    },
    render: function () {
        var panel = null;
        if (this.state.panel === "text") {
            panel = <EditTextPanel/>
        } else if (this.state.panel === "single-choice") {
            panel = <SingleChoicePanel json={this.state.json} blockId={this.state.blockId}/>
        }
        return (
            <div className="panelSwitcher" style={{
                    display: "none"
            }}>
                {panel}
            </div>
        );
    }
});
module.exports = PanelSwitcher;