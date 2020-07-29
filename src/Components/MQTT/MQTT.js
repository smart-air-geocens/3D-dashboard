// This function is mainly esponsible to subscribe to all DSs exists in the selected Thing using MQTT protocol
// So, the process of subscription for all DSs exist in the Thing is automatic
import mqtt from 'mqtt'
import React from "react";
import MqttSubscribe from './MqttSubscribe'
import MqttUnSubscribe from './MqttUnSubscribe'


const MQTT = async (datastreamInfo,updatingFunction,sensorKitInfo,updatingClients) => {

    Object.keys(datastreamInfo).forEach(async (key,index) => {
        if(index > 0){
            MqttSubscribe(key,datastreamInfo[key],sensorKitInfo,updatingFunction,updatingClients)
        }
    })
}
export default MQTT;
