import React from "react";
import FooterSensorKit from "../Footer/FooterSensorKit";

const MqttHandler = (datastream, result) => {
    console.log("key: " + datastream + " Value: " + result)
    // let kit = <FooterSensorKit dataUpdated={result}/>
}

export default MqttHandler;
