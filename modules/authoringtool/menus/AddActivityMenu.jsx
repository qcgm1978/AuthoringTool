/**
 * Created by hand on 2016/2/19.
 */

var React = require('react');
var postal = require("postal");

var channel = postal.channel("activities");

var AddActivityMenu = React.createClass({

    getInitialState: function () {
        return {

        }
    },

    addSingleChoice: function() {
        postal.publish({
            channel: "block",
            topic: "add",
            data: {
                type: "single-choice",
                html: ''
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
