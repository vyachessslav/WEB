import React from 'react';
import {LoadingButton} from "@mui/lab";
import {fetchRegister, setRegisterFormError} from "../../../../redux/actions";
import {connect} from "react-redux";
import UserCredentialsValidationService from "../../../../service/UserCredentialsValidationService";

const RegisterButtons = (props) => {

    return (
        <div className="register-form-buttons">
            <LoadingButton className="register-form-login-button"
                           loading={props.loading}
                           variant="outlined"
                           onClick={() => registerIfValid(props.register,
                               props.email,
                               props.password,
                               props.passwordRepeat,
                               props.setErrorMessage)}>
                Register
            </LoadingButton>
        </div>
    );

};

const registerIfValid = (registerFunction, email, password, passwordRepeat, errorMessageSetter) => {
    const emailValidationResult = UserCredentialsValidationService.validateEmail(email);
    const passwordValidationResult = UserCredentialsValidationService.validatePassword(password);
    const passwordMatchResult = UserCredentialsValidationService.validatePasswordsMatch(password, passwordRepeat);

    if (emailValidationResult !== "" || passwordValidationResult !== "") {
        errorMessageSetter(`${emailValidationResult} \n ${passwordValidationResult}`);
    } else if (!passwordMatchResult) {
        errorMessageSetter("Passwords mismatch!")
    } else {
        registerFunction(email, password);
    }
}

const mapStateToRegisterButtonsProps = (state) => {
    return {
        email: state.registerFormEmail,
        password: state.registerFormPassword,
        passwordRepeat: state.registerFormPasswordRepeat,
        loading: state.authFormIsLoading
    }
}

const mapDispatchToRegisterButtonsProps = (dispatch) => {
    return {
        register: (email, password) => {
            dispatch(fetchRegister(email, password))
        },
        setErrorMessage: (errorMessage) => {
            dispatch(setRegisterFormError(errorMessage))
        }
    }
}

export default connect(mapStateToRegisterButtonsProps, mapDispatchToRegisterButtonsProps)(RegisterButtons);