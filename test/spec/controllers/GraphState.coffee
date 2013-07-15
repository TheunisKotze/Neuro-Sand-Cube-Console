'use strict'

describe 'Controller: GraphStateCtrl', () ->

  # load the controller's module
  beforeEach module 'NeuroSandCubeConsoleApp'

  GraphStateCtrl = {}
  scope = {}

  # Initialize the controller and a mock scope
  beforeEach inject ($controller, $rootScope) ->
    scope = $rootScope.$new()
    GraphStateCtrl = $controller 'GraphStateCtrl', {
      $scope: scope
    }

  it 'should attach a list of awesomeThings to the scope', () ->
    expect(scope.awesomeThings.length).toBe 3;
