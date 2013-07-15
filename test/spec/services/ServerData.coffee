'use strict'

describe 'Service: ServerData', () ->

  # load the service's module
  beforeEach module 'NeuroSandCubeConsoleApp'

  # instantiate service
  ServerData = {}
  beforeEach inject (_ServerData_) ->
    ServerData = _ServerData_

  it 'should do something', () ->
    expect(!!ServerData).toBe true;
