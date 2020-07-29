// This function is mainly responsible to return the time difference as a String to show years, months, weeks, minutes interval
// between the latest obs and current time

const LatestUpdate = (difference) => {
    let d = Math.abs(difference) / 1000;  // delta

    let r = {};   // result
    let stringResults = "";

    if (d < 60){
        stringResults = "A few seconds "
    }else {
        let s = {  // structure
            year: 31536000,
            month: 2592000,
            week: 604800, // uncomment row to ignore
            day: 86400,   // feel free to add your own row
            hour: 3600,
            minute: 60
        };

        Object.keys(s).forEach(function(key){
            r[key] = Math.floor(d / s[key]);
            d -= r[key] * s[key];
        });
        let firstIndex = 0;
        Object.keys(r).forEach(function(key,index){
            let conj = "";
            if (r[key] > 0 && firstIndex === 0 ){
                firstIndex = index
            }
            if (index === firstIndex) conj = null
            else if (index === 5) conj = ", and "
            else  conj = ", "
            if(r[key] > 1 ) stringResults += conj + r[key] + " " + key + "s"
            else if (r[key] === 1 ) stringResults += conj + r[key] + " " + key
        })
    }
    return stringResults;
}
export default LatestUpdate;
