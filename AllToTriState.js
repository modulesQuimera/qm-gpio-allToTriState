module.exports = function(RED) {

    "use strict";
    // var serialPool = require("../../serial-template/serial")

    function AllToTriStateNode(config) {
        RED.nodes.createNode(this, config);
        this.serial = config.serial;
        this.serialConfig = RED.nodes.getNode(this.serial);
        this.gpionum = config.gpionum;
        this.output = config.output;
        this.slot = config.slot;
        var node = this;

        node.on('input', function(msg, send, done) {
            var globalContext = node.context().global;
            var exportMode = globalContext.get("exportMode");
            var currentMode = globalContext.get("currentMode");
            var file = globalContext.get("exportFile");
            var command = {
                type: "GPIO_modular_V1_0",
                slot: parseInt(node.slot),
                method: "all_to_tri_state",
                get_output: {},
                compare: {}
            };
            var slot = globalContext.get("slot");

            if(!(slot === "begin" || slot === "end")){
                if(currentMode == "test"){
                    file.slots[slot].jig_test.push(command);
                }
                else{
                    file.slots[slot].jig_error.push(command);
                }
            }
            else{
                if(slot === "begin"){
                    file.slots[0].jig_test.push(command);
                    // file.begin.push(command);
                }
                else{
                    file.slots[3].jig_test.push(command);
                    // file.end.push(command);
                }
            }
            globalContext.set("exportFile", file);
            send(msg);
            console.log(command);
        });
    }
    // nome do modulo
    RED.nodes.registerType("AllToTriState", AllToTriStateNode);
};