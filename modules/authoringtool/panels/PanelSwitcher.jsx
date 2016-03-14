var React = require('react');

var EditTextPanel = require("./EditTextPanel.jsx");
var SingleChoicePanel = require("./SingleChoicePanel.jsx");

var postal = require("postal");

var PanelSwitcher = React.createClass({

    getInitialState: function () {
        return {
            panel: null
        }
    },

    panels: {},

    componentWillMount: function() {
        this.panels["text"] = EditTextPanel;
        this.panels["single-choice"] = SingleChoicePanel;
    },

    componentDidMount: function () {
        var switcher = this;
        postal.subscribe({
            channel: "block",
            topic: "selected",
            callback: function(data, envelope) {
                console.log(data);
                $(".panelSwitcher").show();
                switcher.setState({
                    panel: data.type
                });
            }
        });

        postal.subscribe({
            channel: "workspace",
            topic: "reset",
            callback: function(data, envelope) {
                $(".panelSwitcher").hide();
            }
        })
    },

    render: function () {
        var panel = null;
        if (this.state.panel==="text") {
            panel = <EditTextPanel/>
        } else if (this.state.panel==="single-choice") {
            panel = <SingleChoicePanel/>
        }



        return (
            <div className="panelSwitcher" style={{
                    display: "none"
            }} >
                {panel}
            </div>
        );
    }
});

module.exports = PanelSwitcher;