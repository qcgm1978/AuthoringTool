 function singleChoice(activityJsonObj, activityNumber, myTemplate, myCssClass) {
     /*-----------------生成页面开始------------------------*/
     function preset(activity) {
         var answers = activity.answers;
         for (var jj = 0; jj < answers.length; jj++) {
             var answer = answers[jj];
             if (answer.flag) activity.rAnswer = jj;
         }
         if (activityNumber) activity.head = activityNumber;
     };

     function initJqueryObj() {
         var template = Handlebars.templates.single_choice;
         if (myTemplate) {
             template = myTemplate;
         }
         var cssClass = "activity_single_choice";
         if (myCssClass) {
             cssClass = myCssClass;
         }
         var activityDiv = $('<div class="' + cssClass + '"></div>');
         var myStr = template(activityJsonObj);
         activityDiv.html(myStr);
         return activityDiv;
     }
     /*-----------------生成页面结束------------------------*/
     /*---------------页面绑定动作开始----------------------*/

     function getEleById(id) {
         var ele = $(id);
         if (ele.length == 0) ele = activityDiv.find(id);
         return ele;
     }
     /*read*/

     function readFn() {
         var answer = -1;
         var aP = $("#schoice_" + activityNumber);
         answer = aP.data("selected");
         return answer;
     };
     /*check*/

     function checkFn(answer) {
         var index = answer;
         if (typeof answer != 'number') index = -1;
         var resultOk = 0;
         if (index == activityJsonObj.rAnswer) resultOk = 1;
         return resultOk;
     };
     /*set*/

     function setFn(answer) {
         var index = answer;
         var liItems=$("#schoice_"+activityNumber).find("li>i").parent();
         if (typeof answer != 'number') {
             $("#schoice_"+activityNumber).data("selected", -1);
             liItems.removeClass("chosedLi").find(".choose").removeClass("choose_b");
         } else {
             $("#schoice_"+activityNumber).data("selected", answer);
             liItems.removeClass("chosedLi").find(".choose").removeClass("choose_b");
             liItems.eq(answer).addClass("chosedLi").find(".choose").addClass("choose_b");
         }
     };
     /*check answer*/

     function checkAnswer() {
         var lAnswer = $("#schoice_"+activityNumber).data("selected");
         var className = "icon_e";
         var liItems=$("#schoice_"+activityNumber).find("li>i").parent();
         if (lAnswer == activityJsonObj.rAnswer) className = "icon_r";
		 if(lAnswer>=0){
			liItems.unbind().eq(lAnswer).children("i:last").addClass(className).show();			 
		 }else{
			 liItems.unbind().eq(activityJsonObj.rAnswer).children("i:last").addClass(className).show();			 
		 }
     };
     /*show answer*/

     function showAnswer() {
         var liItems=$("#schoice_"+activityNumber).data("selected", activityJsonObj.rAnswer).find("li>i").parent();
         liItems.find(".choose").removeClass("choose_b");
         liItems.removeClass("chosedLi").unbind().eq(activityJsonObj.rAnswer).addClass("chosedLi")
             .find(".choose").addClass("choose_b");
         
     };
     /*refresh*/

     function refresh() {
         var $Id = getEleById.bind(this);
         var liItems=$Id("#schoice_" + activityNumber).data("selected", -1).find("li>i").parent();
         liItems.unbind().removeClass("chosedLi").each(function(i) {
                 $(this).find(".choose").removeClass("choose_b");
                 $(this).click(function(e) {
                     $Id("#schoice_" + activityNumber).data("selected", i);
                     $(this).addClass("chosedLi");
					 liItems.removeClass("chosedLi").find(".choose").removeClass("choose_b");
                     $(this).find(".choose").addClass("choose_b");
                 });
             });
         liItems.children("i").removeClass("icon_e icon_r").hide();
     };
     /*------------------------绑定页面动作结束---------------------------------*/

     preset(activityJsonObj);
     var activityDiv = typeof(Handlebars) == "undefined" ? "" : initJqueryObj();
     var activityComponent = {
         container: activityDiv,
         jqueryObj: activityDiv,
         data: activityJsonObj
     };
     activityComponent.checkFn = checkFn.bind(activityComponent);
     activityComponent.readFn = readFn.bind(activityComponent);
     activityComponent.setFn = setFn.bind(activityComponent);
     activityComponent.checkAnswer = checkAnswer.bind(activityComponent);
     activityComponent.showAnswer = showAnswer.bind(activityComponent);
     activityComponent.refresh = refresh.bind(activityComponent);
     activityComponent.refresh();
     return activityComponent;
 };