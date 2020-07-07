module.exports = function(RED) {

    "use strict";
    // var serialPool = require("../../serial-template/serial")

    function AllToTriStateNode(config) {
        RED.nodes.createNode(this, config);
        var node = this
        this.serial = config.serial;
        this.serialConfig = RED.nodes.getNode(this.serial);
        node.gpionum = config.gpionum
        node.output = config.output

        // if (this.serialConfig) {
        //     node.port = serialPool.get(this.serialConfig);
            node.on('input', function(msg, send, done) {
                var globalContext = node.context().global;
                var exportMode = globalContext.get("exportMode");
                var currentMode = globalContext.get("currentMode");
                // if(exportMode){
                    var file = globalContext.get("exportFile")
                    var command = {
                        type: "GPIO_modular_V1.0",
                        slot: 1,
                        method: "all_to_tri_state",
                        // GPIO_number: parseInt(node.gpionum),
                        // GPIO_output: node.output === "true" ? true : false
                    }
                    var file = globalContext.get("exportFile")
                    var slot = globalContext.get("slot");

                    if(currentMode == "test"){file.slots[slot].jig_test.push(command)}
                    else{file.slots[slot].jig_error.push(command)}
                    globalContext.set("exportFile", file);
                    send(msg)
                    console.log(command)
        //         }
        //         else{
        //             node.status({fill:"yellow", shape:"dot", text:"waiting"}); // seta o status pra waiting
    
        //             node.port.enqueue(msg, node,function(err,res) { // empilha a informacao a ser passada via serial
        //                 if (err) {
        //                     var errmsg = err.toString().replace("Serialport","Serialport " + node.port.serial.path);
        //                     node.error(errmsg,msg);
        //                 }
        //             });
        //         }
             });
        //     // nao mexa em nada daqui pra baixo
        //     this.port.on('data', function(msgout, sender) {
        //         if (sender !== node) { return; }
        //         node.status({fill:"green",shape:"dot",text:"ok"});
        //         msgout.status = "OK";
        //         node.send(msgout);
        //     });
        //     this.port.on('timeout', function(msgout, sender) {
        //         if (sender !== node) { return; }
        //         msgout.status = "ERR_TIMEOUT";
        //         node.status({fill:"red",shape:"ring",text:"timeout"});
        //         node.send(msgout);
        //     });
        //     node.port.on('ready', function() {
        //         node.status({fill:"green",shape:"dot",text:"connected"});
        //     });
        //     node.port.on('closed', function() {
        //         node.status({fill:"red",shape:"ring",text:"not-connected"});
        //     });
        // }
        // else {
        //     this.error(RED._("serial.errors.missing-conf"));
        // }
        // this.on("close", function(done) {
        //     if (this.serialConfig) {
        //         serialPool.close(this.serialConfig.serialport,done);
        //     }
        //     else {
        //         done();
        //     }
        // });
    }

    // nome do modulo
    RED.nodes.registerType("AllToTriState", AllToTriStateNode);
}