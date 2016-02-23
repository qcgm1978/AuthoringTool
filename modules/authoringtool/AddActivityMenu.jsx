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
            channel: "activities",
            topic: "single-choice",
            data: {  /**useless data for later usage*/
                sku: "AZDTF4346",
                qty: 21
            }
        });
    },

    render: function() {
        return (
            <div className="menuActivityList" data-show={this.props.show}>
                <div className="category">choice question</div>
                <div onClick={this.addSingleChoice}><span className="glyphicon glyphicon-ok-circle"/><div className="activity-name">Single Choice</div></div>
                <div onClick={this.addSingleChoice}><span className="glyphicon glyphicon-screenshot"/><div className="activity-name">Multiple Choice</div></div>
                <div onClick={this.addSingleChoice}><span className="glyphicon glyphicon-saved"/><div className="activity-name">Highlight</div></div>
                <div onClick={this.addSingleChoice}><span className="glyphicon glyphicon-ok"/><div className="activity-name">Right or Wrong</div></div>
                <div onClick={this.addSingleChoice}><span className="glyphicon glyphicon-ok"/><div className="activity-name">Right or Wrong</div></div>
                <div onClick={this.addSingleChoice}><span className="glyphicon glyphicon-ok"/><div className="activity-name">Right or Wrong</div></div>
                <div onClick={this.addSingleChoice}><span className="glyphicon glyphicon-ok"/><div className="activity-name">Right or Wrong</div></div>
                <div onClick={this.addSingleChoice}><span className="glyphicon glyphicon-ok"/><div className="activity-name">Right or Wrong</div></div>
            </div>
        );
    }
});

module.exports = AddActivityMenu;
