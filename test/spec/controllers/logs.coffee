'use strict'

describe 'Controller: LogsCtrl', () ->

  # load the controller's module
  beforeEach module 'NeuroSandCubeConsoleApp'

  LogsCtrl = {}
  scope = {}

  # Initialize the controller and a mock scope
  beforeEach inject ($controller, $rootScope) ->
    scope = $rootScope.$new()
    LogsCtrl = $controller 'LogsCtrl', {
      $scope: scope
    }

  it 'should attach a list of awesomeThings to the scope', () ->
    expect(scope.awesomeThings.length).toBe 3;
