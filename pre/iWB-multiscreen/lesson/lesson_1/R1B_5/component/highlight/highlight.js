var localSelectClass = "answer1";
String.prototype.replaceAll = function(s1, s2) {　　
	return this.replace(new RegExp(s1, "g"), s2);
}

function setSelectClass(i) {
	localSelectClass = "answer" + i;
}

function addSelect() {
	var setColor = $("#select_color")
	if (setColor.length < 1) {
		setColor = $('<ul id="select_color"><li class="answer1"></li>' + '<li class="answer2"></li><li class="answer3"></li>' + '<li class="answer4"></li></ul>');
		$(".question_cont").append(setColor)
	}
	setColor.children("li").each(function(i){
		$(this).click(function(){
			$(this).css("border-color","#666").siblings().css("border-color","#FFF");
			localSelectClass = "answer" + (i+1);
		})
	});
}

function highLight(activityJsonObj, activityNumber, myTemplate, myCssClass) {
	var originalJSON = jQuery.extend(true, {}, activityJsonObj);
	/*-------------------开始生成HTML-----------------*/

	function preset(data) {
		var tempHtml = data.text;
		var anws=tempHtml.split(data.tag);
		var list=[],lanw;
		var reg =/#(answer\d+)#/;
		for(var k=0;k<anws.length;k++){
			lanw=""
			if(anws[k].match(reg)){
				var regTemp=anws[k].match(reg)[0];
				anws[k]=anws[k].replace(regTemp,"");
				lanw=regTemp.replace("#","").replace("#","");
			}
			list.push({txt:anws[k],type:lanw});
		}
		data.head = activityNumber;
		data.list=list;
	}

	function initJqueryObj() {
		//var template = Handlebars.templates.single_choice;
		if (myTemplate) {
			template = myTemplate;
		}
		addSelect();
		preset(activityJsonObj);
		var div = $(template(activityJsonObj));
		if (myCssClass) {
			$(div).addClass(myCssClass)
		}
		return div;
	}
	function initAction(){
		addSelect();
	}
	/*-------------------结束生成HTML-----------------*/
	/*-------------------开始绑定动作-----------------*/

	function getEleById(id) {
		var ele = $(id);
		if (ele.length == 0) ele = activityDiv.find(id);
		return ele;
	}
	//refresh

	function refresh() {
		var $Id = getEleById.bind(this);
		$Id("#highlight_" + activityNumber).find("i").data("select","").unbind().removeClass().each(function(i) {
			if (activityJsonObj.choice == "single") {
				$(this).click(function() {
					$(this).removeClass().data("select",localSelectClass).addClass(localSelectClass)
						.siblings().data("select","").removeClass()
				});
			} else {
				$(this).toggle(function() {
					$(this).removeClass().data("select",localSelectClass).addClass(localSelectClass);/*防止多个颜色同时选中*/
				}, function() {
					$(this).removeClass().data("select","");
				});
			}
		});
	}
	//read

	function readFn() {
		var result = [];
		$("#highlight_" + activityNumber).find("i").each(function(i) {
			if ($(this).data("select")) result.push({
				i: i,
				type: $(this).data("select")
			});
		});
		return result;
	}

	//set

	function setFn(result) {
		var m = 0;
		var items = $("#highlight_" + activityNumber).find("i").removeClass();
		for (var i = 0; i < result.length; i++) {
			items.eq(result[i].i).data("select",result[i].type).addClass(result[i].type);
		}
	}
	//check

	function checkFn(answer) {
		var sItems=$("#highlight_" + activityNumber).find("i");
		if(activityJsonObj.selectStyle == "or"){
			for(var i=0;i<answer.length;i++){
				var lOrder=answer[i].i;
				var lAnswer=answer[i].type;
				var localAnw=$(sItems[lOrder]).data("answer");
				if(localAnw&&localAnw==lAnswer)return 1
			}
			return 0;
		}else{
			var result = [];
			sItems.each(function(i) {
				if ($(this).data("answer")) result.push({
					i: i,
					type: $(this).data("answer")
				})
			});
			return (JSON.stringify(answer) == JSON.stringify(result)) ? 1 : 0;
		}
	}
	//check answer

	function checkAnswer() {
		$("#highlight_" + activityNumber).find("i").unbind().each(function(i) {
			if ($(this).data("select")) {
				if ($(this).data("select") == $(this).data("answer")) {
					$(this).addClass("yes");
					return;
				}
				$(this).addClass("no");
			}
		});
	}
	//show answer

	function showAnswer() {
		var sItems=$("#highlight_" + activityNumber).find("i").removeClass().data("select","").unbind()
		if(activityJsonObj.selectStyle == "or"){
			for(var i=0;i<sItems.length;i++){
				var localAnw=$(sItems[i]).data("answer");
				if (localAnw){
					$(sItems[i]).data("select",localAnw).addClass(localAnw+" shown");
					return;
				}
			}
		}else{
			sItems.each(function(i) {
				var localAnw=$(this).data("answer");
				if (localAnw) $(this).data("select",localAnw).addClass(localAnw+" shown");
			});
		}
		
	}
	/*-------------------结束绑定动作-----------------*/
	var activityDiv = typeof(Handlebars) == "undefined" ? "" : initJqueryObj();
	var activityComponent = {
		'initAction':initAction,
		'container': activityDiv,
		'data': originalJSON,
		'readFn': readFn,
		'setFn': setFn,
		'checkAnswer': checkAnswer,
		'showAnswer': showAnswer,
		'refresh': refresh,
		'checkFn': checkFn
	};
	activityComponent.refresh();
	return activityComponent;
}