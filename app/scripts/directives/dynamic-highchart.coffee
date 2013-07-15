'use strict';

angular.module('NeuroSandCubeConsoleApp')
  .directive('dynamichighchart', () ->
        getMergedOptions = (element, options) ->
                defaultOptions =
                        chart:
                                renderTo: element[0]
                                animation: false
                                width: 300
                                height: 200
                        title: {}
                        series: [data: [], enableMouseTracking:false]
                mergedOptions = {}
                if (options?)
                        mergedOptions = $.extend(true, {}, defaultOptions, options)
                else
                        mergedOptions = defaultOptions;
                mergedOptions            
            
        restrict: 'E'
        replace: false
        scope:
                series: '='
                options: '='
                title: '='
        link: (scope, element, attrs) ->
                mergedOptions = getMergedOptions element, scope.options
                chart = new Highcharts.Chart mergedOptions
                chart.setTitle(scope.title, true)            
                scope.$watch("series", ((newSeries, oldSeries) ->
                        chartSeries = chart.series[0]
                        numPoints = chartSeries.data.length
                        shift = false
                        shift = true if numPoints>=30                                    
                        (chartSeries.addPoint([point.x, point.y], true, shift,false)) for point in newSeries[0].data)
                       ,false))
                
          
        
