var React = require('react');

var SingleChoicePanel = React.createClass({

    getInitialState: function () {
        return {

        }
    },

    componentDidMount: function () {

    },

    componentWillReceiveProps: function(nextProps) {

    },

    render: function () {
        return (
            <div className="single-choice-panel" style={{
                    display: this.props.display? "inherit":"none"
            }}>

            </div>
        );
    }
});

module.exports = SingleChoicePanel;