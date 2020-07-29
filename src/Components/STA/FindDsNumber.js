const RequestSTA = async (dsName,dsData) => {

    try {
        let dsNumber;
        if (dsData!=null) {
            let thingListArray = []
            for (let i = 0; i < dsData.length; i++) {
                if(dsData[i].name.toLowerCase().includes(dsName.toLowerCase()) || dsData[i].name.toLowerCase()==dsName.replace(" ", "").toLowerCase()) 
                {
                    dsNumber= i;
                }
            }
            // console.log(thingsList)
            return dsNumber;
        }

    } catch (e) {
        console.log(e.message)
    }
}

export default RequestSTA;