
const fetchARecord = async (content, index )=>{
    allBuddyData = JSON.parse(content);
    
    found = false;
    allBuddyData.forEach((buddyData) => {
        if (buddyData.empId == index) {
            found = true;
            record =  buddyData;
        }
    }
    );
    if (!found)
        record = "Buddy not found !";

    return record;
}

module.exports = { fetchARecord };