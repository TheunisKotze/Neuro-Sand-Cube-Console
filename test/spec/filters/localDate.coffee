'use strict'

describe 'Filter: localDate', () ->

  # load the filter's module
  beforeEach module 'NeuroSandCubeConsoleApp'

  # initialize a new instance of the filter before each test
  localDate = {}
  beforeEach inject ($filter) ->
    localDate = $filter 'localDate'

  it 'should return the input prefixed with "localDate filter:"', () ->
    text = 'angularjs'
    expect(localDate text).toBe ('localDate filter: ' + text);
