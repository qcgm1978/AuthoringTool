'use strict';
var data=null;
var contentID=0;
var dafaultTxt='点击设置内容和样式',defaultRow='<ul class="row"></ul>';

var styleConfigInfo={
    image:'<label>宽度：<input id="image_w" type="text" class="num" name="image_width" value="0"/></label> <label>高度：<input id="image_h" type="text" class="num" name="image_height" value="0"/></label>',
    audio:'<label><input type="checkbox" onclick="audioToggle()" name="audio_control" value="1"/> 显示进度条</label>',
    video:'<label>宽度：<input id="video_width" type="text" class="num" name="video_width" value="0"/></label> <label>高度：<input id="video_height" type="text" class="num" name="video_height" value="0"/></label>  <label>自动播放：<input type="checkbox" name="video_height" checked value="1"/></label> ',
    fillblank:'<label><input type="radio" name="quest_type" checked value="1"/> 样式1</label> <label><input type="radio" name="quest_type" value="2"/> 样式2</label>'
};
var audioToggle=function(){
    var _a=$('#con_view').find('audio').eq(0);
    if(_a.is(':visible')){
        _a.hide().prev().show();
    }else{
        _a.show().prev().hide();
    }
};

var localType;
var mainFun={
    loadContent:function(backID){
        $.fancybox({
            type:'ajax',
            href:'partials/config.html',
            width: 530,
            height: 430,
            beforeShow:function(){
                var i,textsHtml='',filesHtml='',questsHtml='';
                for(i=0;i<data.texts.length;i++){
                    textsHtml+='<li onclick="contentFun.changeText('+i+')">'+data.texts[i].name+'</li>';
                }
                for(i=0;i<data.files.length;i++){
                    filesHtml+='<li onclick="contentFun.changeFile('+i+')">'+data.files[i].name+'</li>';
                }
                for(i=0;i<data.quests.length;i++){
                    questsHtml+='<li onclick="contentFun.changeQuest('+i+')">'+data.quests[i].name+'</li>';
                }
                $('#con_nav').children('li').each(function(i){
                    $(this).click(function(){
                        if($(this).hasClass('on'))return;
                        $(this).addClass('on').siblings().removeClass('on');
                        $('#con_main').children('ul').removeClass('on').eq(i).addClass('on').children('li').removeClass('on');
                        $('#con_view').html('');
                        $('#con_style').html('');
                        localType="";
                    });
                });
                $('#text_list').html(textsHtml);
                $('#file_list').html(filesHtml);
                $('#quest_list').html(questsHtml);
                $('#con_confirm').click(function(){
                    saveChange('#'+backID);
                });
                $('#con_cancel').click(function(){
                    $.fancybox.close();
                });
            }
        });
    }
};

