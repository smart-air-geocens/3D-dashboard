const getDateTimeISO = (resultsTime) => {
    let dateTime = new Date();
    let dateTimeISO = dateTime.toISOString();
    return dateTimeISO
}
export default getDateTimeISO;
