/**
 * Fetches the assigned values for Title or Priority or dueDate
 * @param {string} parameter - title || priority || dueDate
 * @param {string} item - item to which value will be fetched
 * @returns {string} - value
 */
const getValue = (parameter, item) => {
    switch (parameter) {
        case "title": return getTitleValue(item);
        case "priority": return getPriorityValue(item);
        case "dueDate": return getDateValue(item);

        default: return 0;
    }
}

//For Title
const getTitleValue = (title) => {
    return title;
}

//For Priority
const getPriorityValue = (priority) => {
    switch (priority) {
        case "high": return 3;
        case "medium": return 2;
        case "low": return 1;

        default: return 0;
    }
}

//For Date
const getDateValue = (date) => {
    return new Date(date);
}



module.exports = { getValue }