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

        node.on('input', function(msg, send, done) {
            var globalContext = node.context().global;
            var exportMode = globalContext.get("exportMode");
            var currentMode = globalContext.get("currentMode");
            var file = globalContext.get("exportFile")
            var command = {
                type: "GPIO_modular_V1.0",
                slot: 1,
                method: "all_to_tri_state",
            }
            var file = globalContext.get("exportFile")
            var slot = globalContext.get("slot");

            if(currentMode == "test"){file.slots[slot].jig_test.push(command)}
            else{file.slots[slot].jig_error.push(command)}
            globalContext.set("exportFile", file);
            send(msg)
            console.log(command)
        });
    }

    // nome do modulo
    RED.nodes.registerType("AllToTriState", AllToTriStateNode);
}