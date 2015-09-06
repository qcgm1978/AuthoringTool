/**
 * @author liuying
 * @version 0.8
 * @intro the pop layer to work with Jquery
 */
(function($){
    $.fn.extend({
        lyLayer:function(model,data){
            $.ajax({
                type:"GET",
                url: model,
                dataType:"html",
                success:function(str){
                    //data:data,
                    layer.open({
                        type:1,
                        scrollbar:false,
                        title:"设置区块内容",
                        content:str
                    });
                    $('#'+box_id+' > div').html('内容已修改！')
                }
            });
        }
    });
})(jQuery);
