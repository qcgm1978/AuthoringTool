var React = require('react');
var postal = require("postal");
var BlockTypeMenu = require("./BlockTypeMenu.jsx");
var PageConfigMenu = require("./PageConfigMenu.jsx");
/**
 * props:
 * configurationChangedCallback : transfer page config information to parent
 * pageSetting : page settings.
 *
 *
 * state:
 * doubleScreen: display as doublescreen
 * ratio: current selected ratio
 * showBlockType: show add btn
 * showConfigMenu: show config menu
 *
 */
var LeftMenu = React.createClass({
    getInitialState: function () {
        return {
            doubleScreen: this.props.pageSetting.doubleScreen,
            ratio: "1024x768",
            showBlockTypes: false,
            showConfigMenu: false,
            showMinusBtn: false
        }
    },
    componentDidMount: function () {
        var menu = this;
        postal.subscribe({
            channel: "workspace",
            topic: "reset",
            callback: function (data, envelope) {
                menu.setState({
                    showBlockTypes: false,
                    showConfigMenu: false
                });
            }
        });
    },
    resolution: function (value) {
        this.setState({
            ratio: value
        });
        if (value === "1920x1080") {
            this.props.configurationChangedCallback({width: 1920, height: 1080});
        } else if (value === "1280x800") {
            this.props.configurationChangedCallback({width: 1280, height: 800});
        } else if (value === "1024x768") {
            this.props.configurationChangedCallback({width: 1024, height: 768});
        }
    },
    componentWillReceiveProps: function (nextProps) {
    },
    close: function () {
        this.setState({
            showBlockTypes: false,
            showConfigMenu: false
        });
    },
    showBlockTypes: function (event) {
        if (!this.state.doubleScreen) {
            this.setState({
                showBlockTypes: !this.state.showBlockTypes,
                showConfigMenu: false
            });
        } else {
        }
    },
    removeBlockType: function () {
        this.setState({
            showMinusBtn: !this.state.showMinusBtn
        })
        postal.publish({
            channel: "block",
            topic: "remove",
            data: {
                //type: "text",
                //html: template,
                //size_x: size_x,
                //size_y: size_y
            }
        });
        postal.publish({
            channel: "workspace",
            topic: "reset"
        });
    },
    showConfigMenu: function (event) {
        this.setState({
            showConfigMenu: !this.state.showConfigMenu,
            showBlockTypes: false
        });
    },
    toggleDoubleScreen: function () {
        //if(!this.state.doubleScreen){
        //    alert('Please save the current effect')
        //    return;
        //}
        var screen = !this.state.doubleScreen;
        this.setState({
            doubleScreen: screen
        });
        this.props.configurationChangedCallback({
            doubleScreen: screen
        });
    },
    stopPropagation: function (event) {
        event.stopPropagation();
    },
    /*<!-- <span className="glyphicon glyphicon-edit" data-disabled={this.props.doubleScreen} onClick={this.editContent}></span>-->*/

    render: function () {
        return (
            <div onClick={this.stopPropagation}>
                <div className="leftMenu">
                    <span className="glyphicon glyphicon-plus" data-clicked={this.state.showBlockTypes}
                          data-disabled={this.state.doubleScreen} id="btn-add-block"
                          onClick={this.showBlockTypes}></span>
                    <span className="glyphicon glyphicon-minus"
                          data-disabled={this.state.doubleScreen || $('#main-grid ul li.current').length==0}
                          id="btn-remove-block"
                          onClick={this.removeBlockType}></span>
                    <span className="glyphicon glyphicon-cog" data-clicked={this.state.showConfigMenu}
                          onClick={this.showConfigMenu}></span>

                    <div className="screenRatios"
                         style={{
                            marginTop: "160px"
                        }}>
                        <span className="glyphicon glyphicon-blackboard" data-clicked={this.state.doubleScreen}
                              onClick={this.toggleDoubleScreen}></span>
                        <span className="glyphicon ratio" onClick={this.resolution.bind(this, "1024x768")}
                              data-clicked={this.state.ratio==="1024x768"}>1024<br/>768</span>
                        <span className="glyphicon ratio" onClick={this.resolution.bind(this, "1280x800")}
                              data-clicked={this.state.ratio==="1280x800"}>1280<br/>800</span>
                        <span className="glyphicon ratio" onClick={this.resolution.bind(this, "1920x1080")}
                              data-clicked={this.state.ratio==="1920x1080"}>1920<br/>1080</span>
                    </div>
                </div>
                <div className="hidder">
                </div>
                <BlockTypeMenu show={this.state.showBlockTypes}/>
                <PageConfigMenu show={this.state.showConfigMenu} pageSetting={this.props.pageSetting}
                                configurationChangedCallback={this.props.configurationChangedCallback}/>
            </div>
        );
    }
});
module.exports = LeftMenu;