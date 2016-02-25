require("./tool-workspace.scss");

var React = require('react');

var AxisLines = require("./AxisLines.jsx");
var ThemedPage = require("./ThemedPage.jsx");
var RightPanel = require("./panels/RightPanel.jsx");
var LeftMenu = require("./menus/LeftMenu.jsx");


/**
 * ����ҳ������� ������Theme��footer��header��������á�
 * ��������ָʾ�ɲ�������
 * @type {*|Function}
 */
var PageToolWorkspace = React.createClass({

    themeConfig: null,

    getInitialState: function () {
      return {
          headerHeight: 0,
          footerHeight: 0,
          showPanel: false,
          panel: 'edit-text',
          padding: [0,0,0,0]
      }
    },

    getThemeConfig: function() {
        var remote = $.ajax({
            type: "GET",
            url: "templates/" + this.props.theme +  "/config.json",
            async: false
        }).responseText;

        this.themeConfig = JSON .parse(remote);
        return this.themeConfig;
    },

    loadTheme: function() {
        var themeConfig = this.getThemeConfig();
        $.ajax({
            type: "GET",
            url: "templates/" + this.props.theme + "/" + themeConfig.default.html,
            dataType : 'html',
            success: this.handleTemplateLoaded
        });
    },

    moreGrid: function() {
        this.refs["layout"].addBlock();
    },

    /**
     * �����������ҳ�����header��footer�� �������ü����������ռ�ĸ߶ȣ�
     * Ȼ�����ʣ��߶ȸ���state�� �ػ�Layout�Ͳο���
     * @param html
     */
    handleTemplateLoaded: function(html) {
        $(".styles").empty();
        $(".header").empty().append($(html).filter("header"));
        $(".footer").empty().append($(html).filter("footer"));
        $(html).filter("link").each(function() {
            $('<link>').attr('rel','stylesheet')
                .attr('type','text/css')
                .attr('href',"templates/default/" + $(this).attr("href"))
                .appendTo('.styles');
        });
        setTimeout(this.updateSize, 300);
    },

    updateSize: function( ) {
        this.setState({
            headerHeight: $(".header").height(),
            footerHeight: $(".footer").height(),
            padding: this.themeConfig.default.padding
        });
    },

    componentDidMount: function () {
        this.loadTheme();
    },

    componentWillReceiveProps: function(nextProps) {
        if (nextProps.theme!=this.props.theme) {
            this.loadTheme();
        }
    },

    /**
     * When clicked on the empaty space , hide the leftmenu opened and the panel. the grid draggable and resizable
     * */
    onclick: function() {
        this.refs["layout"].returnGridster();
        this.setState({
            showPanel: false
        });
        this.refs["leftmenu"].clearState();
    },

    editBlock: function(blockType) {
        console.log("edit type " + blockType);
        this.setState({
            showPanel: true,
            panel: blockType
        });
    },

    /***
     * Delegated methods
     */
    addBlock: function(template, sizex, sizey) {
        this.refs["layout"].addBlock(template, sizex, sizey);
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
        var swidth = this.props.width;
        if (this.props.doubleScreen) {
            swidth = swidth * 2;
        }

        var headerWidth = "100%";
        if (this.props.doubleScreen) {
            if (this.props.expandMode===3||this.props.expandMode===1) {
                headerWidth = "50%";
            }
        }

        var contentHeight = this.props.height;
        var contentWidth = this.props.width;
        if (this.props.showHeader) {
            contentHeight -= this.state.headerHeight;
        }
        if (this.props.showFooter) {
            contentHeight -= this.state.footerHeight;
        }
        if(contentHeight===this.props.height && this.themeConfig) {
            contentHeight -= this.themeConfig.default.padding[0];
            contentHeight -= this.themeConfig.default.padding[2];
        }
        /** WebkitTransform:'scale(' + this.props.zoom + ')'*/

        return (
            <div className="tool-workspace" onClick={this.onclick}>
                <LeftMenu configurationChange={this.props.configurationChange}
                          doubleScreen={this.props.doubleScreen}
                          addBlock={this.addBlock}
                          adddActivity={this.adddActivity}
                          layoutable="true" disableLayout={this.disableLayout}
                          enableLayout={this.enableLayout} ref="leftmenu" closeSetting={this.closeSetting}
                          showHeader={this.props.showHeader} showFooter={this.props.showFooter}
                          width={this.props.width}/>
                <ThemedPage data={this.props.data}/>

                <RightPanel display={this.state.showPanel} panel={this.state.panel}/>

                <AxisLines width={this.props.width} height={this.props.height}
                           showHeader={this.props.showHeader} showFooter={this.props.showFooter}
                           doubleScreen={this.props.doubleScreen} expandMode={this.props.expandMode}
                           headerHeight={this.state.headerHeight} footerHeight={this.state.footerHeight}
                           padding={this.state.padding}/>
            </div>
        );
    }
});


module.exports = PageToolWorkspace;