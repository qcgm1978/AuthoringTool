'use strict';

var dataServices = angular.module('dataServices', ['ngResource']);

dataServices.factory('stus_model', ['$resource',//注册服务
  function($resource){
    return $resource('data/:sid.json', {}, {
      query: {method:'GET', params:{sid:'stus'}, isArray:true}
    });
  }
]);

var stuCtrls = angular.module('stuCtrls', []);

stuCtrls.controller('stuListCtrl', [
  '$scope', 
  'stus_model',//使用的服务
  function($scope, stus_model) {
      $scope.stus = stus_model.query();
      $scope.orderProp = 'sid';
  }
]);

stuCtrls.controller('stuDetailCtrl', ['$scope', '$routeParams', 'stus_model',
function($scope, $routeParams, stus_model) {
    $scope.stus = stus_model.get(
        {sid: $routeParams.sid},//设置sid作为json文件名，sid来自路由设置
        function(stu) {$scope.stu = stu;}//获取数据成功后的回调函数
    );
}]);

var stu_admin= angular.module('stu_admin',['ngRoute','dataServices','stuCtrls']);
stu_admin.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/stus', {
        templateUrl: 'partials/list.html',
        controller: 'stuListCtrl'
      }).
      when('/stu/:sid', {
        templateUrl: 'partials/detail.html',
        controller: 'stuDetailCtrl'
      }).
      otherwise({
        redirectTo: '/stus'
      });
  }
]);