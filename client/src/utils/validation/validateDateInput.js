const moment = require("moment");

export default (fromDate, endDate) => {
    let errors = {}

    if (!moment(endDate).isAfter(moment(fromDate))) {
        errors.endDate = "End date must be after from date";
    }

    if (!moment(fromDate).isValid()) {
        errors.fromDate = "Invalid from date";
    }
    if (!moment(endDate).isValid()) {
        errors.endDate = "Invalid end date";
    }
    return errors
}