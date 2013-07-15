'use strict';

DataID = 'nsc'
getBaseURL = ->
        location.protocol + "//" + location.hostname + (location.port && ":" + location.port) + "/";

throttle = (f, wait) ->
  previous = 0
  context = null
  args = null
  timeout = null
  later = ->
    previous = new Date()
    timeout = null
    result = f.apply(context, args)
  return ->
    now = new Date()
    remaining = wait - (now - previous);
    context = this
    args = arguments;
    if (remaining <= 0)
      clearTimeout(timeout)
      timeout = null
      previous = now
      result = func.apply(context, args)
    else if (!timeout)
      timeout = setTimeout(later, remaining)
    return result

angular.module('NeuroSandCubeConsoleApp')
  .factory 'socket', ($rootScope) ->
    # Service logic
        url = getBaseURL()
        socket = io.connect url
    # Public API here
        {
                on: (eventName, callback) ->
                        socket.on eventName, _.throttle((->
                                args = arguments
                                $rootScope.$apply  ->
                                        callback.apply socket, args),100)
                emit: (eventName, data, callback) ->
                        socket.emit eventName,  data,  ->
                                args = arguments
                                $rootScope.$apply ->
                                        callback.apply socket, args if callback
        }
        
                                        
                
