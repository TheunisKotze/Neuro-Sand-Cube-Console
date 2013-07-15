#app = require('express')();
express = require('express')
net = require('net');
fs = require('fs');
path = require('path');
spawn = require('child_process').spawn;
#zip = new require('node-zip')()
server = require('./server')()
trial = require('./trial')()

currentLogFile = ""
logDir = './log/'

##### routes

server.app.use(express.bodyParser())
# host dev files if in dev mode
console.log(__dirname)
if (server.app.get('env') == 'development')
        server.app.use(express.static(__dirname + '/.tmp'))
        server.app.use(express.static(__dirname + '/app'))
else
        server.app.use(express.static(__dirname + '/dist'))

#server.app.use(express.static(__dirname + '/public'))
#server.app.use(express.static(__dirname + '/app'))
#server.app.get('/',((req, res) ->
#        res.sendfile(__dirname + '/index.html')))
#server.app.post('/console',((req, res) -> consoleRequest(req, res)))

#server.app.post('/trial',((req, res) ->
        #endTrial()
#        res.sendfile(__dirname + '/trial.html')))
#server.app.post('/logs',((req, res) ->
#        res.sendfile(__dirname + '/logs.html')))

server.app.get('/log/:index', ((req, res) ->
        if (req.params.index < 0)
                l = __dirname + '/' + logDir
                #doZip()
        else
                files = fs.readdirSync(logDir)
                file = files[req.params.index]
                file = __dirname + '/' + logDir + file
                filename = path.basename(file)
                console.log(file)
                console.log(filename)
                res.attachment(filename)
                res.setHeader('Content-disposition', 'attachment; filename=' + filename)
                filestream = fs.createReadStream(file)
                filestream.on('data', (chunk) -> res.write(chunk))
                filestream.on('end',  ->
                        res.end())))

module.exports = server.app

# socket communication/client interface
#

tmpReset = 
[{ id: "reset_counter", target: "player_x" },
{ id: "reset_counter", target: "player_y" },
{ id: "reset_counter", target: "player_left_click" },
{ id: "reset_counter", target: "player_right_click" },
{ id: "reset_counter", target: "teleport" },
{ id: "reset_counter", target: "player_angle" },
{ id: "reset_counter", target: "correct_trial" },
{ id: "reset_counter", target: "incorrect_trial" },
{ id: "reset_counter", target: "reward_issued" },
{ id: "reset_counter", target: "distance_traveled" }]

logData = ((file, data) ->
        fs.appendFile(file, data.toString(), ((err) -> 
                if (err) 
                        throw err)))

### nsc callbacks ###
server.nscServer.onData((data) ->
  server.io.sockets.emit('nsc',data.toString())
  if (trial.isActive())
    logData(currentLogFile, data))

server.nscServer.onConnectionChange((connected) ->
  server.io.sockets.emit('connection', { "connected" : connected }))

server.io.sockets.on('connection', (socket) ->
        sendTimeUpdate = ->
          server.io.sockets.emit('trial_progress',trial.getTimeUpdate())
        sendTimeUpdate()
        server.io.sockets.emit('connection', { "connected" : server.nscServer.isConnected() })

        socket.on('command', (data) ->
                console.log("Command received: " + JSON.stringify(data))
                server.nscServer.SendData(JSON.stringify(data)))

        socket.on('stop_trial', (data) ->
                trial.end()) #if trial was responsible for this, trial would be 99% hidden. good or not?
        socket.on('trial', (data) ->
                createLogFileName(data.name, data.animalNumber, data.date, data.time)
                server.nscServer.SendData(JSON.stringify(command)+'\n') for command in tmpReset
                trial.start(data.name, data.animal,parseInt(data.length), data.date, data.time, (trialUpdate) -> server.io.sockets.emit('trial_progress',trialUpdate)))
        socket.on('trial_progress_request', -> sendTimeUpdate())
        socket.on('logs_request', () -> server.io.sockets.emit('logs', fs.readdirSync(logDir))))

createLogFileName = (name, number, date, time) ->
        time = time.replace(":","-")
        currentLogFile = "log/" + date + "_" + time + "_" + name + "_" + number + ".txt"


######
# temp
#
# doZip = ->
        #console.log(l)
                #zip.folder(l)
                #data = zip.generate()
                #res.attachment("all")
                #res.setHeader('Content-disposition', 'attachment; filename=' + "all")
                #res.write(data)
                #res.end()
                #files = fs.readdirSync(logDir)
                #file = files[req.params.index]
                #file = __dirname + '/' + logDir + file
                #zip = spawn('compact', ['/C', file]) # __dirname + '/' + 'log/'
                #res.contentType('zip')
                #zip.stdout.on('data', (data) ->
                #        res.write(data))
                #zip.stderr.on('data', (data) ->
                #        console.log('zip stderr: ' +data))
                #zip.on('exit', (code) ->
                #        if (code != 0)
                #                res.statusCode = 500
                #                console.log('zip exited with code ' +code)
                #                res.end()
                #        else
                #                res.end())