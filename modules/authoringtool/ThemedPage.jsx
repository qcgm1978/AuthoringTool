var React = require('react');
var GridLayout = require("./GridLayout.jsx");
var Gridster = require("./Gridster.jsx");
var postal = require("postal");
var AuthoringInfo = require("./AuthoringInfo");
var _ = require("underscore");
/**
 * ����ҳ������� ������Theme��footer��header��������á������ڲ��ֵ�Layout
 * props:
 * data : project info
 * themeName: theme for display
 * pageSetting : the screen and layout settings
 * state:
 * themeConfig : ajax loaded by themeName
 * @type {*|Function}
 */
var ThemedPage = React.createClass({
    BLOCK_ID_PREFIX: "block_",
    themeConfig: null,
    lastProps: null,
    getInitialState: function () {
        return {
            themeConfig: null
        }
    },
    getThemeConfig: function () {
        var dfd = jQuery.Deferred(),that=this;
        $.ajax({
            type: "GET",
            url: "templates/" + this.props.themeName + "/config.json",
            //async: false
            success: (responseText)=> {
                var remote = responseText
                that.themeConfig = remote;
                dfd.resolve(that.themeConfig);
            }
        });
        return dfd;
    },
    //create a new ajax request
    loadTheme: function () {
        this.getThemeConfig().then(
            (data)=> {
                var themeConfig=data;
                $.ajax({
                    type: "GET",
                    url: "templates/" + this.props.themeName + "/" + themeConfig.default.html,
                    dataType: 'html',
                    success: this.handleTemplateLoaded
                });
            }
        )
    },
    moreGrid: function () {
        this.refs["layout"].addBlock();
    },
    /**
     * �����������ҳ�����header��footer�� ������ü����������ռ�ĸ߶ȣ�
     * Ȼ����ʣ��߶ȸ���state�� �ػ�Layout�Ͳο���
     * @param html
     */
    handleTemplateLoaded: function (html) {
        $(".styles").empty();
        $(".header").empty().append($(html).filter("header"));
        $(".footer").empty().append($(html).filter("footer"));
        $(html).filter("link").each(function () {
            $('<link>').attr('rel', 'stylesheet')
                .attr('type', 'text/css')
                .attr('href', "templates/default/" + $(this).attr("href"))
                .appendTo('.styles');
        });
        setTimeout(this.themeReady, 300);
    },
    themeReady: function () {
        this.setState({
            themeConfig: {
                headerHeight: $(".header").height(),
                footerHeight: $(".footer").height(),
                padding: this.themeConfig.default.padding
            }
        });
        var page = this;
        postal.subscribe({
            channel: "block",
            topic: "add",
            callback: function (data, envelope) {
                if (page.refs["main-grid"]) {
                    var blockId = _.uniqueId(page.BLOCK_ID_PREFIX);
                    AuthoringInfo.data.widgetJSON[blockId] = data.json;
                    page.refs["main-grid"].addBlock(data.type, data.html, data.size_x, data.size_y, data.pos_x, data.pos_y, blockId);
                }
            }
        });
    },
    componentDidMount: function () {
        this.loadTheme();
        this.lastProps = this.props;
    },
    savePageData: function () {
        if (this.props.doubleScreen) {
            if (this.refs["extra-grid"]) {
                AuthoringInfo.data.doubleScreenRightWidgets = this.refs["extra-grid"].getGridData();
            }
            AuthoringInfo.data.doubleScreenLeftWidgets = this.refs["main-grid"].getGridData();
        } else {
            //extrat and save content
            $("#main-grid ul>li").each(function () {
                //use interface factory mode to identify each type of content
                var type = $(this).data("type");
                $(this).remove("span.gs-resize-handle");
                if (type === "text") {
                    $(this).find(".rtf").removeClass("mce-content-body").removeAttr("id").removeAttr("contenteditable").removeAttr("contenteditable").removeAttr("spellcheck").removeAttr("style")
                    AuthoringInfo.data.widgetContents[$(this).data("id")] = $(this).html();
                }
                if (type === "single-choice") {
                    AuthoringInfo.data.widgetContents[$(this).data("id")] = $(this).html();
                }
            });
            AuthoringInfo.data.singleScreenWidgets = this.refs["main-grid"].getGridData();
            if (AuthoringInfo.data.doubleScreenLeftWidgets.length === 0) {
                AuthoringInfo.data.doubleScreenLeftWidgets = AuthoringInfo.data.singleScreenWidgets;
            }
        }
    },
    shouldComponentUpdate: function (nextProps, nextState) {
        if (this.state.themeConfig === null) return true;
        if (nextProps.themeName != this.props.themeName) {
            this.loadTheme();
            return true;
        }
        console.log("********************************Page Update******************************");
        //if (this.props.doubleScreen != nextProps.doubleScreen) {
        /*Switching double screen*/
        this.savePageData();
        //}
        this.lastProps = nextProps;
        return true;
    },
    getPortraitCutLayout: function () {
        console.log("===================portrait cut mode================================");
        $(".footer").css("position", "absolute").css("bottom", 0).css("right", 0).css("width", this.props.pageSetting.width);
        $(".header").css("position", "absolute").css("top", 0).css("left", 0).css("width", this.props.pageSetting.width);
        var contentWidth = this.props.pageSetting.width
            - parseInt(this.state.themeConfig.padding[1])
            - parseInt(this.state.themeConfig.padding[3]);
        var mainHeight = this.props.pageSetting.height
            - parseInt(this.state.themeConfig.padding[0])
            - parseInt(this.state.themeConfig.padding[2])
            - (this.props.pageSetting.showHeader ? $(".header").height() : 0);
        var extraHeight = this.props.pageSetting.height
            - parseInt(this.state.themeConfig.padding[0])
            - parseInt(this.state.themeConfig.padding[2]);
        if (this.props.pageSetting.showFooter) {
            extraHeight -= $(".footer").height();
        }
        var mainStyle = {
            position: "absolute",
            left: this.state.themeConfig.padding[3],
            top: $(".header").height() + parseInt(this.state.themeConfig.padding[0]),
            width: contentWidth,
            minHeight: mainHeight
        };
        var mainGrid = <Gridster ref="main-grid" id="main-grid" data={AuthoringInfo.data.doubleScreenLeftWidgets}
                                 style={mainStyle}/>;
        var extraStyle = {
            position: "absolute",
            right: this.state.themeConfig.padding[1],
            bottom: $(".footer").height() + parseInt(this.state.themeConfig.padding[2]),
            width: contentWidth,
            minHeight: extraHeight
        };
        var extraGrid = <Gridster ref="extra-grid" id="extra-grid" data={AuthoringInfo.data.doubleScreenRightWidgets}
                                  style={extraStyle}/>;
        return <div>
            {mainGrid}
            {extraGrid}
        </div>;
    },
    getSingleLayout: function (width) {
        $(".header").css("position", "inherit").css("width", width);
        $(".footer").css("position", "inherit").css("width", width);
        var minHeight = this.props.pageSetting.height - parseInt(this.state.themeConfig.padding[0])
            - parseInt(this.state.themeConfig.padding[2])
            - (this.props.pageSetting.showHeader ? $(".header").height() : 0)
            - (this.props.pageSetting.showFooter ? $(".footer").height() : 0);
        var mainStyle = {
            width: width - parseInt(this.state.themeConfig.padding[0])
            - parseInt(this.state.themeConfig.padding[2]),
            minHeight: minHeight,
            marginLeft: this.state.themeConfig.padding[3],
            marginTop: this.state.themeConfig.padding[0],
            marginBottom: this.state.themeConfig.padding[2],
        };
        return (
            <Gridster ref="main-grid" id="main-grid" data={AuthoringInfo.data.singleScreenWidgets} style={mainStyle}/>);
    },
    getExtraLayout: function () {
        var extraStyle = {
            position: "absolute",
            right: 0,
            bottom: 0,
            top: 0,
            width: this.props.pageSetting.width
        };
        var main = this.getSingleLayout(this.props.pageSetting.width);
        return <div>
            {main}
            <Gridster ref="extra-grid" id="extra-grid" style={extraStyle}/>
        </div>;
    },
    getExpandLayout: function () {
        return this.getSingleLayout(this.props.pageSetting.width * 2);
    },
    render: function () {
        var layout = <div ref="layout"/>;
        if (this.state.themeConfig) {
            /*When theme config loaded�� reset the layout frame*/
            if (this.props.pageSetting.doubleScreen) {
                if (this.props.pageSetting.expandMode === 1) {  //portrait cut model
                    layout = this.getPortraitCutLayout();
                }
                if (this.props.pageSetting.expandMode === 2) {  //expand mode
                    layout = this.getExpandLayout();
                }
                if (this.props.pageSetting.expandMode === 3) {  //extra mode
                    layout = this.getExtraLayout();
                }
            } else {
                layout = this.getSingleLayout(this.props.pageSetting.width);
            }
        }
        return (
            <div className="screen" style={{
                position: "relative",
                width: this.props.pageSetting.doubleScreen?(this.props.pageSetting.width*2):this.props.pageSetting.width,
                minHeight: this.props.pageSetting.height
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


