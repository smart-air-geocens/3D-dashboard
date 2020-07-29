// This function is mainly esponsible to subscribe to all DSs exists in the selected Thing using MQTT protocol
// So, the process of subscription for all DSs exist in the Thing is automatic
import mqtt from 'mqtt'
import React from "react";

const UnsubscriptionFunction = (id,client) => {

    // console.log(id)
    // console.log(client)
    // let client = mqtt.connect("wss://ucalgary-sandbox-01.sensorup.com:9443/mqtt")
    client.unsubscribe("v1.0/Datastreams(" + id + ")/Observations")
    // console.log(client)

}

export default UnsubscriptionFunction;
