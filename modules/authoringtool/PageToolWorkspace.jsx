
var React = require('react');

var AxisLines = require("./AxisLines.jsx");
var ThemedPage = require("./ThemedPage.jsx");
var RightPanel = require("./panels/RightPanel.jsx");
var LeftMenu = require("./menus/LeftMenu.jsx");

var postal = require("postal");

/**
 * 页面设计工作区。 包括了Theme、footer、header等相关设置。
 * 包括虚线指示可布局区域。
 * @type {*|Function}
 */
var PageToolWorkspace = React.createClass({

    getInitialState: function () {
        return {
            themeName: "default",
            pageSetting: {   /**the grid layout setting  it will effect the axisline so defined here*/
                width: 1024,
                height:768,
                doubleScreen: false,
                expandMode: 1,
                showHeader: true,
                showFooter: true
            }
        }
    },

    moreGrid: function() {
        this.refs["layout"].addBlock();
    },

    componentDidMount: function () {

    },

    /**
     * When clicked on the empaty space , hide the leftmenu opened and the panel. the grid draggable and resizable
     * */
    onclick: function() {
        postal.publish({
            channel: "workspace",
            topic: "empty.clicked"
        });
    },

    editBlock: function(blockType) {
        console.log("edit type " + blockType);
        this.setState({
            showPanel: true,
            panel: blockType
        });
    },

    pageSettingChanged: function(settings) {
        this.setState({
            pageSetting: _.extend(this.state.pageSetting,settings)
        });
    },

    /***
     * Delegated methods
     */
    addBlock: function(template, sizex, sizey) {
        this.refs.page.refs["layout"].addBlock(template, sizex, sizey);
    },

    adddActivity: function(type) {
        this.refs["layout"].adddActivity(type);
    },

    disableLayout: function() {
        this.refs['layout'].disableLayout()
    },
    enableLayout: function() {
        this.refs['layout'].enableLayout()
    },
    closeSetting: function() {
        this.refs['layout'].closeSetting()
    },

    render: function () {
        return (
            <div className="tool-workspace" onClick={this.onclick}>
                <LeftMenu ref="leftmenu" configurationChangedCallback={this.pageSettingChanged} pageSetting={this.state.pageSetting}/>

                <ThemedPage ref="page" data={this.props.data} themeName={this.state.themeName} pageSetting={this.state.pageSetting}/>

                <RightPanel display={this.state.showPanel} panel={this.state.panel}/>

                <AxisLines width={this.state.pageSetting.width} height={this.state.pageSetting.height}
                           doubleScreen={this.state.pageSetting.doubleScreen} expandMode={this.state.pageSetting.expandMode}/>
            </div>
        );
    }
});


module.exports = PageToolWorkspace;