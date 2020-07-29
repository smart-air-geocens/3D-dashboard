// This function is mainly esponsible to subscribe to all DSs exists in the selected Thing using MQTT protocol
// So, the process of subscription for all DSs exist in the Thing is automatic
import mqtt from 'mqtt'
import MqttSubscribe from "./MqttSubscribe";
import UnsubscriptionFunction from './UnsubscriptionFunction'


const MqttUnSubscribe = (datastreamInfo, clients) => {
    // console.log(datastreamInfo)
    // console.log(clients)
    Object.keys(datastreamInfo).forEach(async (key, index) => {
        if (index > 0) {
            let foundClient;
            for (let i = 0; i < clients.length; i++) {
                Object.keys(clients[i]).forEach((keyClient) => {
                    if (datastreamInfo[key] === Number(keyClient)) {
                        // console.log(datastreamInfo[key])
                        // console.log(keyClient)
                        UnsubscriptionFunction(datastreamInfo[key],clients[i][keyClient])


                    }
                })
            }
        }
    })
}

export default MqttUnSubscribe;
