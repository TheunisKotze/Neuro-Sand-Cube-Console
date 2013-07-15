'use strict'

angular.module('NeuroSandCubeConsoleApp')
  .controller 'TableStateCtrl', ($scope, socket, serverCommunicator) ->

    $scope.newStates = serverCommunicator.newStates
    $scope.$watch($scope.newStates, ((newStates, oldStates) ->
      for state of newStates
        $scope.states[state] = newStates[state]
      if (newStates != oldStates)
        $scope.trial.hasData = true
    ),true)
