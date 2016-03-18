var React = require('react');
var ChooseImageMenu = require("./ChooseImageMenu.jsx");
var AddTextMenu = require("./AddTextMenu.jsx");
var AddActivityMenu = require("./AddActivityMenu.jsx");
var BlockTypeMenu = React.createClass({
    getInitialState: function () {
        //var { checked, ...other } = props;
        return {
            page: "addText"
        }
    },
    componentDidMount: function () {
    },
    componentWillReceiveProps: function (nextProps) {
    },
    showAddText: function (event) {
        event.stopPropagation();
        this.setState({
            page: "addText"
        });
    },
    showAddImage: function (event) {
        event.stopPropagation();
        this.setState({
            page: "chooseImage"
        });
    },
    showAddActivity: function (event) {
        event.stopPropagation();
        //this.setState({
        //    page: "addActivity"
        //});
    },
    adddActivity: function (prop) {
        event.stopPropagation();
        this.props.adddActivity(prop);
    },
    stopPropagation: function (event) {
        event.stopPropagation();
    },
    render: function () {
        //var {show,...others}=this.props;
        return (
            <div className={this.props.show?"blockType shown":"blockType"} onClick={this.stopPropagation}>
                <ul className="category-list">
                    <li className="category">
                        <span className={(this.state.page==="addText")?"current":""}
                              onClick={this.showAddText}>Text</span>
                    </li>
                    <li className="category">
                        <span className={(this.state.page==="chooseImage")?"current":""} onClick={this.showAddImage}>Image</span>
                    </li>
                    <li className="category">
                        <span>Media</span>
                    </li>
                    <li className="category">
                        <span className={(this.state.page==="addActivity")?"current":""} onClick={this.showAddActivity}>Activity</span>
                    </li>
                </ul>
                <AddTextMenu show={this.state.page==="addText"} addBlock={this.props.addBlock}
                             parentStateChange={this.props.parentStateChange}/>
                <ChooseImageMenu show={this.state.page==="chooseImage"} addBlock={this.props.addBlock}/>
                <AddActivityMenu addActivity={this.adddActivity} show={this.state.page==="addActivity"}/>

            </div>
        );
    }
});
module.exports = BlockTypeMenu;