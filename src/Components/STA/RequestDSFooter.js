//This class is specifically desined for getting datastream infos for
//footer components
import axios from 'axios';

const RequestDS = async (thingID) => {
    let messageType = null;
    let message = null;
    let dsFooter = [];
    try {
        const Datastreams = await axios.get("/Things(" + thingID + ")/Datastreams");

        for (let i=0; i < Datastreams.data.value.length; i ++){
            let obj={};
            let name = Datastreams.data.value[i].name.split(":")[1];
            let id = Datastreams.data.value[i]['@iot.id'];
            let descp = Datastreams.data.value[i]['description'];
            let uom = Datastreams.data.value[i]['unitOfMeasurement']['symbol'];
            obj['name'] = name;
            obj['id'] = id;
            obj['description']=descp;
            obj['uom']=uom;
            dsFooter.push(obj);
        }
        return {dsFooter,messageType,message};
    } catch (e) {
        message = e.message
        messageType = "FAILURE"
        return {dsFooter,messageType,message}
    }
}

export default RequestDS;
