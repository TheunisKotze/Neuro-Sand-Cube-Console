'use strict'

angular.module('NeuroSandCubeConsoleApp')
  .controller 'StarttrialCtrl', ($location, $scope, socket) ->
    $scope.trial ?= {}
    $scope.defaults = ->
        
        $scope.trial.name = ""
        $scope.trial.animal = ""
        $scope.trial.length = 30
        newDate = new Date()

        $scope.trial.date = newDate.toISOString().substring(0,10)
        $scope.trial.time = newDate.toISOString().substring(11,16)
        
    $scope.startTrial = ->
        # validate
        #redirect
        $location.path('/console')
        socket.emit 'trial', $scope.trial, () ->

    $scope.defaults()
       
                
        
    
