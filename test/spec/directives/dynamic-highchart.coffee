'use strict'

describe 'Directive: dynamicHighchart', () ->
  beforeEach module 'NeuroSandCubeConsoleApp'

  element = {}

  it 'should make hidden element visible', inject ($rootScope, $compile) ->
    element = angular.element '<dynamic-highchart></dynamic-highchart>'
    element = $compile(element) $rootScope
    expect(element.text()).toBe 'this is the dynamicHighchart directive'
