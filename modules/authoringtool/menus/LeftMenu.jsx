var React = require('react');


var BlockTypeMenu = require("./BlockTypeMenu.jsx");
var PageConfigMenu = require("./PageConfigMenu.jsx");


var LeftMenu = React.createClass({

    getInitialState: function () {
        return {
            showBlockTypes: false,
            showConfigMenu: false
        }
    },

    stateChange: function(newstate) {
        this.setState(newstate);
    },

    componentDidMount: function () {

    },

    resolution: function(value) {
        if (value === "1920x1080") {
            this.props.configurationChange({width: 1920, minHeight: 1080});
        } else if (value === "1280x800") {
            this.props.configurationChange({width: 1280, minHeight: 800});
        } else if (value === "1024x768") {
            this.props.configurationChange({width: 1024, minHeight: 768});
        }
    },

    componentWillReceiveProps: function(nextProps) {

    },

    clearState: function() {
        this.setState({
            showBlockTypes: false,
            showConfigMenu: false
        }) ;
    },

    showBlockTypes: function(event) {
        if (!this.props.doubleScreen) {
            this.setState({
                showBlockTypes: !this.state.showBlockTypes,
                showConfigMenu: false
            }) ;
        }
        event.stopPropagation();
    },

    showConfigMenu: function(event) {
        this.setState({
            showConfigMenu: !this.state.showConfigMenu,
            showBlockTypes: false
        }) ;
        event.stopPropagation();
    },

    editContent: function() {
        this.clearState();
        this.props.disableLayout();
    },

    toggleDoubleScreen: function() {
        this.props.configurationChange({
            doubleScreen: !this.props.doubleScreen
        });
    },

/*<!-- <span className="glyphicon glyphicon-edit" data-disabled={this.props.doubleScreen} onClick={this.editContent}></span>-->*/

    render: function () {
        return (
            <div>
                <div className="leftMenu">
                    {this.props.layoutable?
                        <div>
                            <span className="glyphicon glyphicon-plus" data-disabled={this.props.doubleScreen} data-clicked={this.state.showBlockTypes} id="btn-add-block" onClick={this.showBlockTypes}></span>
                            <span className="glyphicon glyphicon-cog" data-clicked={this.state.showConfigMenu} onClick={this.showConfigMenu}></span>
                        </div>
                        :
                        <div>
                            <span className="glyphicon glyphicon-arrow-left" data-clicked="true" onClick={this.props.enableLayout}></span>
                        </div>
                    }

                    <div className="screenRatios"
                        style={{
                            marginTop: "160px",
                            display: this.props.layoutable?"inherit": "none"
                        }}>
                        <span className="glyphicon glyphicon-blackboard" data-clicked={this.props.doubleScreen} onClick={this.toggleDoubleScreen}></span>
                        <span className="glyphicon ratio" onClick={this.resolution.bind(this, "1024x768")} data-clicked={this.props.width===1024}>1024<br/>768</span>
                        <span className="glyphicon ratio" onClick={this.resolution.bind(this, "1280x800")} data-clicked={this.props.width===1280}>1280<br/>800</span>
                        <span className="glyphicon ratio" onClick={this.resolution.bind(this, "1920x1080")} data-clicked={this.props.width===1920}>1920<br/>1080</span>
                    </div>
                </div>
                <div className="hidder">
                </div>
                <BlockTypeMenu addBlock={this.props.addBlock} show={this.state.showBlockTypes} adddActivity={this.props.adddActivity} parentStateChange={this.stateChange}/>

                <PageConfigMenu configurationChange={this.props.configurationChange}
                                showConfigMenu={this.showConfigMenu}
                                showHeader={this.props.showHeader} showFooter={this.props.showFooter}
                                show={this.state.showConfigMenu} closeSetting={this.props.closeSetting}/>
            </div>
        );
    }
});

module.exports = LeftMenu;