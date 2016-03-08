var React = require('react');

var _ = require("underscore");
var postal = require("postal");

var PageOperation = require("./PageOperation");

/***
 * Properties :
 * id : grid id
 * styles: about position and sizing informations
 */
var Gridster = React.createClass({

    BLOCK_ID_PREFIX: "block_",

    getInitialState: function () {
        return {

        };
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
            cli.find(".mce-content-body").removeAttr("id").removeAttr("contenteditable")
            .removeAttr("spellcheck").removeAttr("style").removeClass("mce-content-body");
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

        var gridster = this;
        postal.subscribe({
            channel: "workspace",
            topic: "reset",
            callback: function(data, envelope) {
                $("#" + gridster.props.id + " ul").find("li.current").removeClass("current");
                $("#" + gridster.props.id + " ul").gridster().data('gridster').enable().enable_resize();
            }
        });
    },

    /**When mouse over(drag in、dragging) mouse out(drag out) mouseup( dragin effects)*/
    bindEvent: function() {
        var gridster = this;
        $('#' + this.props.id).hover(function() {
            if (PageOperation.dragging) {
                $('#' + gridster.props.id).addClass("dragged");
            }
        }, function() {

        }).on("mouseup", function() {
            if (PageOperation.dragging && PageOperation.dragged) {
                console.log("drag mouse up");
            }
            $('#' + gridster.props.id).removeClass("dragged");
        })
    },

    initGridster: function() {
        //remove old styles
        var gridster = this;
        $("#style-" + this.props.id).remove();


        $("#" + this.props.id + ">ul").remove();
        $("#" + this.props.id).append("<ul/>");
        var options = {
            namespace: '#' + this.props.id,
            widget_margins: [1, 1],
            widget_base_dimensions: [(this.props.style.width) / 12 - 2, (this.props.style.minHeight) / 10 - 2],
            draggable: {
                start: function(event, ui) {

                },
                drag: function(event, ui) {
                    console.log("left", ui.pointer.left);
                    console.log("top", ui.pointer.top);
                },

                stop: function(event, ui) {
                    console.log(event, ui);
                    /**
                     * When on double screen and the expand mode is 'extra' or 'portrait',
                     * Move the widget from left to right
                        if (layout.props.pageSetting.doubleScreen && (layout.props.pageSetting.expandMode===1||layout.props.pageSetting.expandMode===3)
                            && ui.pointer.left>=layout.props.pageSetting.width+70) {
                            layout.moveBlock(ui.$player, true);
                        }
                     * */
                }
            },
            resize: {
                enabled: true,
                start: function() {
                },
                resize: function() {
                },
                stop: function() {
                }
            },
            min_cols: 12,
            min_rows: 10,
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

        var gridster = this;
        $("#" + this.props.id + ">ul").gridster(options);
    },

    /**
     * When propeties and states change
     * */
    componentWillUpdate : function(nextProps, nextState) {

    },

    /**Extract n save grid data*/
    getGridData: function() {

        return $("#" + this.props.id + ">ul").gridster().data('gridster').serialize();
    },

    /**Load gridster widgets from layout.data */
    loadGridData: function() {
        var gridster = this;
        if (this.props.data) {
            _.each(this.props.data, function(data) {
                gridster.addBlock(data.type,PageOperation.data.widgetContents[data.id], data.size_x, data.size_y, data.col, data.row, data.id);
            });
        }
    },

    componentDidUpdate: function (prevProps, prevState) {
        this.initGridster();
        this.loadGridData();
    },

    addBlock: function (type, content, size_x, size_y, pos_x, pos_y, blockId) {
        console.debug("+block " + type, content, size_x, size_y,pos_x,pos_y);
        var gridster = $("#" + this.props.id + " ul").gridster().data('gridster');
        if (!size_x) {
            size_x = 12;
        }
        if (!size_y) {
            size_y = 2;
        }

        if (!pos_x) {
            pos_x = 1;
        }
        if (!pos_y) {
            pos_y = 10;
        }

        if (!blockId) {
            blockId = _.uniqueId(this.BLOCK_ID_PREFIX);
        }
        gridster.add_widget("<li data-id='" + blockId + "' data-type='" + type + "'>" + content + "</li>", size_x, size_y, pos_x, pos_y);
        this.initBlockEvents(blockId);
    },

    initBlockEvents: function(blockId) {
        $("li[data-id='" + blockId + "']").off("click").on("click", function(event) {
            console.log($(this).attr("class"));
            if ($(this).hasClass("player-revert") || $(this).hasClass("resizing")) {
                console.log("return");
                return;
            }
            event.stopPropagation();
            $(".gridster ul li.current").removeClass("current");
            $(this).addClass("current");
            $(".gridster ul").gridster().data('gridster').disable().disable_resize();
            console.log("click end!");
        });
        tinymce.init({
            selector: '.gridster li .rtf',
            inline: true,
            menubar: false,
            toolbar: 'undo redo| bold italic underline strikethrough'
        });
    },

    render: function () {
        return (<div className="gridster" id={this.props.id} style={this.props.style}>
                <ul></ul>
            </div>
        );
    }
});

module.exports = Gridster;