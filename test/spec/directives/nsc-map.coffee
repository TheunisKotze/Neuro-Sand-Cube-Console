'use strict'

describe 'Directive: nscMap', () ->
  beforeEach module 'NeuroSandCubeConsoleApp'

  element = {}

  it 'should make hidden element visible', inject ($rootScope, $compile) ->
    element = angular.element '<nsc-map></nsc-map>'
    element = $compile(element) $rootScope
    expect(element.text()).toBe 'this is the nscMap directive'
