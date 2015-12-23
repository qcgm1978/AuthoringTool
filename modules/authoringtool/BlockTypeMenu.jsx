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
            <div className="blockType" style={{
                    display: this.props.show? "inherit":"none"
            }}>
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

                <div className="blockTypedLists">
                    <div onClick={this.props.addBlock}><div className="rtf" >sample paragraphs</div></div>
                    <div ><h2 className="rtf">Titles</h2></div>
                </div>
            </div>
        );
    }
});

module.exports = BlockTypeMenu;