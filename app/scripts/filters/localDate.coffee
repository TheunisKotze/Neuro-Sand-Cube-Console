'use strict';

angular.module('NeuroSandCubeConsoleApp')
  .filter 'localDate', () ->
    (input) ->
      enforceLength2 = (val) ->
        if (val.toString().length == 1)
          return '0' + val
        else
          return val
      date = new Date(input)
      enforceLength2(date.getUTCHours()) + ':' + enforceLength2(date.getUTCMinutes()) + ':' + enforceLength2(date.getUTCSeconds())
