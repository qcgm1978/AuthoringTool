'use strict';

requirejs.config({
    baseUrl: "js",
    paths: {
        'jquery': 'libs/jquery-1.11.2.min',
        'bootstrap':'libs/bootstrap-3.3.5/js/bootstrap.min',
        'angular':'libs/angular/angular',
        'angular-route':'libs/angular-route/angular-route',
        'angular-resource':'libs/angular-resource/angular-resource',
        'less':'libs/less.min',

        'angularap':'angularap'
    },
    shim:{
        'bootstrap':['jquery'],
        'angular-route':['angular'],
        'angular-resource':['angular'],

        'angularap':['angular','angular-route','angular-resource']
    }
});

define(
    [
        'jquery',
        'bootstrap',
        'angular',
        'angular-route',
        'angular-resource',
        'less',
        'angularap'
    ],function($,bootstrap,angular,route,resource,less,angularap){
        console.log($);
        console.log('aa');
    }
);