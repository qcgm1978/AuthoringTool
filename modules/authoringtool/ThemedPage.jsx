var React = require('react');

var GridLayout = require("./GridLayout.jsx");

/**
 * ����ҳ������� ������Theme��footer��header��������á������ڲ��ֵ�Layout
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

    //create a new ajax request
    loadTheme: function() {
        var themeConfig = this.getThemeConfig();  //synchronize loading
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
    },

    componentDidMount: function () {
        this.loadTheme();
    },

    componentWillReceiveProps: function(nextProps) {
        if (nextProps.data.themeName!=this.props.data.themeName) {
            this.loadTheme();
        }
    },

    render: function () {
        var layout = <div ref="layout"/>;
        if (this.state.themeConfig) {
            /*When theme config loaded�� reset the layout frame*/
            console.log("render after theme load ", this.state.themeConfig);
            layout = <GridLayout height={this.props.pageSetting.height} width={this.props.pageSetting.width}
                padding={this.state.themeConfig.padding}
                double={this.props.pageSetting.doubleScreen}
                expandMode={this.props.pageSetting.expandMode}
                data={this.props.data}
                ref="layout"/>
        }
        /** WebkitTransform:'scale(' + this.props.zoom + ')'*/

        var headerWidth = this.props.pageSetting.width;
        if (this.props.pageSetting.doubleScreen ) {
            if (this.props.pageSetting.expandMode===2) {
                headerWidth *=2;
            }
            if (this.props.pageSetting.expandMode===3) {

            }
        }

        return (
            <div className="screen">
                <div className="display" >
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