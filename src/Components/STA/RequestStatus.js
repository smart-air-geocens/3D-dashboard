// This function is mainly responsible forsetting the status of Device based on selected DS;
// It also returns the time difference between current time and date and the phenomenon time of the latest observation

import axios from 'axios';
import React from 'react';
import getDateTimeISO from "../DateTime/getDateTimeISO";
import LatestUpdate from "./LatestUpdate";
import Snackbar from '../Snackbar/SnackBar'

const selectedDS = "Temperature"; // Setting the selected DS to check (Online/Offline status)
const timeInterval = 2; // Setting the time interval to check the status- Hours

const RequestStatus = async (datastreamInfo, thingsInfo) => {
    let messageType = null;
    let message = null;
    let now = new Date(getDateTimeISO());
    try{
        await axios.get("https://ogc-3d-iot-pilot.sensorup.com/v1.0/Locations?$expand=Things/Datastreams/Observations($top=1)").then(response => {
            let data = response.data.value;
            data.map(Location => {
                if (Location.Things[0] && Location.Things[0].name.includes('GeoCENS')) {
                    let thingID = Location.Things[0]['@iot.id']
                    Location.Things[0].Datastreams.map(Datastream => {
                        if (Datastream.name.includes(selectedDS)) {
                            let result = Datastream.Observations[0].result;
                            let latestPhenomenonTime = new Date(Datastream.Observations[0].phenomenonTime);
                            let difference = now - latestPhenomenonTime;
                            let diffHours = Math.floor(difference / 3600e3);

                            let status;
                            if (diffHours > timeInterval)
                                status = 'offline'
                            else
                                status = 'online'
                            for (let j = 0; j < thingsInfo.length; j++) {
                                let baseThingID = thingsInfo[j]['thingID'];
                                if (thingID === baseThingID) {
                                    thingsInfo[j].thingStatus = status
                                    thingsInfo[j]['latestUpdate'] = LatestUpdate(difference) // Based on latest observation of Battery DS returns a String showing the latest update time
                                }
                            }
                        }
                    })
                }
            })
        })

        return {thingsInfo,messageType,message}
    }catch (e) {
        message = e.message
        messageType = "FAILURE"
        return {thingsInfo,messageType,message}
    }

}

export default RequestStatus;
