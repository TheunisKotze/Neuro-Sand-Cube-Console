'use strict'

describe 'Controller: StarttrialCtrl', () ->

  # load the controller's module
  beforeEach module 'NeuroSandCubeConsoleApp'

  StarttrialCtrl = {}
  scope = {}

  # Initialize the controller and a mock scope
  beforeEach inject ($controller, $rootScope) ->
    scope = $rootScope.$new()
    StarttrialCtrl = $controller 'StarttrialCtrl', {
      $scope: scope
    }

  it 'should attach a list of awesomeThings to the scope', () ->
    expect(scope.awesomeThings.length).toBe 3;
