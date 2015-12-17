
require("./panel.css");
var React = require('react');
var $ = require("jquery");
require("../rtfeditor/mytexteditor");

var EditPanel = React.createClass({
    initialOptions : {
        _dot : ".",
        _id: "#",
        panelId: "j-edit-panel",
        barId : "j-edit-bar",
        txtPanel: "j-panel-text",
        imgPanel: "j-panel-img",
        gridClass : "j-gridster",
        panelText: "edit-panel-text",
        gridBlockClass: "j-grid-block",
        hideClass: "hide",
        dataPanelIndex: "data-panel-index",
        myGridContainer: "j-grid-container"

    },
    statics: {
        init: function() {
            $(".j-grid-block").on("mouseover", function () {
                var $offset = $(this).offset(),
                    _top = $offset.top,
                    _W = $(this).innerWidth(),
                    _left = $offset.left + _W -260;
                $("#j-edit-bar").css({"top":_top +5,"left":_left }).fadeIn().attr("data-bar-index",$(this).index());
            });

            $(".panel-drag").dragDiv("#j-edit-panel");

            $('.btn-triger').click(function () {
                $(this).closest('.float-btn-group').toggleClass('open');
            });
        }
    },
    txtPanelFn: function () {
        var $textElem = $(this.initialOptions._dot + this.initialOptions.panelText),
            $createdHtml= $textElem.html(),
            $blank = $textElem.find(".placeholder");
        var _indx =  $(this.initialOptions._id + this.initialOptions.panelId).attr(this.initialOptions.dataPanelIndex);
        var $gridLi = $(this.initialOptions._dot + this.initialOptions.gridBlockClass).eq(_indx),
            $tempLi = $gridLi.find(this.initialOptions._dot + this.initialOptions.myGridContainer);

        if ($blank.length < 1) {
            $tempLi.html($createdHtml);
        }else {
            $tempLi.empty();
        }
        $(this.initialOptions._dot + this.initialOptions.txtPanel).addClass(this.initialOptions.hideClass);
    },
    imgPanelFn:function(){
        $(this.initialOptions._dot + this.initialOptions.imgPanel).addClass(this.initialOptions.hideClass);
    },
    closePanelHandler: function () {
        var $panel =$(this.initialOptions._id + this.initialOptions.panelId);
        this.txtPanelFn();
        this.imgPanelFn();
        $panel.fadeOut();
    },
    render: function () {
        var _nameEditor = {
            txt: "Text Settings",
            img: "Image Settings"
        };
        var _panelId = this.initialOptions.panelId;
        return (

            <div  id={_panelId} className="edit-panel panel-drag">
                <div className="j-panel-text hide">
                    <div className="edit-panel-title panel-drag">
                        <span className="bold">{_nameEditor.txt}</span>
                            <span  className="edit-panel-close" onClick={this.closePanelHandler}>
                            <i className="fa fa-times-circle"> </i>
                        </span>
                    </div>
                    <div className="edit-panel-text"></div>
                </div>
                <div className="j-panel-img panel-img-pop panel-drag hide">
                    <div className="pop_title">{_nameEditor.img} <a href="javascript:void(0);" onClick={this.closePanelHandler} >x</a></div>
                    <div className="pop_main">
                        <div className="main_editbg"></div>
                        <p><a href="javascript:;">Change</a></p>
                        <p><a href="javascript:;">Edit</a></p>
                    </div>
                    <div className="pop_content">
                        <p>How's this image resized?</p>
                        <div className="content_list"><a href="javascript:;"><img src="images/01.png" width="29" height="20" /></a><span>Autocenter</span></div>
                        <div className="content_list"><a href="javascript:;"><img src="images/02.png" width="29" height="30" /></a><span>center</span></div>
                        <div className="content_list"><a href="javascript:;"><img src="images/03.png" width="29" height="30" /></a><span>Stretch</span></div>
                        <div className="content_list"><a href="javascript:;"><img src="images/04.png" width="29" height="20" /></a><span>Fit</span></div>
                    </div>
                    <div className="pop_footer">Image Text</div>
                </div>
            </div>
        ) }

});

module.exports = EditPanel;

