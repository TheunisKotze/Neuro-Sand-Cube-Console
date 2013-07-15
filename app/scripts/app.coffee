'use strict'

angular.module('NeuroSandCubeConsoleApp', ['$strap.directives'])
  .config ($routeProvider) ->
    $routeProvider
      .when '/',
        redirectTo: '/console',
      .when '/trial',
        templateUrl: 'views/starttrial.html',
        controller: 'StarttrialCtrl'
      .when '/console',
        templateUrl: 'views/console.html',
        controller: 'ConsoleCtrl'
      .when '/logs',
        templateUrl: 'views/logs.html',
        controller: 'LogsCtrl'
      .otherwise
        redirectTo: '/'
