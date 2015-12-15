
require("./editbar.css");

var React = require('react');
var $ = require("jquery");

var EditBar = React.createClass({
    initialOptions : {
        _dot : ".",
        _id: "#",
        panelId: "j-edit-panel",
        barId : "j-edit-bar",
        txtPanle: "j-panel-text",
        imgPanel: "j-panel-img",
        panelText: "edit-panel-text",
        gridBlockClass: "j-grid-block",
        hideClass: "hide",
        dataPanelIndex: "data-panel-index",
        dataBarIndex: "data-bar-index",
        placeHolder : "Type your text here...",
        myGridContainer: "j-grid-container",
        modifiersOpts : ['bold', 'italic', 'underline', 'h1', 'h2', 'ol', 'ul']


    },
    showPanelFn : function (event) {
        var _dateBarIndex = $(this.initialOptions._id + this.initialOptions.barId).attr(this.initialOptions.dataBarIndex),
            $li = $(this.initialOptions._dot + this.initialOptions.gridBlockClass).eq(_dateBarIndex);
        var $myDiv = $li.find(this.initialOptions._dot + this.initialOptions.myGridContainer);
        if ($myDiv.length< 1) {
            var $div = $("<div>", {
                class :this.initialOptions.myGridContainer
            });
            $li.append($div);
        }
        var $offset = $li.offset(),
            _top = $offset.top,
            _left = $offset.left +  100;
        var $panel = $(this.initialOptions._id + this.initialOptions.panelId);
        $panel.find(this.initialOptions._dot + this.initialOptions.txtPanle).addClass(this.initialOptions.hideClass);
        $panel.find(this.initialOptions._dot + this.initialOptions.imgPanel).addClass(this.initialOptions.hideClass);
        $panel.hide("fast");
        $panel.css({"top":_top -23,"left":_left}).attr(this.initialOptions.dataPanelIndex, _dateBarIndex).fadeIn();

        return {
            _panel : $panel,
            _li : $li
        }

    },
    txtEditOpenFn: function ($panel, $li) {
        var arr= this.showPanelFn();

        arr._panel.find(this.initialOptions._dot + this.initialOptions.txtPanle).removeClass(this.initialOptions.hideClass);

        $(this.initialOptions._dot + this.initialOptions.panelText).empty().notebook({
            autoFocus: true,
            placeholder: this.initialOptions.placeHolder,
            modifiers: this.initialOptions.modifiersOpts
        });

        var $textContainer = arr._li.find(this.initialOptions._dot + this.initialOptions.myGridContainer),
            $exitTextChild = $textContainer.children(),
            _textHtml =$textContainer.html(),
            $panelEditor =  $(this.initialOptions._dot + this.initialOptions.panelText);
        if ($exitTextChild.length >0 ) {
            $panelEditor.empty().append(_textHtml);
        }
    },
    imgEditOpenFn : function ($panel, $li) {
        var arr= this.showPanelFn();
        arr._panel.find(this.initialOptions._dot + this.initialOptions.imgPanel).removeClass(this.initialOptions.hideClass);
    },
    render: function() {
        return (
            <div id="j-edit-bar" className="edit-bar hide">
                <div className="model-0">
                    <div className="float-btn-group">
                        <button className="btn-float btn-triger pink"><i className="icon-bars"></i></button>
                        <div className="btn-list">
                            <a href="javascript:void(0);" className="btn-float blue" onClick={this.txtEditOpenFn}><i className="fa fa-pencil"></i></a>
                            <a href="javascript:void(0);" className="btn-float blue" onClick={this.imgEditOpenFn}><i className="fa fa-file-image-o"> </i></a>
                            <a href="javascript:void(0);" className="btn-float blue" data-edit="act"><i className="fa fa-cloud-upload">   </i></a>
                            <a href="javascript:void(0);" className="btn-float blue" data-edit="del"><i className="fa fa-trash-o fa-fw"> </i></a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});
module.exports = EditBar;

