'use strict'

getBaseURL = ->
        location.protocol + "//" + location.hostname +
        (location.port && ":" + location.port) + "/";


angular.module('NeuroSandCubeConsoleApp')
  .controller 'LogsCtrl', ($scope, socket) ->
        $scope.getLogs = -> 
                $scope.logs = []
                socket.emit 'logs_request', {}, () -> return;
        socket.on 'logs', (logs) ->
                i=0
                while (i < logs.length)
                #logs.forEach (log) ->
                        log = {}
                        log.url = getBaseURL() + 'log/' + i.toString()
                        log.name = logs[i]
                        $scope.logs.push(log)
                        ++i
        if not($scope.logs?)
                $scope.getLogs()
               