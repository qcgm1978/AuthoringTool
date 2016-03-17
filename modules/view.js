/**
 * Created by ¡ı∫≠ on 2016/3/17.
 */


$(function() {

    var w = $(window).width();
    var h = $(window).height();



    $(".content").css("width", w);
    $(".content").css("height", h - $("header").height() - $("footer").height());

    $(".content").append("<ul/>");

    var options = {
        widget_margins: [1, 1],
        widget_base_dimensions: [($(".content").width()) / 12 - 2, ($(".content").height()) / 10 - 2],
        min_cols: 12,
        min_rows: 10
    };

    var gridster = $(".content>ul").gridster(options).data('gridster');

    for (var i=0; i<data.data.singleScreenWidgets.length; i++) {
        var widget =  data.data.singleScreenWidgets[i];
        gridster.add_widget("<li data-id='" + widget.id + "' data-type='" + widget.type + "'>" + data.data.widgetContents[widget.id] + "</li>",
                widget.size_x, widget.size_y, widget.col, widget.row);
    }
    gridster.disable().disable_resize();

});