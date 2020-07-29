//This component is used for every queries for a time range
//including datepicker, dropdown, move(left|right), lastDate
import axios from 'axios';

const RequestSTA = async (DSIDs, Date_from, Date_to) => {

    try {
        const ObsList = await axios.get("/Datastreams("
            + DSIDs + ")/Observations?$top=2000&$filter=phenomenonTime ge "
            + Date_from + " and phenomenonTime le " + Date_to + "&#top=2000");
        const ObsList_data = ObsList.data;
        let DSListArray = [];
        if (ObsList_data) {
            for (let j in ObsList_data.value) {
                let res = ObsList_data.value[j]['result'];
                let utctime = ObsList_data.value[j]['phenomenonTime'];
                let jsonObject = { "result": res, "time": utctime };
                DSListArray.push(jsonObject);
            }
        }
        return DSListArray;
    }
    catch (e) {
        console.log(e.response)
        alert(e.message)
    }
}

export default RequestSTA;