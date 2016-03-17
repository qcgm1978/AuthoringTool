/**
 * Created by hand on 2016/2/19.
 */

var React = require('react');
var SingleChoicePanel = require("../panels/SingleChoicePanel.jsx");

var postal = require("postal");

var AddActivityMenu = React.createClass({

    SINGLE_CHOICE_JSON :  {
        "text":"Single Choice Question",
        "choices":
            [
                {
                    "key" : "A",
                    "type":"text",
                    "text":"First Choice",
                    "flag":"right"
                },
                {
                    "key" : "B",
                    "type":"text",
                    "text":"Second Choice",
                    "flag":"wrong"
                },
                {
                    "key" : "C",
                    "type":"text",
                    "text":"Third Choice",
                    "flag":"wrong"
                }
            ],
        "label type":"alphabet",
        "order type":"0"
    },

    getInitialState: function () {
        return {

        }
    },

    addSingleChoice: function() {
        var cloned = _.extend({}, this.SINGLE_CHOICE_JSON);
        postal.publish({
            channel: "block",
            topic: "add",
            data: {
                type: "single-choice",
                html: SingleChoicePanel.renderHTML(cloned),
                json: cloned
            }
        });
        postal.publish({
            channel: "workspace",
            topic: "reset"
        });
    },

    render: function() {
        return (
            <div className="menuActivityList" data-show={this.props.show}>
                <div className="category">choice question</div>
                <div onClick={this.addSingleChoice}><span className="glyphicon glyphicon-ok-circle"/><div className="activity-name">Single Choice</div></div>
            </div>
        );
    }
});

module.exports = AddActivityMenu;
