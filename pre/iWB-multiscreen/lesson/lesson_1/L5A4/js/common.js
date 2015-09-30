var activityComponents = [];
var activityOrderNumber = 1;
//-------------------------静态生成开始-------------------------
function loadActionByData(data, func) {
    for(var i=0; i<data.content.length; i++) {
        var component = addActionByData(data.content[i], func);
        if(typeof(component.initAction)=="function")component.initAction();
    }
}
function addActionByData(data, func) {
    var component = func(data, activityOrderNumber);
    component.needRefresh=true;
    if(typeof(fillUpBlank)!='undefined'){
        if(func==fillUpBlank)component.needRefresh=false;
    }
    activityComponents.push(component);
    activityOrderNumber ++;
    return component;
}
//-------------------------静态生成结束-------------------------

function loadDataByTemplate(data, func, templateId, container) {
    var template = Handlebars.templates[templateId];
    for(var i=0; i<data.content.length; i++) {
        var component = addActivityComponent(data.content[i], func, template);
        $(component.container).addClass("generated");
        $(container).append(component.container);
    }
}
function addActivityComponent(data, func, template) {
	var component = func(data, activityOrderNumber, template);
	activityComponents.push(component);
	activityOrderNumber ++;
	return component;
}

/** 
 * 用jquery 选择器选择特定段的html生成组件。
 * selector: html代码端
 * func: 组件函数 
 * data: json数据
 * */
function loadComponent(selector, func, data) {
	var i = 0;
	$(selector).each(function() {
		var contentData = null;
		if (data && data.content.length>i) {
			contentData = data.content[i];
		}
		i++;
		var component = func(this, contentData, activityOrderNumber);
		activityComponents.push(component);
		activityOrderNumber ++;
		return component;
	});
}
/**
 * 用于检查每小题的答案
 * 注意，由于填空题等存在一个段落或一个表格对应多个小题，实际建模只能按一个段落一个小题来做
 * 只有在检查答案的时候需要额外考虑这点。或者打分时考虑这一点
*/
function checkFn(param) {
    var num = activityComponents.length;
    var answers;
    if(typeof param == 'undefined'){
        answers=JSON.parse(readFn());
    }else if(param instanceof Array){
        answers=param;
    }else if(typeof param== 'string'){
        answers=JSON.parse(param);
    }
    var arr = [];
    for (var i = 0; i < num; i++) {
        var actComponent = activityComponents[i];
        if(actComponent.checkFn){
            var result=actComponent.checkFn(answers[i]);
            if(result instanceof Array){
                for(var jj=0;jj<result.length;jj++){
                    arr.push(result[jj]);
                }
            }else{
                arr.push(result);                
            }
        }else{
            arr.push(-1);
        }
    }
    return JSON.stringify(arr);
}
/*
*读取当前页面的题目答案
*/
function readFn() {
    var num = activityComponents.length;
    var arr = [];
    for (var i = 0; i < num; i++) {
        var actComponent = activityComponents[i];
        arr.push(actComponent.readFn());
    }
    return JSON.stringify(arr);
}
/**
* 设定当前页面的答案
*/
function setFn(str) {
    var arr = JSON.parse(str);
    for (var i = 0, len = arr.length; i < len; i++) {
        var actComponent = activityComponents[i];
        actComponent.setFn(arr[i]);
    }
}
/**
*检查答案，壳程序按检查答案按钮，页面为用户提供反馈，看看学生是否做对了。之后不可编辑
*/
function checkAnswer() {
    activityComponents.forEach(function(actComponent){
        actComponent.checkAnswer();
    });
}
/**
* 显示答案，壳程序点击显示答案按钮，页面显示正确答案，之后不可编辑。
*/
function showAnswer() {
    activityComponents.forEach(function(actComponent){
        if(actComponent.needRefresh)actComponent.refresh();
        actComponent.showAnswer();
    });
}
/**
*刷新， 壳程序点击刷新，页面将恢复初始状态，之后可以开始做题。
*/
function refresh() {
    activityComponents.forEach(function(actComponent){
        actComponent.refresh();
    });
}
/*
*判断是否是数字
*/
function isNum(s){
    var regu = /^\d+$/;
    var re = new RegExp(regu);
    return re.test(s);
}
/**
* jquery曾经废弃的方法，应用到课件里面，主要问题在于课件refresh时，有可能并
* 没有清零，需要注意。也有可能多次绑定。此处做了相应修改。
*/
$.fn.toggleClick = function () {
    var methods = arguments, // store the passed arguments for future reference
        count = methods.length; // cache the number of methods

    //use return this to maintain jQuery chainability
    return this.each(function (i, item) {
        // for each element you bind to
        var index = 0; // create a local counter for that element
        $(item).off("click");
        $(item).click(function () { // bind a click handler to that element
            return methods[index++ % count].apply($(item), arguments); // that when called will apply the 'index'th method to that element
            // the index % count means that we constrain our iterator between 0 and (count-1)
        });
    });
};
/**
* 常用于一道题目内不同选项序号，比如单选题自动标a,b,c,d,下拉题用罗马字符。等等。
*/
if (typeof Handlebars!="undefined") { 
	Handlebars.registerHelper('order_items', function (index,type,offset) {
	    if(offset&&isNum(offset))index=index+parseInt(offset);
	    if (type == "alpha") {
	        return String.fromCharCode(97 + index);
	    } else if (type == "ALPHA") {
	        return String.fromCharCode(65 + index);
	    } else if (type == "Number") {
	        return "" + (index + 1);
	    } else if(type == "Rome"){
	        var romeChar=["Ⅰ","Ⅱ","Ⅲ","Ⅳ","Ⅴ","Ⅵ","Ⅶ","Ⅷ","Ⅸ","Ⅹ","Ⅺ","Ⅻ"];
	        return index>11?""+(index + 1):romeChar[index];
	    }else if(type == "rome"){
	        var romeChar=["Ⅰ","Ⅱ","Ⅲ","Ⅳ","Ⅴ","Ⅵ","Ⅶ","Ⅷ","Ⅸ","Ⅹ","Ⅺ","Ⅻ"];
	        return index>11?""+(index + 1):romeChar[index].toLowerCase();
	    } else if (type == "None") {
	        return "";
	    } else if (typeof type=="object") {
	        return type[index];
	    } else {
	        return "" + (index + 1);
	    }
	});
}


