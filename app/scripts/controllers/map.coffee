'use strict'

angular.module('NeuroSandCubeConsoleApp')
  .controller 'MapCtrl', ($scope, serverCommunicator) ->
    $scope.x ?= 0
    $scope.y ?= 0
    $scope.angle ?= 0
    $scope.newStates = serverCommunicator.newStates
    $scope.$watch($scope.newStates, ((newStates, oldStates) ->
      xState = newStates["player_x"]
      yState = newStates["player_y"]
      angleState = newStates["player_angle"]
      $scope.y = (xState.value - 450)/2 if xState?
      $scope.x = 300 - (yState.value - 280)/2 - 35 if yState?
      $scope.angle = angleState.value if angleState?
    ),true)


