/**
 * Created by liuhan on 2015/9/1.
 */

function ToolComponent() {
}

ToolComponent.annotations = [
    new angular.ComponentAnnotation({
        selector: "Authoring-Tool"
    }),
    new angular.ViewAnnotation({
        templateUrl : 'html/tool.html',
        directives: [
            ToolBarComponent,
            EmptyNewComponent,
            TemplateSelectComponent,
            PagePreivewComponent,
            angular.NgFor,
            angular.NgIf]
    })
];

$(function() {
    angular.bootstrap(ToolComponent);
})

function ToolBarComponent() {

    this.displayModel = function(type) {
        $(".deviceShell").removeClass().addClass("deviceShell").addClass(type);

        $(".switches .current").removeClass("current");
        $(".switches ." + type ).addClass("current");

    }

}

ToolBarComponent.annotations = [
    new angular.ComponentAnnotation({
        selector: "toolbar"
    }),
    new angular.ViewAnnotation({
        templateUrl : 'html/toolbar.html',
        directives: [
            angular.NgFor,
            angular.NgIf
        ]
    })
];


function EmptyNewComponent() {
    this.newActivity = function() {
        $(".new").hide();
        $(".temlate-select").show();
    }

}

EmptyNewComponent.annotations = [
    new angular.ComponentAnnotation({
        selector: "empty-new"
    }),
    new angular.ViewAnnotation({
        templateUrl : 'html/empty-new.html',
        directives: [angular.NgFor,angular.NgIf]
    })
];



function TemplateSelectComponent(templatesService) {
    this.openType = function(event) {
        var nul = $(event.target).next('ul');
        if (nul.hasClass("on")) {
            nul.removeClass("on").slideUp('fast');
        } else {
            nul.addClass("on").slideDown('fast');
        }
    };

    this.filterTemplate = function(name) {
        while(templatesService.templates.pop());
        templatesService.templates.push({
            "title": "Magic Grouping Template",
            "thumb": "img/grouping1.png"
        });
        templatesService.templates.push( {
            "title": "Bar Chart Percentage Template",
            "thumb": "img/3.png"
        });
        templatesService.templates.push( {
            "title": "Writing Task Template ",
            "thumb": "img/8.png"
        });
        templatesService.templates.push( {
            "title": "Summarising Template ",
            "thumb": "img/9.png"
        });
    }

    this.types = [ {
        name: "Blank Filling",
        children: [
            "fill in the blanks",
            "with options",
            "essay",
            "dictation"
        ]
    }, {
        name: "Choice Question",
        children: [
            "single-choice question",
            "multiple-choice question",
            "highlight",
            "right or wrong",
            "listening"
        ]
    }, {
        name: "Matching Question",
        children: [
            "matching",
            "grouping"
        ]
    }];
}

TemplateSelectComponent.annotations = [
    new angular.ComponentAnnotation({
        selector: "template-selection",
        appInjector: [TemplatesService]
        //componentServices: [TemplatesService]
    }),
    new angular.ViewAnnotation({
        templateUrl : 'html/template-select.html',
        directives: [angular.NgFor,angular.NgIf,TemplateListComponent]
    })
];
TemplateSelectComponent.parameters = [[TemplatesService]];

function TemplateListComponent(templatesService){
    this.templates = templatesService.templates;

    this.openTemplate = function(tname) {
        $(".temlate-select").hide();
        $(".page-preview").show();
        loadTemplate("gt1");
    }
}

TemplateListComponent.annotations = [
    new angular.ComponentAnnotation({
        selector: "template-list",
        componentServices: [TemplatesService]
        //appInjector: [TemplatesService]
        //lifeCycle: [TemplateListComponent.onChange]
    }),
    new angular.ViewAnnotation({
        templateUrl : 'html/template-list.html',
        directives: [
            angular.NgFor,
            angular.NgIf
        ]
    })
];

TemplateListComponent.parameters = [[TemplatesService]];

function TemplatesService() {
    this.templates = [ ];
}

function ActivityPageComponent(){

}

ActivityPageComponent.annotations = [
    new angular.ComponentAnnotation({
        selector: "template-list"
        //appInjector: [TemplatesService]
        //lifeCycle: [TemplateListComponent.onChange]
    }),
    new angular.ViewAnnotation({
        templateUrl : 'html/template-list.html',
        directives: [
            angular.NgFor,
            angular.NgIf
        ]
    })
];


function PagePreivewComponent(){

}

PagePreivewComponent.annotations = [
    new angular.ComponentAnnotation({
        selector: "preview"
    }),
    new angular.ViewAnnotation({
        templateUrl : 'html/page-preview.html',
        directives: [
            angular.NgFor,
            angular.NgIf
        ]
    })
];



