var React = require('react');

var GridLayout = require("./GridLayout.jsx");

/**
 * 最终页面组件。 包括了Theme、footer、header等相关设置。及用于布局的Layout
 * @type {*|Function}
 */
var ThemedPage = React.createClass({

    themeConfig: null,

    getInitialState: function () {
      return {
          themeConfig: null
      }
    },

    getThemeConfig: function() {
        var remote = $.ajax({
            type: "GET",
            url: "templates/" + this.props.themeName +  "/config.json",
            async: false
        }).responseText;

        this.themeConfig = JSON .parse(remote);
        return this.themeConfig;
    },

    loadTheme: function() {
        var themeConfig = this.getThemeConfig();
        $.ajax({
            type: "GET",
            url: "templates/" + this.props.themeName + "/" + themeConfig.default.html,
            dataType : 'html',
            success: this.handleTemplateLoaded
        });
    },

    moreGrid: function() {
        this.refs["layout"].addBlock();
    },

    /**
     * 这个方法会在页面加载header和footer， 根据设置计算好他们所占的高度，
     * 然后根据剩余高度更新state， 重绘Layout和参考线
     * @param html
     */
    handleTemplateLoaded: function(html) {
        console.log("template loaded" + html);
        $(".styles").empty();
        $(".header").empty().append($(html).filter("header"));
        $(".footer").empty().append($(html).filter("footer"));
        $(html).filter("link").each(function() {
            $('<link>').attr('rel','stylesheet')
                .attr('type','text/css')
                .attr('href',"templates/default/" + $(this).attr("href"))
                .appendTo('.styles');
        });
        //this.themeReady();
        setTimeout(this.themeReady, 300);
    },

    themeReady: function( ) {
        this.setState({
            themeConfig: {
                headerHeight: $(".header").height(),
                footerHeight: $(".footer").height(),
                padding: this.themeConfig.default.padding
            }
        });
        /*
        this.setState({
            headerHeight: $(".header").height(),
            footerHeight: $(".footer").height(),
            padding: this.themeConfig.default.padding
        });
        */
    },

    componentDidMount: function () {
        this.loadTheme();
    },

    componentWillReceiveProps: function(nextProps) {
        if (nextProps.data.theme!=this.props.data.theme) {
            this.loadTheme();
        }
    },

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
        var swidth = this.props.pageSetting.width;
        if (this.props.pageSetting.doubleScreen) {
            swidth = swidth * 2;
        }

        var headerWidth = "100%";
        if (this.props.pageSetting.doubleScreen) {
            if (this.props.pageSetting.expandMode===3||this.props.pageSetting.expandMode===1) {
                headerWidth = "50%";
            }
        }

        var contentHeight = this.props.pageSetting.height;
        var contentWidth = this.props.pageSetting.width;

        var layout = <div ref="layout"/>;
        if (this.state.themeConfig) {
            console.log("render after theme load ", this.state.themeConfig);

            if (this.props.pageSetting.showHeader) {
                contentHeight -= this.state.themeConfig.headerHeight;
            }
            if (this.props.showFooter) {
                contentHeight -= this.state.themeConfig.footerHeight;
            }
            if(contentHeight=== this.props.pageSetting.height && this.themeConfig) {
                contentHeight -= this.themeConfig.default.padding[0];
                contentHeight -= this.themeConfig.default.padding[2];
            }
            layout = <GridLayout
                pageSetting={this.props.pageSetting}
                themeConfig={this.state.themeConfig}
                configurationChange={this.props.configurationChange}
                data={this.props.data}
                editBlock={this.editBlock}
                ref="layout"/>
        }
        /** WebkitTransform:'scale(' + this.props.zoom + ')'*/

        return (
            <div className="screen" onClick={this.onclick}>
                <div className="display" style={{
                        width:  swidth,
                        minHeight: this.props.pageSetting.height
                    }}>
                    <div className="styles"></div>
                    <div className="header" style={{
                        width: headerWidth,
                        display: this.props.pageSetting.showHeader?"inherit": "none"
                    }}></div>
                    {layout}
                    <div className="footer" style={{
                        width: headerWidth,
                        display: this.props.pageSetting.showFooter?"inherit": "none"
                    }}></div>
                </div>
            </div>
        );
    }
});


module.exports = ThemedPage;