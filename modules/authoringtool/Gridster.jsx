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
        var gridster = this;
        this.initGridster();
        this.bindEvent();
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
        var options = {
            namespace: '#' + this.props.id,
            widget_margins: [1, 1],
            widget_base_dimensions: [(this.props.style.width) / 12 - 2, (this.props.style.height) / 10 - 2],
            draggable: {
                start: function(event, ui) {
                    PageOperation.dragging = true;
                    PageOperation.dragged = ui;
                    console.log("drag of start");
                },
                stop: function(event, ui) {
                    PageOperation.dragging = false;
                    PageOperation.dragged = null;
                    console.log("drag of stop");
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
                    PageOperation.resizing = true;
                },
                resize: function() {
                    console.log("resizing");
                },
                stop: function() {
                    PageOperation.resizing = false;
                }
            },
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
        };
        $("#" + this.props.id + ">ul").gridster(options);
    },

    /**When propeties and states change */
    componentWillUpdate : function(nextProps, nextState) {

    },

    /**Extract n save grid data*/
    getGridData: function() {
        var layout = this;
        /**cache the state of grids by current screen(s) content*/

        if (this.props.doubleScreen===true) {
            //current double screen setting
            this.data.doubleScreenLeftWidgets = pured("#main-grid>ul");
            this.data.doubleScreenRightWidgets = pured("#extra-grid>ul");
        } else {
            //current single screeny setting
            this.data.singleScreenWidgets = pured("#main-grid>ul");
        }

        function pured(id) {
            var wlist =  $("#" + this.props.gid + ">ul").gridster().data('gridster').serialize();
            $(wlist).each(function() {
                layout.data.widgetContents[this.id] = this.content;
                delete this.content;
            });
            return wlist;
        }
        return this.data;
    },

    /**Load gridster widgets from layout.data */
    loadGridData: function() {
        var layout = this;
        if (layout.props.doubleScreen) {
            foreachAddWidget("#main-grid > ul", layout.data.doubleScreenLeftWidgets);
            foreachAddWidget("#extra-grid > ul", layout.data.doubleScreenRightWidgets);
        } else {
            foreachAddWidget("#main-grid > ul", layout.data.singleScreenWidgets);
        }
        function foreachAddWidget(selector, data) {
            var gridster = $(selector).gridster().data('gridster');
            $.each(data, function() {
                var li = "<li data-id='" + this.id + "'>" + layout.data.widgetContents[this.id] + "</li>";
                gridster.add_widget(li, this.size_x, this.size_y, this.col, this.row);
            });
        }
    },

    componentDidUpdate: function (prevProps, prevState) {

    },

    addBlock: function (type, content, size_x, size_y, pos_x, pos_y) {
        var gridster = $("#" + this.props.id + " ul").gridster().data('gridster');
        console.log(gridster);
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
        var blockId = _.uniqueId(this.BLOCK_ID_PREFIX);
        gridster.add_widget("<li data-id='" + blockId + "' data-type='" + type + "'>" + content + "</li>", size_x, size_y, pos_x, pos_y);
        this.initBlockEvents(blockId);
        /*
        this.data.doubleScreenLeftWidgets.push({
            id: blockId,
            col: 1,
            row: 100,
            size_x: sizex,
            size_y: sizey
        });
        */
    },

    initBlockEvents: function(blockId) {
        $("li[data-disabled='" + blockId + "']").off("click").on("click", function(event) {
            console.log("clicked");
            event.stopPropagation();
            if (PageOperation.dragging) return;

            $(".gridster ul li.current").removeClass("current");
            $(this).addClass("current");
            $(".gridster ul").gridster().data('gridster').disable().disable_resize();
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