function dateIsTuesday(date){
    newDate = new Date(date)
    dayOfWeek = newDate.getDay(); 
    if(dayOfWeek === "Tuesday") {
        return true;
    }
    return false;
}

module.exports = dateIsTuesday