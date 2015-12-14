/**
 * Created by liuhan on 2015/11/27.
 */

var $ = require("jquery");

var ThemeMixins = {
    themeConfig: null,

    getThemeConfig: function(name) {
        var remote = $.ajax({
            type: "GET",
            url: "templates/default/config.json",
            async: false
        }).responseText;

        this.themeConfig = JSON .parse(remote);
        return this.themeConfig;
    },

    loadTheme: function() {
        this.getThemeConfig();
        $.ajax({
            type: "GET",
            url: "templates/default/" + this.themeConfig.default.html,
            dataType : 'html',
            success: function(html) {
                $(".styles").empty();
                $(".header").empty().append($(html).filter("header"));
                $(".footer").empty().append($(html).filter("footer"));
                $(html).filter("link").each(function() {
                    $(".styles").append('<link rel="stylesheet" href="templates/default/'
                        + $(this).attr("href") + '">');
                });
                $(".header").height()+ $(".footer").height();
            }
        });
    }
};

module.exports = ThemeMixins;
