const success = {
    VALID_INPUT : "Valid Input Data",

    RECORD_FOUND :  "Record Found",
    SUCCESSFUL_INSERT : "Record added to List !",
    SUCCESSFUL_MODIFY : "Record Info Modified !",
    SUCCESSFUL_DELETE : "Record Deleted !",
    SUCCESSFUL_FILE_MODIFICATION : "File modified successfully",

    SUCCESSFUL_USER_SIGNUP : "User Signed up !",
    SUCCESSFUL_USER_LOGIN : "User Logged in !",

    TASK_RECORD_FOUND : "Task Found !",
    SUCCESSFUL_TASK_INSERT : "Task Added Successfully !",
    SUCCESSFUL_TASK_MODIFY : "Task Modified Successfully",
    SUCCESSFUL_TASK_DELETE : "Task Deleted Successfully",
    SUCCESSFUL_TASKS_FILTER : "Tasks Filtered Successfully",
    SUCCESSFUL_SORT : "Tasks sorted Successfully",
    SUCCESSFUL_PAGINATION : "Tasks paginated Successully",
};

const failure = {
    INVALID_INPUT : "Invalid Input Data",

    READ_PERMISSION_DENIED : "Read permission denied",
    WRITE_PERMISSION_DENIED : "Write permission denied",
    FILE_NOT_FOUND : "File not found",
    RECORD_NOT_FOUND : "Record Not Found",
    NO_RECORDS :  "File has no Records",
    USER_ALREADY_PRESENT : "User Already Signed Up!",

    UNAUTHORISED_ACCESS : "Access denied. Try with correct password !",
    USER_NOT_FOUND : "User not found. Enter right emailId or SignUp !",
    USER_LOGIN_EXPIRED : "Login Again !", //not used yet
    USER_NOT_AUTHENTICATED : "User is not authenticated to access tasks. Login Again !",

    TASK_RECORD_NOT_FOUND : "Task Not Found !",
    TASK_RECORD_ALREADY_PRESENT : "Task Already Present !",
    TASKS_NOT_FOUND : "No Tasks found for this query !",
    FAILURE_TASK_INSERT : "Task can't be added !", //no use case. not used.

    INVALID_SORT : "Tasks can be sorted only in ascending or descending order",
    ONLY_ONE_DIMENSION_SORTING : "Apply only one of title or priority or dueDate",
    FAILURE_TASKS_SORTED : "Tasks can be sorted only on title or priority or dueDate",

    NUMBER_EXPECTED : "Enter a vaild Number",
    FAILURE_PAGINATION : "Pagination failed",
    NO_OF_PAGES_EXCEEDED : "Requested pageNumber exceeds available No.of pages",
    NOT_VALID_OPERATION : "Choose a vaild operation(filter or sortBy or tasksPerPage)",

    SERVER_ERROR : "Server Error !",
}

module.exports = { success, failure };