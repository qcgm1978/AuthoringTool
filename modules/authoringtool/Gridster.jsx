var React = require('react');
var _ = require("underscore");
var postal = require("postal");
var AuthoringInfo = require("./AuthoringInfo");
//var GridLayout = require("./GridLayout.jsx");
/***
 * Properties :
 * id : grid id
 * styles: about position and sizing informations
 */
var Gridster = React.createClass({
    BLOCK_ID_PREFIX: "block_",
    getInitialState: function () {
        return {};
    },
    /**
     * Default gridster options
     * */
    defaultGridOptions: {
        widget_margins: [1, 1],
        min_cols: 12,
        min_rows: 10,
        serialize_params: function ($w, wgd) {
            var cli = $w.clone();
            cli.find(".gs-resize-handle").remove();
            //cli.find(".mce-content-body").removeAttr("id").removeAttr("contenteditable")
            //    .removeAttr("spellcheck").removeAttr("style").removeClass("mce-content-body");
            return {
                content: cli.html(),
                id: $w.data('id'),
                col: wgd.col,
                row: wgd.row,
                size_x: wgd.size_x,
                size_y: wgd.size_y
            };
        }
    },
    startDraging: false,
    componentDidMount: function () {
        this.initGridster();
        this.loadGridData();
        this.bindEvent();
        postal.subscribe({
            channel: "workspace",
            topic: "reset",
            callback: (data, envelope) => {
                $("#" + this.props.id + " ul").find("li.current").removeClass("current");
                $('.glyphicon-minus').attr('data-disabled', true)
                this.gridster.enable().enable_resize();
            }
        });
        postal.subscribe({
            channel: "block",
            topic: "modified",
            callback: function (data, envelope) {
                $("li[data-id='" + data.id + "']").html(data.html);
            }
        })
        postal.subscribe({
            channel: "block",
            topic: "remove",
            callback: (data, envelope)=> {
                this.removeBlock();
            }
        })
    },
    /**When mouse over(drag in、dragging) mouse out(drag out) mouseup( dragin effects)*/
    bindEvent: function () {
    },
    initGridster: function () {
        //remove old styles
        $("#style-" + this.props.id).remove();
        $("#" + this.props.id + ">ul").remove();
        $("#" + this.props.id).append("<ul/>");
        var that = this;
        var numberCols = 12;
        var numberRows = 10;
        that.authoring = AuthoringInfo;
        var options = {
            namespace: '#' + this.props.id,
            widget_margins: [1, 1],
            widget_base_dimensions: [(this.props.style.width) / numberCols - 2, (this.props.style.minHeight) / numberRows - 2],
            draggable: {
                start: function (event, ui) {
                },
                drag: function (event, ui) {
                },
                stop: (event, ui)=> {
                    /**
                     * When on double screen and the expand mode is 'extra' or 'portrait',
                     * Move the widget from left to right
                     * */
                    if (/*that.props.data.length>0&&*/that.props.setting.doubleScreen && (that.props.setting.expandMode === 1 || that.props.setting.expandMode === 3) && (ui.targetLeft + ui.$player.width() > $('#main-grid').width() + 20 || ui.targetLeft < -20)
                    ) {
                        that.moveBlock(ui.$player, ui.pointer.diff_left > 0);
                    }
                    //that.authoring.data.doubleScreenLeftWidgets=that.gridster.serialize()
                }
            },
            resize: {
                enabled: true,
                start: function () {
                },
                resize: function () {
                },
                stop: function () {
                }
            },
            min_cols: numberCols,
            min_rows: numberRows,
            serialize_params: function ($w, wgd) {
                return {
                    id: $w.data('id'),
                    type: $w.data("type"),
                    col: wgd.col,
                    row: wgd.row,
                    size_x: wgd.size_x,
                    size_y: wgd.size_y
                };
            }
        };
        this.gridster = $("#" + this.props.id + ">ul").gridster(options).data('gridster');
    },
    moveBlock: function (li, direction) {
        if (direction) {
            this.target = $("#extra-grid>ul").gridster().data('gridster');
        } else {
            this.target = $("#main-grid>ul").gridster().data('gridster');
            //this.gridster = $("#extra-grid>ul").gridster().data('gridster');
        }
        //var cli = li.clone();
        //cli.find(".gs-resize-handle").remove();
        //cli.find(".mce-content-body").removeAttr("id").removeAttr("contenteditable")
        //    .removeAttr("spellcheck").removeAttr("style").removeClass("mce-content-body");
        var id = li.data("id");
        var type = li.data("type");
        var editorId=li.find('.rtf').attr('id');
        if (editorId) {
            tinymce.get(editorId).remove()
        }
        this.gridster.remove_widget(li);
        this.target.add_widget("<li data-id='" + id + "'"
            + " data-type='" + type +
            "'>" + li.html() + "</li>",
            li.data("sizex"), li.data("sizey"), 1, 100);
        //var selector = "li[data-id='" + id + "']";
        this.initBlockEvents(id, type);
        //this.bindEditor(selector)
    },
    /**
     * When propeties and states change
     * */
    componentWillUpdate: function (nextProps, nextState) {
    },
    /**Extract n save grid data*/
    getGridData: function () {
        return this.gridster.serialize();
    },
    /**Load gridster widgets from layout.data */
    loadGridData: function () {
        if (this.props.data) {
            _.each(this.props.data, (data)=> {
                this.addBlock(data.type, AuthoringInfo.data.widgetContents[data.id], data.size_x, data.size_y, data.col, data.row, data.id);
            });
        }
    },
    componentDidUpdate: function (prevProps, prevState) {
        this.initGridster();
        this.loadGridData();
    },
    removeBlock: function () {
        var $curEle = $('#main-grid ul li.current');
        if ($curEle.length > 0) {
            this.gridster.remove_widget($curEle, function () {
                debugger;
            })
        }
    },
    addBlock: function (type, content, size_x, size_y, pos_x, pos_y, blockId) {
        //Using the gridster API that allows building intuitive draggable layouts from elements spanning multiple columns.
        if (!this.gridster) {
            this.gridster = $("#" + this.props.id + " ul").gridster({
                //widget_margins: [10, 10]
            }).data('gridster');
        }
        if (!size_x) {
            size_x = 12;
        }
        //The number of columns that the widget occupies. Defaults to 1.
        if (!size_y) {
            size_y = 3;
        }
        if (!pos_x) {
            pos_x = 1;
        }
        if (!pos_y) {
            pos_y = 10;
        }
        this.gridster.add_widget("<li data-id='" + blockId + "' data-type='" + type + "'>" + content + "</li>", size_x, size_y, pos_x, pos_y);
        this.initBlockEvents(blockId, type);
    },
    bindEditor: function (selector) {
            tinymce.init({
                selector: selector + ' .rtf',
                inline: true,
                menubar: false,
                toolbar: 'undo redo| bold italic underline strikethrough'
            });
    },
    initBlockEvents: function (blockId, type) {
        var that = this
        var selector = "li[data-id='" + blockId + "']";
        $(selector).off("click").on("click", function (event) {
            if (/*$(this).hasClass("player-revert") ||*/ $(this).hasClass("resizing")) {
                return;
            }
            event.stopPropagation();
            var text = $(this).text();
            if (text == "Please input text") {
                $(this).find('p').text('').height(20)
            }
            $(".gridster ul li.current").removeClass("current");
            $(this).addClass("current");
            $('.glyphicon-minus').attr('data-disabled', false)
            that.gridster.disable().disable_resize();
            if (that.props.setting.doubleScreen && that.target) {
                that.target.disable().disable_resize();
            }
            if (type !== 'text' && type !== 'img') {
                postal.publish({
                    channel: "block",
                    topic: "selected",
                    data: {
                        blockId: blockId,
                        type: type
                    }
                });
            }
        });
        if (type !== 'img') {
            that.bindEditor(selector);
        }
    },
    render: function () {
        return (<div className="gridster" id={this.props.id} style={this.props.style}>
                <ul></ul>
            </div>
        );
    }
});
module.exports = Gridster;