var contentFun={
    changeText:function(m){
        localType='text';
        $('#text_list').children('li').eq(m).addClass('on').siblings().removeClass('on');
        $('#con_view').html(data.texts[m].content);
    },
    changeFile:function(m){
        var fillHtml1='未识别内容类型',fillHtml2='';
        switch (data.files[m].type){
            case 'image':
                localType='image';
                fillHtml1='<img id="image_'+m+'" src="'+data.files[m].src+'" alt="'+data.texts[m].name+'"/>';
                fillHtml2=styleConfigInfo.image;
                break;
            case 'audio':
                localType='audio';
                fillHtml1='<span class="audio_ico"></span><audio id="audio_'+m+'" style="display:none" src="'+data.files[m].src+'" controls="controls"></audio>';
                fillHtml2=styleConfigInfo.audio;
                break;
            case 'video':
                localType='video';
                fillHtml1='<video id="video_'+m+'" src="'+data.files[m].src+'" autoplay></video>';
                fillHtml2=styleConfigInfo.video;
                break;
            default :
                return;
        }
        $('#file_list').children('li').eq(m).addClass('on').siblings().removeClass('on');
        $('#con_view').html(fillHtml1);
        $('#con_style').html(fillHtml2);
    },
    changeQuest:function(m,style){
        var type=data.quests[m].type;
        if(!style)style=1;
        localType=type;
        var fillHtml2=styleConfigInfo.fillblank;
        $('#con_style').html(fillHtml2);
        if(type=='fillblank')questsFun.fillblank(m,style);
        else questsFun.fillblank(m,style);
        $('#quest_list').children('li').eq(m).addClass('on').siblings().removeClass('on');

    }
};
var questsFun={
    fillblank:function(m,style){
        $.ajax({
            type:'get',
            url:'partials/fillblank'+style+'.html',
            dataType:'html',
            success:function(model){
                var format='<input type="text" id="blank_'+(m+1)+'_$1" />';
                var parReg=/\{{2}blank_(\d+)\}{2}/g;
                var quest=data.quests[m].quest.toEle(parReg,format);
                var order=data.quests[m].order;
                var html=model.replace('{{order}}',order).replace('{{quest}}',quest);
                $('#con_view').html(html);
            }
        })
    }
};
var saveChange=function(id){
    var inEle=$('#con_view');
    switch(localType){
        case 'image':
            var _w=$('#image_w').val(),_h=$('#image_h').val();
            if(_w!='0')inEle.find('img').width(_w);
            if(_h!='0')inEle.find('img').height(_h);
            break;
        case 'audio':
            break;
        case 'video':
            break;
        case "fillblank":
            break;
        case "text":
            break;
        default :
            return;
    }
    $(id).html(inEle.html());
    $.fancybox.close();
};
$(function(){
    var $main=$('#main');
    $('#select_json').click(function(){
        $('#json_editor').show();
        $('#layer_editor').hide();
        $(this).addClass('on').siblings().removeClass('on');
    });
    $('#select_layer').click(function(){
        try{
            data=JSON.parse($("#editor_box").html());
        }catch(e){
            alert('JSON数据有错误,请检查JSON数据');
            return;
        }
        $('#json_editor').hide();
        $('#layer_editor').show();

        $(this).addClass('on').siblings().removeClass('on');
    });
    $('#export').click(function(){
        if($("#main").html()=="")return;
        exportZip();
    });
    $('.item1').click(function(){
        var newRows=$(defaultRow);

        var rowContent='<li class="col-md-12"><div>'+dafaultTxt+'</div></li>';
        contentID++;
        var newRow=$(rowContent);
        newRow.attr('id','content_'+contentID);
        newRow.click(function(){mainFun.loadContent(this.id);});
        newRows.append(newRow);
        $main.append(newRows);
    });
    $('.item2').click(function(){
        var newRows=$(defaultRow);

        var rowContent='<li class="col-md-6"><div>'+dafaultTxt+'</div></li>';
        for(var m=0;m<2;m++){
            contentID++;
            var newRow=$(rowContent);
            newRow.attr('id','content_'+contentID);
            newRow.click(function(){mainFun.loadContent(this.id);});
            newRows.append(newRow);
        }
        $main.append(newRows);
    });
    $('.item3').click(function(){
        var newRows=$(defaultRow);

        var rowContent='<li class="col-md-4"><div>'+dafaultTxt+'</div></li>';
        for(var m=0;m<3;m++){
            contentID++;
            var newRow=$(rowContent);
            newRow.attr('id','content_'+contentID);
            newRow.click(function(){mainFun.loadContent(this.id);});
            newRows.append(newRow);
        }
        $main.append(newRows);
    });
    $('.item4').click(function(){
        var newRows=$(defaultRow);

        var rowContent='<li class="col-md-3"><div>'+dafaultTxt+'</div></li>';
        for(var m=0;m<4;m++){
            contentID++;
            var newRow=$(rowContent);
            newRow.attr('id','content_'+contentID);
            newRow.click(function(){mainFun.loadContent(this.id);});
            newRows.append(newRow);
        }
        $main.append(newRows);
    });
});