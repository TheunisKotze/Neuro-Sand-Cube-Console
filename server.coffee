app = require('express')();
server = require('http').createServer(app);
io = require('socket.io').listen(server);
net = require('net');

module.exports = ->
  nscServer = {}
  nscServerSocket = null
  dataCallback = null
  connectionChangeCallback = null
  connected = false

  nscServer.isConnected = -> connected
  nscServer.onData = (callback) ->
    dataCallback = callback
  nscServer.onConnectionChange = (callback) ->
    connectionChangeCallback = callback
  nscServer.SendData = (data) ->
    if (nscServerSocket?)
      nscServerSocket.write(data)

  nscConnect = (host, port) ->
    console.log('Attempting to connect to NSC server on ' + host + ':' + port + ' ...')
    nscServerSocket = net.connect(port,host,  ->
      console.log 'Connected to Neuro-Sand-Cube server.'
      connected = true
      connectionChangeCallback(connected) if (connectionChangeCallback?))
    nscServerSocket.on('error',() ->
      #console.log 'error connecting to Neuro-Sand-Cube server.  Retrying...')
    )
    nscServerSocket.on('close', ->
      nscDisconnect())
    nscServerSocket.on('timeout', -> nscDisconnect())
    nscServerSocket.on('end', () ->
      nscDisconnect())
    nscServerSocket.on('data', (data) ->
      dataCallback(data) if (dataCallback?))

    nscDisconnect =  ->
      connected = false
      connectionChangeCallback(connected) if (connectionChangeCallback?)
      #console.log 'Disconnected from NSC server...'
      nscConnect(host, port)

  env = process.env.NODE_ENV || 'development'
  app.set('env', env)
  console.log('env: ' + env)
  ###
    if (process.argv.length <= 2)
       console.log('No server & port specified. The format is node server [\'ip\'] [\'port\'].  Connecting on localhost:12345')
    else
       host = process.argv[2]
     if (process.argv.length>=4)
         port = process.argv[3]
  ###
  host = 'localhost'
  port = 12345
  nscConnect(host, port)
  server.listen(8000)

  module.exports = {}
  module.exports.app=app
  module.exports.io=io
  module.exports.nscServer = nscServer
  module.exports
        

#this is a bit retarded.  rather put all nsc stuff together