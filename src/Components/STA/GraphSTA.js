//This component perticularly is used for pulling last 20 observations
//from the server using axios and http requests and triggered by clicking
//on a thing in the map.
import axios from 'axios';

const RequestSTA = async (ThingsID, DSIDs) => {
    try {
        const DSList = await axios.get("/Datastreams(" + DSIDs + ")/Observations?$top=20");

        const DSList_data = DSList.data;
        let DSListArray = [];
        let lengthFor;
        if (DSList_data.value.length < 20)
            lengthFor = DSList_data.value.length;
        else
            lengthFor = 20;
        if (DSList_data) {
            for (let j = 0; j < lengthFor; j++) {
                let res = DSList_data.value[j]['result'];
                let utctime = DSList_data.value[j]['phenomenonTime'];
                let jsonObject = { "result": res, "time": utctime };
                DSListArray.push(jsonObject);
            }
            return DSListArray;
        }
        //In case we are going to get all observations of a thing
        //uncomment the following and comment the previous block
        /*    const DSList_data = DSList.data;
            if (DSList_data) {
                let DSListArray = []
                for (let i = 0; i < DSList_data['@iot.count']; i++) {
                    let DSIDs = DSList_data.value[i]['@iot.id'];
                    const ObsList = await axios.get("/Datastreams("
                    + DSIDs + ")/Observations?$top=20");
                    const ObsList_data = ObsList.data;
                    if (ObsList_data) {
                        for (let j = 0; j < 20; j++) {
                            let res = ObsList_data.value[j]['result'];
                            let utctime = ObsList_data.value[j]['phenomenonTime'];
                            let jsonObject = { "result": res, "time": utctime };
                            DSListArray.push(jsonObject);
                        }
                    }
                    return DSListArray;
                }
            }*/
    } catch (e) {
        console.log(e.message);
    }
}

export default RequestSTA;
