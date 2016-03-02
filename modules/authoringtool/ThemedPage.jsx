var React = require('react');

var GridLayout = require("./GridLayout.jsx");
var Gridster = require("./Gridster.jsx");
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

    getPortraitCutLayout: function() {
        $(".footer").css("position", "absolute").css("bottom", 0).css("right", 0).css("width", this.props.pageSetting.width);
        $(".header").css("position", "absolute").css("top", 0).css("left", 0).css("width", this.props.pageSetting.width);

        var contentWidth = this.props.pageSetting.width
            - parseInt(this.props.themeConfig.padding[1])
            - parseInt(this.props.padding[3]);
        var mainHeight = this.props.pageSetting.height
            - parseInt(this.props.themeConfig.padding[0])
            - parseInt(this.props.themeConfig.padding[2]) - $(".header").height();
        var extraHeight =  this.props.pageSetting.height
            - parseInt(this.props.themeConfig.padding[0])
            - parseInt(this.props.themeConfig.padding[2]);

        if (this.props.pageSetting.showFooter) {
            extraHeight -= $(".footer").height();
        }
        var mainStyle = {
            position: "absolute",
            left: this.props.themeConfig.padding[3],
            top: $(".header").height() + this.props.themeConfig.padding[0],
            width: contentWidth,
            height: mainHeight
        };
        var mainGrid = <Gridster ref="main-grid" id="main-grid" styles={mainStyle}/>;
        var extraStyle = {
            position: "absolute",
            right: this.props.themeConfig.padding[1],
            bottom: $(".footer").height() + this.props.themeConfig.padding[2],
            width: contentWidth,
            height: extraHeight
        }
        var extraGrid =  <Gridster ref="extra-grid" id="extra-grid" styles={extraStyle}/>;
        return (<div>
            {mainGrid}
            {extraGrid}
        </div>);
    },

    getSingleLayout: function(width) {
        $(".header").css("width", "100%");
        $(".footer").css("width", "100%");
        var minHeight = this.props.pageSetting.height - parseInt(this.state.themeConfig.padding[0])
            - parseInt(this.state.themeConfig.padding[2]) - $(".header").height() - $(".footer").height();

        var mainStyle = {
            width: width- parseInt(this.state.themeConfig.padding[0])
            - parseInt(this.state.themeConfig.padding[2]),
            minHeight: minHeight,
            marginLeft: this.state.themeConfig.padding[3],
            marginTop: this.state.themeConfig.padding[0],
            marginBottom: this.state.themeConfig.padding[2],
        };

        return (<Gridster ref="main-grid" id="main-grid" style={mainStyle}/>);
    },

    render: function () {
        var layout = <div ref="layout"/>;
        if (this.state.themeConfig) {
            /*When theme config loaded， reset the layout frame*/
            console.log("render after theme load ", this.state.themeConfig, this.props.pageSetting);
            if (this.props.pageSetting.doubleScreen) {
                if (this.props.expandMode===1) {  //portrait cut model
                    layout = this.getPortraitCutLayout();
                }
                if (this.props.expandMode===2) {  //expand mode

                }
                if (this.props.expandMode===3) {  //extra mode

                }
            } else {
                layout = this.getSingleLayout(this.props.pageSetting.width);
            }
        }

        return (
            <div className="screen" style={{
                position: "relative",
                width: this.props.pageSetting.doubleScreen?(this.props.pageSetting.width*2):this.props.pageSetting.width,
                height: this.props.pageSetting.height
            }}>
                <div className="styles"></div>
                <div className="header" style={{
                    display: this.props.pageSetting.showHeader?"inherit": "none"
                }}></div>
                {layout}
                <div className="footer" style={{
                    display: this.props.pageSetting.showFooter?"inherit": "none"
                }}></div>
            </div>
        );
    }
});

module.exports = ThemedPage;