import axios from 'axios';
import React from 'react'
import Snackbar from '../Snackbar/SnackBar'
import getDateTimeISO from "../DateTime/getDateTimeISO";

const renderMessages = (message,type) => {
    return <Snackbar messageType={type} message={message}/>
}

const RequestSTA = async () => {
    let thingListArray = [];
    let datastreamInfo = [];
    let messageType = null;
    let message = null;
    try {
        const thingsList = await axios.get("/Locations?$expand=Things/Datastreams");
        if(thingsList.data){
            let data = thingsList.data.value;


            for (let i = 0; i < data.length; i++) {
                if (data[i].Things[0] && data[i].Things[0].name.includes('GeoCENS')) {



                    let thingID = data[i].Things[0]['@iot.id']
                    let long = Number(data[i].location.coordinates[0]);
                    let lat = Number(data[i].location.coordinates[1]);
                    let thingName = data[i].Things[0].name
                    let thingDescription = data[i].Things[0].description
                    let jsonObject = {
                        "thingID": thingID,
                        "thingStatus": "offline",
                        "thingName": thingName,
                        "thingDescription": thingDescription,
                        "longitude": long,
                        "latitude": lat
                    }
                    thingListArray.push(jsonObject);
                    let obj = {};
                    obj['ThingId'] = thingID;
                    for (let j=0; j < data[i].Things[0].Datastreams.length ; j++){
                        let name = data[i].Things[0].Datastreams[j].name.split(":")[1];
                        let id = data[i].Things[0].Datastreams[j]['@iot.id'];
                        obj[name] = id;
                    }
                    datastreamInfo.push(obj);
                }
            }
            messageType = "SUCCESS";
            message = "Data is successfully uploaded";

            return {thingListArray,datastreamInfo,messageType,message}
        }
    } catch (e) {
        message = e.message
        messageType = "FAILURE"
        return {thingListArray,datastreamInfo,messageType,message}
    }
}
export default RequestSTA;
