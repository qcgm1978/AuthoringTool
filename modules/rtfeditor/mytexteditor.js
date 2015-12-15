var $ = require("jquery");
var jQuery = require("jquery");
require("./css/font-awesome.min.css");

/*  my plugin  */
(function ($) {
    /*  panel drag */
    $.fn.dragDiv = function(divWrap) {
        return this.each(function() {
            var $divMove = $(this), /*draggable area */
                $divWrap = divWrap ? $divMove.parents(divWrap) : $divMove; /*whole movable area*/
            var mX = 0, mY = 0, dX = 0, dY = 0,
                isDown = false; /*mousedown flag*/
            if(document.attachEvent) { /*ie listener*/
                $divMove[0].attachEvent('onselectstart', function() {
                    return false;
                });
            }
            $divMove.mousedown(function(event) {
                var event = event || window.event;
                mX = event.clientX;
                mY = event.clientY;
                dX = $divWrap.offset().left;
                dY = $divWrap.offset().top;
                isDown = true;/* drag : start */
            });
            $(document).mousemove(function(event) {
                var event = event || window.event;
                var x = event.clientX,
                    y = event.clientY;
                if(isDown) {
                    $divWrap.css({"left": x - mX + dX, "top": y - mY + dY});
                }
            });
            $divMove.mouseup(function() {
                isDown = false; /*drag : start */
            });
        });
    };
})(jQuery);