/**
 * 拷贝源列表的一些属性到目标
 * */
function copyAttr(src, target) {
	var i = 0;
	if (src.length!=target.length) {
		return;
	}
	for(var i=0; i<src.length;i++) {
		$(target[i]).attr("id", $(src[i]).attr("id"));
		$(src[i]).removeAttr("id");
		$(target[i]).data("answer", $(src[i]).data("answer"));
	}
}

/**
*  左右两边各一个ul，其对应的li对齐问题
*/
function reAlign(left, right) {
	var aLi_l = left.children();
    var aLi_r = right.children();
    if (aLi_l.length!=aLi_r.length) {
    	return;
    }
    var i = 0;
    aLi_l.each(function() {
    	if ($(this).height()>$(aLi_r[i]).height()) {
    		$(aLi_r[i]).css("height", $(this).css("height"));
    	}  else {
    		$(this).css("height", $(aLi_r[i]).css("height"));
    	}
    	i++;
    });
}

(function($) {
	$.fn.randomize = function() {
	  return this.each(function() {
	      var $this = $(this);
	      var elems = $this.children();

	      elems.sort(function() { return (Math.round(Math.random())-0.5); });  
	      elems.detach();

	      for(var i=0; i < elems.length; i++) {
	    	  $this.append(elems[i]);      
	      }
	  });    
	}
})(jQuery);

$(document).ready(function (){
    $('.listen').toggle(function(){
        $(this).find("audio")[0].play();
    },function(){
        $(this).find("audio")[0].pause();
    });
});
