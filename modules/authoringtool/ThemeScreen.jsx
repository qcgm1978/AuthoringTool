var React = require('react');
var $ = require("jquery");

var AxisLines = require("./AxisLines.jsx");
var GridLayout = require("./GridLayout.jsx");

/**
 * ����ҳ������� ������Theme��footer��header��������á�
 * ��������ָʾ�ɲ�������
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

    render: function () {
        var swidth = this.props.width;
        if (this.props.doubleScreen) {
            swidth = swidth * 2;
        }

        var contentHeight = this.props.height;
        var headerHeight = 0 ;
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
        var contentWidth =  this.props.width;

        /** WebkitTransform:'scale(' + this.props.zoom + ')'*/
        return (
            <div className="screen" style={{
                            width:  swidth,
                            minHeight: this.props.minHeight
                        }}>
                <div className="styles"></div>
                <div className="header"></div>

                <GridLayout width={this.props.width} height={this.props.height} contentHeight={contentHeight}
                            contentWidth={contentWidth}
                            doubleScreen={this.props.doubleScreen}/>
                <AxisLines width={this.props.width} height={this.props.height} headerHeight={this.state.headerHeight}
                           contentWidth={contentWidth}
                           doubleScreen={this.props.doubleScreen}/>
                <div className="footer"></div>
            </div>
        );
    }
});


module.exports = ThemeScreen;