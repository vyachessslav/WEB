const UserCredentialsValidationService = {
    validateEmail: (email) => {

        if (email === null || email === "") {
            return "Email field should not be empty!"
        }

        if (!validateEmailFormat(email)) {
            return "Email provided in bad format!"
        }

        return "";

    },
    validatePassword: (password) => {

        if (password === null || password === "") {
            return "Password field should not be empty!"
        }

        if (password.length < 5) {
            return "Password should be longer then 5 symbols!"
        }

        if (password.length > 20) {
            return "Password should be shorter then 20 symbols!"
        }

        return "";

    },

    validatePasswordsMatch: (password, passwordRepeat) => {

        return password === passwordRepeat;

    }
}

const validateEmailFormat = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
}

export default UserCredentialsValidationService;