/**
 * Created by ���� on 2016/3/17.
 */


$(function () {
    var menuWidth = 120;
    var w = $(window).width() - menuWidth;
    var h = $(window).height();
    $('ul').parent().height(data.height);
    $(".content").css("width", w).css("padding", 20).addClass("gridster");
    $(".content").css("min-height", data.height).css('min-width', data.minWidth);
    $(".content").append("<ul/>");
    function getOption($ele) {
        var height = 568;
        var options = {
            widget_margins: [1, 1],
            widget_base_dimensions: [($ele.width()) / 12 - 2, height / 10 - 2],
            min_cols: 12,
            min_rows: 10,
            resize: {
                enabled: true
            }
        };
        return options;
    }

    var options = getOption($(".content"));
    gridster = $(".content>ul").gridster(options).data('gridster');
    function renderData(gridster, widgets) {
        for (var i = 0; i < widgets.length; i++) {
            var widget = widgets[i];
            gridster.add_widget("<li data-id='" + widget.id + "' data-type='" + widget.type + "'>" + data.data.widgetContents[widget.id] + "</li>",
                widget.size_x, widget.size_y, widget.col, widget.row);
        }
        gridster.disable().disable_resize();
        $('[contenteditable]').attr('contenteditable', false)
        $('.gridster .gs-w').css("border", "none")
    }

    renderData(gridster, data.data.singleScreenWidgets);
    function isDoubleMode() {
        var doubleSize = [1024, 1280, 1920];
        var doubleWidth = doubleSize.map(function (currentValue) {
            return currentValue * 2 - menuWidth
        });
        //doubleWidth: [1928, 2440, 3720]
        return $.inArray($(window).width(), doubleWidth) != -1;
    }

    function layoutPage() {
        var isDouble = isDoubleMode();
        if (isDouble) {
            if ($(".content ul").length == 1) {
                var width = $('ul').width()
                $(".content").find('ul').hide().end().append("<ul/>").append("<ul/>");
                //gridster.remove_all_widgets()
                $('ul:gt(0)').width(width / 2 - 5).css('float', 'left')
                var options = getOption($('ul:eq(1)'))
                var gridsterLeft = $(".content>ul:eq(1)").gridster(options).data('gridster');
                var gridsterRight = $(".content>ul:eq(2)").gridster(options).data('gridster');
                renderData(gridsterLeft, data.data.doubleScreenLeftWidgets);
                renderData(gridsterRight, data.data.doubleScreenRightWidgets);
            } else {
                $('ul:first').hide().siblings().show();
            }
        } else {
            $('ul:first').show().siblings().hide();
        }
    }

    layoutPage();
    $(window).resize(function () {
        layoutPage();
    })
});