'use strict'

angular.module('NeuroSandCubeConsoleApp')
  .controller 'ConsoleCtrl', ($scope, socket) ->
        console.log('Console ctrl')     
        $scope.commandIDs ?= [
                'restart_map',
                'reset_counter',
                'flush_water_reward',
                'issue_reward'
                ]
        $scope.commandTargets ?= [
                "level_restart",
                "player_x",
                "player_y",
                "player_left_click",
                "player_right_click",
                "teleport",
                "player_angle",
                "distance_traveled",
                "trial_start",
                "correct_trial",
                "incorrect_trial",
                "reward_issued"
                ]
        $scope.sendCommand = ->
                command = {}
                command.id = $scope.commandId
                command.target = $scope.commandTarget
                socket.emit 'command', command, ->
        
                
                