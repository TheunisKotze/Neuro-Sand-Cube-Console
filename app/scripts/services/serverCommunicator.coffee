'use strict';

angular.module('NeuroSandCubeConsoleApp')
  .factory 'serverCommunicator', ($rootScope, socket) ->
    _trial = {}
    newStates = {}
    connected = false

    socket.on 'connection', (connection) ->
      connected = connection.connected

    endTrial = ->
      socket.emit 'stop_trial', {}, ->

    socket.on 'trial_progress', (trial) ->
      _trial.active = trial.active
      _trial.timeRemaining = trial.time
      _trial.name = trial.name

    socket.on 'nsc', (data) ->
      states = JSON.parse data
      if not(_.any states, (obj) -> obj.id == "timestamp")
        return
      timestamp = (_.findWhere states, { id : "timestamp" }).value

      newStates = {}

      date = new Date()
      date.setTime timestamp
      frame = (_.findWhere states, { id : "frame" }).value

      _.forEach states, (state) ->
        if not(state.id in ["timestamp", "frame"])
          newStates[state.id] =
            {
            value: state.value
            count: state.change_count
            time:  date.getTime()
            frame: frame
            }

    # Public API here
    {
      connected: -> connected
      trial: -> _trial
      newStates: -> newStates
      endTrial: endTrial
    }

###if (timestamp - lastUpdated > UPDATE_TIME)
        updateOutputStates()
 lastUpdated = timestamp###