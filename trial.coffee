

nscTrial =  ->
        that = {}
        INTERVAL = 1000*60
        startTime = new Date().getTime()
        tick = 0
        _length = 0
        _name = "Default"
        active = false
        timer = null
        _updateCallback = -> console.log '_update'
        
        start = (name, number, length, date, time, updateCallback) ->
                active = true
                tick = 0
                _length = length
                _updateCallback = updateCallback
                _name = name
                startTime = new Date().getTime()
                timer = setTimeout(timerCallback, INTERVAL)
                console.log("\nTrial " + name + " started.\n")
                sendTimeUpdate()

        end = () ->
                if (timer != null)
                        clearTimeout(timer);
                tick = 0
                active = false
                sendTimeUpdate() # logging and sending could be anothers responsibilities
                console.log("Trial ended.")

        getTimeUpdate = () ->
          obj = {}
          obj.active = active
          endTime = startTime + _length*INTERVAL
          obj.time = endTime - new Date().getTime()
          obj.time = 0 if (obj.time < 0)
          obj.name = _name
          obj
        sendTimeUpdate = () ->
                _updateCallback(getTimeUpdate())
                
        timerCallback = () ->
                tick += 1
                now = new Date().getTime();
                diffStart = now - startTime;
                nextTime = startTime + (tick+1)*INTERVAL
                diff = nextTime-now
                if (tick < _length)  #must be wrong?
                        timer = setTimeout(timerCallback, diff)
                else
                        timer = null
                        end()
                sendTimeUpdate()
                
        that.isActive = -> active
        that.sendTimeUpdate = sendTimeUpdate
        that.getTimeUpdate = getTimeUpdate
        that.start = start
        that.end = end
        return that

module.exports = nscTrial

###
        tmpReset = 
[{ id: "reset_counter", target: "player_x" },
{ id: "reset_counter", target: "player_y" },
{ id: "reset_counter", target: "player_left_click" },
{ id: "reset_counter", target: "player_right_click" },
{ id: "reset_counter", target: "teleport" },
{ id: "reset_counter", target: "player_angle" },
{ id: "reset_counter", target: "distance_traveled" }]

endTrialNSC = () ->
        exports.client.write JSON.stringify(tmpReset)

exports.tick = 0
interval = 1000*60
exports.trialTimer = null
startTrial = (trial_name, animal_number, trial_length, trial_date, trial_time) ->
        exports.client.write(JSON.stringify(command)+'\n') for command in tmpReset
        createLogFileName(trial_name, animal_number, trial_date, trial_time)
        exports.trial_start_time = new Date().getTime()
        exports.tick = 0
        exports.trial_active = true
        console.log("\nTrial " + trial_name + " started.\n")
        exports.trialTimer = setTimeout( trialTimeTimer, interval)
        sendTrialTimeUpdate()

endTrial = () ->
        if (exports.trialTimer != null)
                clearTimeout(exports.trialTimer);
        exports.tick = 0
        exports.trial_active = false
        endTrialNSC()
        sendTrialTimeUpdate()
        console.log("Trial ended.")
		

trialTimeTimer = () ->
                exports.tick=exports.tick+1
                now = new Date().getTime();
                diffStart = now - exports.trial_start_time;
                nextTime = exports.trial_start_time + (exports.tick+1)*interval
                diff = nextTime-now
                if (exports.tick < exports.trial_length)
                        exports.trialTimer = setTimeout(trialTimeTimer, diff)
                else
                        exports.trialTimer = null
                        endTrial()
                sendTrialTimeUpdate()

sendTrialTimeUpdate = () ->
        obj = {}
        obj.trial_active = exports.trial_active
        endTime = exports.trial_start_time + exports.trial_length*interval
        obj.trial_time = endTime - new Date().getTime()
        if (obj.trial_time < 0)
                obj.trial_time = 0;
        exports.socket.emit('trial_progress',obj)
###