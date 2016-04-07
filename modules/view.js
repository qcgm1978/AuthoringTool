/**
 * Created by ���� on 2016/3/17.
 */


$(function () {
    var w = $(window).width();
    var h = $(window).height();
    $(".content").css("width", w).css("padding", 20).addClass("gridsterLeft");
    $(".content").css("height", h - $("header").height() - $("footer").height());
    $(".content").append("<ul/>");
    function getOption($ele) {
        var options = {
            widget_margins: [1, 1],
            widget_base_dimensions: [($ele.width()) / 12 - 2, ($(".content").height()) / 10 - 2],
            min_cols: 12,
            min_rows: 10
        };
        return options;
    }

    var options = getOption($(".content"));
    var gridster = $(".content>ul").gridster(options).data('gridster');

    function renderData(gridster, widgets) {
        for (var i = 0; i < widgets.length; i++) {
            var widget = widgets[i];
            gridster.add_widget("<li data-id='" + widget.id + "' data-type='" + widget.type + "'>" + data.data.widgetContents[widget.id] + "</li>",
                widget.size_x, widget.size_y, widget.col, widget.row);
        }
    }

    renderData(gridster, data.data.singleScreenWidgets);
    $('.gridster .gs-w').css("border", "none")
    $('ul').parent().height(data.height);
    gridster.disable()/*.disable_resize()*/;
    $(window).resize(function () {
        if ($(".content ul").length == 1&& $(window).width()==2048) {
            var width=$('ul').width()
            $(".content").empty().append("<ul/>").append("<ul/>");
            //gridster.remove_all_widgets()
            $('ul').width(width/2).css('float','left')
            var options=getOption($('ul:first'))
            var gridsterLeft = $(".content>ul:eq(0)").gridster(options).data('gridster');
            var gridsterRight = $(".content>ul:eq(1)").gridster(options).data('gridster');
            renderData(gridsterLeft, data.data.doubleScreenLeftWidgets);
            renderData(gridsterRight, data.data.doubleScreenRightWidgets);
        }
    })
});