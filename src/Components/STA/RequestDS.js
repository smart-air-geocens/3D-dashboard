import axios from 'axios';

const RequestDS = async (thingID) => {
    try {
        const Datastreams = await axios.get("/Things(" + thingID + ")/Datastreams");
        let obj = {};
        obj['ThingId'] = thingID;
        for (let i=0; i < Datastreams.data.value.length; i ++){
            let name = Datastreams.data.value[i].name;
            let id = Datastreams.data.value[i]['@iot.id'];
            obj[name] = id;
        }
        return obj;
    } catch (e) {
        console.log(e.message);
    }
}

export default RequestDS;
