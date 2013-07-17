'use strict'

significantDifference = (pos1, pos2) ->
  return (Math.abs(pos1.x - pos2.x) > 25 || Math.abs(pos1.y - pos2.y) > 25 || Math.abs(pos1.angle - pos2.angle) > 30)


angular.module('NeuroSandCubeConsoleApp')
  .controller 'MapCtrl', ($scope, serverCommunicator) ->
    $scope.currentPosition ?= {x:-50,y:-50, angle:0}
    $scope.history ?= []
    $scope.newStates = serverCommunicator.newStates
    $scope.$watch($scope.newStates, ((newStates, oldStates) ->
      if (newStates["trial_start"]?)
        $scope.history = []
      xState = newStates["player_x"]
      yState = newStates["player_y"]
      angleState = newStates["player_angle"]
      $scope.currentPosition.y = (xState.value - 450)/2 if xState?
      $scope.currentPosition.x = 300 - (yState.value - 280)/2 - 35 if yState?
      $scope.currentPosition.angle = angleState.value if angleState?
      if ($scope.history.length==0 || significantDifference($scope.history[$scope.history.length-1], $scope.currentPosition))
        $scope.history.push( { x: $scope.currentPosition.x, y: $scope.currentPosition.y, angle: $scope.currentPosition.angle})
        if ($scope.history.length>20)
          $scope.history.shift()
    ),true)


