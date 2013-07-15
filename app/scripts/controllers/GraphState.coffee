'use strict'

createChart = (id, state) ->
  #date = new Date()
  #date.setTime state.time
   return {
    options: {
      chart: {
        type: 'line'
      },
      xAxis: {
        type: 'datetime',
        tickPixelInterval: 150
      },
      series: [{ data: [{x: state.time, y: state.value}]}]
    },
    series: [{ data: [{x: state.time, y: state.value}]}],
    title: { text: id }
   }

angular.module('NeuroSandCubeConsoleApp')
  .controller 'GraphStateCtrl', ($scope, serverCommunicator) ->

    $scope.newStates = serverCommunicator.newStates
    $scope.$watch($scope.newStates, ((newStates, oldStates) ->
      for id of newStates
        state = newStates[id]
        if not(id of $scope.charts)
          $scope.charts[id] = createChart(id, state)
        $scope.charts[id].series = [{ data: [] }]
        $scope.charts[id].series[0].data.push {x: state.time,y: state.value}
    ),true)