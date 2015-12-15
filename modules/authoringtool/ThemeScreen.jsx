var React = require('react');
var $ = require("jquery");

var GridLines = require("./GridLines.jsx");
var GridLayout = require("./GridLayout.jsx");

/**
 * ����ҳ������� ������Theme��footer��header��������á�
 * ��������ָʾ�ɲ�������
 * @type {*|Function}
 */
var ThemeScreen = React.createClass({

    getInitialState: function () {
      return {
          width: this.props.width,
          minHeight: this.props.minHeight,
          doubleScreen: this.props.doubleScreen
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
        var props = this.props;
        $(".styles").empty();
        $(".header").empty().append($(html).filter("header"));
        $(".footer").empty().append($(html).filter("footer"));
        $(html).filter("link").each(function() {
            $(".styles").append('<link rel="stylesheet" href="templates/default/'
                + $(this).attr("href") + '">');
        });

        var contentHeight = props.minHeight;
        if (props.showHeader) {
            contentHeight -= $(".header").height();
        }
        if (props.showFooter) {
            contentHeight -= $(".footer").height();
        }
        if(contentHeight===props.minHeight) {
            contentHeight -= themeConfig.default.padding[0];
            contentHeight -= themeConfig.default.padding[2];
        }
        console.log(contentHeight);
        this.setState({
            minHeight: contentHeight
        });
    },

    componentDidMount: function () {
        this.loadTheme();
    },

    render: function () {
        var swidth = this.props.width;

        if (this.props.doubleScreen) {
            swidth = swidth * 2;
        }
        /** WebkitTransform:'scale(' + this.props.zoom + ')'*/
        return (
            <div className="screen" style={{
                            width:  swidth,
                            minHeight: this.props.minHeight
                        }}>
                <div className="styles"></div>
                <div className="header"></div>

                <GridLayout width={this.state.width} minHeight={this.state.minHeight} doubleScreen={this.state.doubleScreen}/>
                <GridLines width={this.state.width} minHeight={this.state.minHeight} doubleScreen={this.state.doubleScreen}/>
                <div className="footer"></div>
            </div>
        );
    }
});


module.exports = ThemeScreen;