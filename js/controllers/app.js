/**
 * 建立angular.module
 * @define
 * 第一个模块名
 * 第二个依赖数组
 * 第三个回调函数
 */
define(['angular'], function (angular) {
    var app = angular.module('pinganApp', ['ngRoute','ngSanitize','ajaxLoading']);
    
    return app;

});
