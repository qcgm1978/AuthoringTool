/**
 * Created by hand on 2016/2/19.
 */

var React = require('react');


var AddActivityMenu = React.createClass({

    getInitialState: function () {
        return {

        }
    },

    addSingleChoice: function() {

    },


    render: function() {
        return (
            <div className="menuActivityList" data-show={this.props.show}>
                <div onClick={this.addSingleChoice}><span className="glyphicon glyphicon-align-justify"/><div className="activity-name">Single Choice</div></div>
            </div>
        );
    }
});

module.exports = AddActivityMenu;
