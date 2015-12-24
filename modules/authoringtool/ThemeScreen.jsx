var React = require('react');

var AxisLines = require("./AxisLines.jsx");
var GridLayout = require("./GridLayout.jsx");

/**
 * 最终页面组件。 包括了Theme、footer、header等相关设置。
 * 包括虚线指示可布局区域。
 * @type {*|Function}
 */
var ThemeScreen = React.createClass({

    themeConfig: null,

    getInitialState: function () {
      return {
          headerHeight: 0,
          footerHeight: 0,
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
     * 这个方法会在页面加载header和footer， 根据设置计算好他们所占的高度，
     * 然后根据剩余高度更新state， 重绘Layout和参考线
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
            <div className="screen" >
                <div className="display" style={{
                        width:  swidth,
                        minHeight: this.props.height
                    }}>
                    <div className="styles"></div>
                    <div className="header" style={{
                        width: headerWidth,
                        display: this.props.showHeader?"inherit": "none"
                    }}></div>

                    <GridLayout width={this.props.width} height={this.props.height}
                                showHeader={this.props.showHeader} showFooter={this.props.showFooter}
                                doubleScreen={this.props.doubleScreen} expandMode={this.props.expandMode}
                                headerHeight={this.state.headerHeight} footerHeight={this.state.footerHeight}
                                padding={this.state.padding}
                                configurationChange={this.props.configurationChange}
                                ref="layout"/>
                    <div className="footer" style={{
                        width: headerWidth,
                        display: this.props.showFooter?"inherit": "none"
                    }}></div>
                </div>
                <AxisLines width={this.props.width} height={this.props.height}
                           showHeader={this.props.showHeader} showFooter={this.props.showFooter}
                           doubleScreen={this.props.doubleScreen} expandMode={this.props.expandMode}
                           headerHeight={this.state.headerHeight} footerHeight={this.state.footerHeight}
                           padding={this.state.padding}/>
            </div>
        );
    }
});


module.exports = ThemeScreen;