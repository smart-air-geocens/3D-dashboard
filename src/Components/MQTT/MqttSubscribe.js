// This function is mainly esponsible to subscribe to all DSs exists in the selected Thing using MQTT protocol
// So, the process of subscription for all DSs exist in the Thing is automatic
import mqtt from 'mqtt'
import React from "react";

const MqttSubscribe = (DS_Name, id, sensorKitInfo, updatingFunction, updatingClients) => {
    let client = mqtt.connect("wss://ogc-3d-iot-pilot.sensorup.com:9443/mqtt")
    client.on('error', function(err) {
        console.log(err)
        client.end()
    })

    client.subscribe("v1.0/Datastreams(" + id + ")/Observations", { qos: 1 })
        // client.subscribe("v1.0/#", {qos: 1})

    let clientObject = {}
    clientObject[id] = client
    updatingClients(clientObject)

    client.on('message', (topic, message) => {
        const payload = JSON.parse(message.toString())

        sensorKitInfo[DS_Name] = [Number((Math.round(payload.result * 100) / 100).toFixed(1)), payload.phenomenonTime]
        updatingFunction(sensorKitInfo)

        if (payload === null) {
            console.log("null")
        }
    })

    client.on('connect', function() {
        // console.log('Successfully connected to the Datastreams...');
    });

}

export default MqttSubscribe;
