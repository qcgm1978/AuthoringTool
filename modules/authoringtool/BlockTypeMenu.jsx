var React = require('react');

var BlockTypeMenu = React.createClass({
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
            <div className="blockType">
                <ul className="category-list">
                    <li className="category">
                        <span>Text</span>
                    </li>
                    <li className="category">
                        <span>Image</span>
                    </li>
                    <li className="category">
                        <span>Video</span>
                    </li>
                    <li className="category">
                        <span>Audio</span>
                    </li>
                    <li className="category">
                        <span>Activity</span>
                    </li>
                </ul>
            </div>
        );
    }
});

module.exports = BlockTypeMenu;