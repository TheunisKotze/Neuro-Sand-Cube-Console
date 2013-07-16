'use strict'

enforceLength2 = (val) ->
  if (val.toString().length == 1)
    return '0' + val
  else
    return val

angular.module('NeuroSandCubeConsoleApp')
  .controller 'StarttrialCtrl', ($location, $scope, socket) ->
    $scope.trial ?= {}
    $scope.defaults = ->
        
        $scope.trial.name = ""
        $scope.trial.animal = ""
        $scope.trial.length = 30

        date = new Date()
        day = enforceLength2(date.getDate())
        year = date.getFullYear();
        month = enforceLength2(date.getMonth()+1)
        hour = enforceLength2(date.getHours())
        minute = enforceLength2(date.getMinutes())

        $scope.trial.date = year + '-' + month + '-' + day
        $scope.trial.time = hour + ':' + minute
        
    $scope.startTrial = ->
        # validate
        #redirect
        $location.path('/console')
        socket.emit 'trial', $scope.trial, () ->

    $scope.defaults()
       
                
        
    
