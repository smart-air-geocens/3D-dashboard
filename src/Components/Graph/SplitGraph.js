//This class is developed for splitting graphs 
//when we don't have any observations in a
//certain time range.
import OutlierDetector from "outlier2";
const splittedArray = (Observations) => {
    //Extracts array elements differences
    function sampling(inputArray) {
        let diffArr = [];
        for (let i = 0; i < inputArray.length - 1; i++) {
            diffArr[i] =Math.floor(Math.abs(inputArray[i + 1] - inputArray[i])/1000);
        }
        return diffArr;
    }
    try {
        let mappedTime = Observations.map(value => Number(new Date(value.time)));
        let times=Observations.map(value =>value.time); 
        let splittedArr = [];
        let diffArr = sampling(mappedTime);
        let outliersIdnex = OutlierDetector.mad(diffArr, { indexes: true });
        let outliers = OutlierDetector.mad(diffArr);
        let holder = 0;
        for (let j in outliersIdnex) {
            //Resamples differences based on first 5 values
            if (outliers[j] > (diffArr[0] + diffArr[1] + diffArr[2] + diffArr[3] + diffArr[4]) / 5) {
                Observations.splice(outliersIdnex[j] + holder+1, 0, { result: null, time: times[outliersIdnex[j]+1] });
                holder++;
            }
        }
        splittedArr = Observations;
        return splittedArr;
    } catch (e) {
        console.log(e.message)
    }
}

export default splittedArray;