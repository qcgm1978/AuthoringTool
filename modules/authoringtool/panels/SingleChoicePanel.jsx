var React = require('react');

var RightPanelMixin = require("./RightPanelMixin.jsx");

var SingleChoicePanel = React.createClass({
    mixins: [RightPanelMixin], // Use the mixin

    getInitialState: function () {
        return {
            answer:  {
                "text":"Single Choice Question",
                "choices":
                    [
                        {
                            "type":"text",
                            "text":"First Choice",
                            "flag":"right"
                        },
                        {
                            "type":"text",
                            "text":"Second Choice",
                            "flag":"wrong"
                        },
                        {
                            "type":"text",
                            "text":"Third Choice",
                            "flag":"wrong"
                        }
                    ],
                "label type":"alphabet",
                "order type":"0"
            }
        }
    },

    getName: function() {
        return "Single Choice";
    },

    componentDidMount: function () {

    },

    componentWillReceiveProps: function(nextProps) {

    },

    renderEditor: function() {
        return <div>
            <div className="form-group">
                <label >Question</label>
                <textarea className="form-control" value={this.state.answer.text}></textarea>
            </div>

            <div className="form-group">
            </div>


        </div>
    }

});

module.exports = SingleChoicePanel;