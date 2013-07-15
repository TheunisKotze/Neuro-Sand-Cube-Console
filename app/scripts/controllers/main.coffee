'use strict'

trialTimeInterval = 1000

calculateTime = (scope) ->
        scope.trial.minutes = Math.floor(scope.trial.timeRemaining / (60*1000))
        seconds = Math.floor(scope.trial.timeRemaining % (60*1000)/1000)
        if (seconds.toString().length == 1)
                scope.trial.seconds = '0' + seconds
        else
                scope.trial.seconds = seconds

angular.module('NeuroSandCubeConsoleApp')
  .controller 'MainCtrl', ($scope, $timeout, socket, serverCommunicator) ->
        console.log('Main ctrl')
        $scope.states ?= {}
        $scope.charts ?= {}
        $scope.trial ?= {}
        $scope.alerts ?= []
        $scope.trial.hasData = false
        $scope.connected = serverCommunicator.connected
        $scope._trial = serverCommunicator.trial

        onEndTrial = (name) ->
          $scope.alerts.push({
            "type": "info",
            "title": name,
            "content":  "finished at " + new Date() + "."
          })

        timerPromise = null
        timerCallback = ->
          $scope.trial.timeRemaining -= trialTimeInterval
          $scope.trial.timeRemaining = 0 if ($scope.trial.timeRemaining<0)
          calculateTime($scope)
          if not($scope.trial.active)
            $timeout.cancel(timerPromise)
            timerPromise = null
          else
            timerPromise = $timeout(timerCallback, trialTimeInterval)

        $scope.$watch($scope._trial, ((trial, oldTrial) ->
          $scope.trial.active = trial.active
          $scope.trial.timeRemaining = trial.timeRemaining
          $scope.trial.name = trial.name
          calculateTime($scope)
          if (trial.active && timerPromise == null)
            timerPromise = $timeout(timerCallback, trialTimeInterval)
          else if (!trial.active)
            $timeout.cancel(timerPromise)
            timerPromise = null
          if (!trial.active && oldTrial.active)
            onEndTrial(trial.name)
        ),true)

        $scope.trial.endTrial = ->
          serverCommunicator.endTrial()
