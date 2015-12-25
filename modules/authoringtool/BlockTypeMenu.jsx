var React = require('react');
var ChooseImageMenu = require("./ChooseImageMenu.jsx");
var AddTextMenu = require("./AddTextMenu.jsx");

var BlockTypeMenu = React.createClass({
    getInitialState: function () {
        return {
            page: "addText"
        }
    },

    componentDidMount: function () {

    },

    componentWillReceiveProps: function(nextProps) {
    },

    showAddText: function() {
        this.setState({
            page: "addText"
        });
    },

    showAddImage: function() {
        this.setState({
            page: "chooseImage"
        });
    },


    render: function () {
        return (
            <div className="blockType" style={{
                    display: this.props.show? "inherit":"none"
            }}>
                <ul className="category-list">
                    <li className="category">
                        <span className={(this.state.page==="addText")?"current":""} onClick={this.showAddText}>Text</span>
                    </li>
                    <li className="category">
                        <span className={(this.state.page==="chooseImage")?"current":""} onClick={this.showAddImage}>Image</span>
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
                <AddTextMenu show={this.state.page==="addText"} addBlock={this.props.addBlock}/>
                <ChooseImageMenu show={this.state.page==="chooseImage"} addBlock={this.props.addBlock}/>
            </div>
        );
    }
});

module.exports = BlockTypeMenu;