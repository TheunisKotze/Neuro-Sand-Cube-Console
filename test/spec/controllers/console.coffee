'use strict'

fakeServerData = '[ { "id": "player_x", "value": 537.467 , "change_count": 424 }  ,{ "id": "player_y", "value": 569.63 , "change_count": 330 }  ,{ "id": "distance_traveled", "value": 105.738 , "change_count": 424 } , { "id": "timestamp", "value": "1371856114644"  }, { "id": "frame", "value": 25110  } ]'


describe 'Controller: ConsoleCtrl', () ->
  # load the controller's module
  beforeEach module 'NeuroSandCubeConsoleApp'

  ConsoleCtrl = {}
  scope = {}
  socketMock =
        {
                on: (id, callback) ->
                        callback(fakeServerData)
                #emit: (id, data, callback) ->
                #        {}
        }
                       
  #socketMock = jasmine.createSpyObj 'socket', ['on', 'emit']

  # Initialize the controller and a mock scope
  beforeEach inject ($controller, $rootScope) ->
    scope = $rootScope.$new()
    #spyOn(socketMock, 'on').andCallThrough
    ConsoleCtrl = $controller 'ConsoleCtrl', {
        $scope: scope
        socket: socketMock
    }

  #it 'should attach a listener for NSC data', () ->
  #      expect(socketMock.on).toHaveBeenCalledWith jasmine.any(String), jasmine.any(Function)

  it 'should define states property on $scope', () ->
        expect(scope.states).toBeDefined()

  it 'should parse JSON and create states on $scope', () ->
        expect(Object.keys(scope.states).length).toBe 3
        expect(scope.states.player_x.count).toBe 424
        expect(scope.states.player_y.frame).toBe 25110

  

