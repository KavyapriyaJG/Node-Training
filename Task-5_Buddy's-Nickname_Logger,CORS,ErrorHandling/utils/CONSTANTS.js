const success = {
    SUCCESSFUL_INSERT : "Buddy added to List !",
    SUCCESSFUL_MODIFY : "Buddy Info Modified !",
    SUCCESSFUL_DELETE : "Buddy Deleted !",

    RECORD_FOUND :  "Buddy Found",
    SUCCESSFUL_FILE_MODIFICATION : "File modified successfully"

};

const failure = {
    READ_PERMISSION_DENIED : "Read permission denied",
    WRITE_PERMISSION_DENIED : "Write permission denied",

    FILE_NOT_FOUND : "File not found",

    RECORD_NOT_FOUND : "Buddy Not Found",
    NO_RECORDS :  "File has no Buddies",

    RECORD_ALREADY_PRESENT : "Buddy Already Present !"
}

module.exports = { success, failure };