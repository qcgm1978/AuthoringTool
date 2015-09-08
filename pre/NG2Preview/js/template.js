/**
 * Created by liuhan on 2015/9/6.
 */


function loadTemplate(name) {
    $.when( $.get("templates/" + name + "/index.html"),
            $.get("templates/" + name + "/sample.json"),
            $.get("templates/" + name + "/cool.css"))
        .done(function(data1, data2, data3) {
            $('<style type="text/css"></style>')
                .html(data3[0])
                .appendTo("head");
            bindTotemplate("templates/" + name + "/", $("<div>" + data1[0] + "</div>"), data2[0]);
        });
}

function bindTotemplate(baseUrl, html, jsonObj) {

    $.each(jsonObj.content, function(i, content) {
        var contentDiv = html.find(".activity-content.template").clone();
        contentDiv.removeClass("template");
        contentDiv.find(".question .label").html(content.label);
        contentDiv.find(".question .rubric").html(content.question.rubric);


        $.each(content.question.resources, function(i, resource) {
            if ("image" === resource.type) {
                $.each(resource.elements.content, function(i, resource) {
                    var cloned = contentDiv.find(".resources-image-x.template").clone().removeClass("template");
                    cloned.append("<img src='" + baseUrl + resource.address + "'>");
                    contentDiv.find(".resources-image-x.template").after(cloned);
                });
            }
        });

        var answer = contentDiv.find(".answer");
        $.each(content.answer.choices, function(i, choice) {
            var cloned = answer.find(".choices-x.template").clone().removeClass("template");
            cloned.find(".text").html(choice.text);

            cloned.click(function() {
               if ($(this).hasClass("choose")) {
                   $(this).removeClass("choose");
               } else {
                   $(this).addClass("choose");
               }
            });
            answer.find(".choices-x.template").after(cloned);
        });
        html.append(contentDiv);
    });


    html.find(".resizable").resizable({
            animateEasing: "easeOutBounce"
        }
    );

    html.find(".editable").click(function() {
        $(".editable.editing").removeClass("editing").attr("contentEditable", false);
        $(this).attr("contentEditable", true);
        $(this).addClass("editing");




    });
    $(".page-preview .deviceShell .screen").html(html);
}