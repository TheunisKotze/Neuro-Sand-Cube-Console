'use strict';

angular.module('NeuroSandCubeConsoleApp')
  .directive('nscMap', () ->
    template: '<div></div>'
    restrict: 'E'
    link: (scope, element, attrs) ->
      element.text 'this is the nscMap directive'
  )
