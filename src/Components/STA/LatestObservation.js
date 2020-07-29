import axios from 'axios';

const sortObject = (unorderedObject) => {
    let orderedObject = {};

    Object.keys(unorderedObject).sort((key1) => {
        if (unorderedObject[key1] === null) return +1
        else return -1

    }).forEach(key => {
        orderedObject[key] = unorderedObject[key];
    });

    return orderedObject

}

const sortDSList = (orderedObservations, unorderedDSList) => {
    let orderedDSList = [];

    Object.keys(orderedObservations).forEach(key => {
        for (let i=0 ; i < unorderedDSList.length; i++){
            if(unorderedDSList[i]["name"] === key){
                orderedDSList.push(unorderedDSList[i])
            }
        }
    })

    return orderedDSList;

}

const LatestObservation = async (ThingDatastreams) => {
    let HttpLatestObservations = {}
    let dsList = []
    let messageType = null;
    let message = null;
    try {
        await axios.get("Things(" + ThingDatastreams['ThingId'] + ")?$expand=Datastreams/Observations($top=1)").then(response => {

            response.data.Datastreams.map(Datastream => {
                let latestObs;
                if (Datastream.Observations) {
                    if (Datastream.Observations.length > 0) latestObs = Math.floor(Datastream.Observations[0].result)
                    else latestObs = null
                    let key = Datastream.name.split(":")[1];
                    let index = Datastream['@iot.id'];
                    dsList.push({name: key, key: index})
                    HttpLatestObservations[key] = latestObs
                }
            })
        })

        HttpLatestObservations = await sortObject(HttpLatestObservations); // To sort DSs and push back DSs with null observation
        dsList = await sortDSList(HttpLatestObservations,dsList); // Sorting DSs' list based on those DSs that have observations and pull others back
        return {HttpLatestObservations, dsList,messageType,message};
    } catch (e) {
        message = e.message
        messageType = "FAILURE"
        return {HttpLatestObservations, dsList,messageType,message}
    }
}

export default LatestObservation;
