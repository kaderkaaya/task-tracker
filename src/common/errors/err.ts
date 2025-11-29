export const AppErrors = {
    EXISTING_USER: {
        statusCode: 706,
        message: 'This user already exists'
    },
    PASSWORD_ERROR: {
        statusCode: 102,
        message: `The password must meet the following requirements:
                         - At least 1 lowercase letter
                         - At least 1 uppercase letter
                         - At least 1 number
                         - At least 1 special character (@.#$!%*?&)
                         - At least 8 characters long`
    },
    EMAIL_ERROR: {
        statusCode: 103,
        message: 'Your email address is invalid'
    },
    PASS_ERROR: {
        statusCode: 104,
        message: 'Your password  is wrong'
    },
    USER_ERROR: {
        statusCode: 105,
        message: 'Invalid User'
    },
    TASK_ERROR: {
        statusCode: 709,
        message: 'Invalid task'
    },
    DATE_ERROR: {
        statusCode: 107,
        message: 'Date error'
    },
    AUTH_ERROR: {
        statusCode: 403,
        message: 'auth error'
    },
    TOKEN_ERROR: {
        statusCode: 401,
        message: 'invalid token'
    },
}