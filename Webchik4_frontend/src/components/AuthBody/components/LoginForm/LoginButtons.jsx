import React from 'react';
import {LoadingButton} from "@mui/lab";
import {fetchLogin, setLoginFormError} from "../../../../redux/actions";
import {connect} from "react-redux";
import UserCredentialsValidationService from "../../../../service/UserCredentialsValidationService";

const LoginButtons = (props) => {

    return (
        <div className="login-form-buttons">
            <LoadingButton className="login-form-login-button"
                           loading={props.loading}
                           variant="outlined"
                           onClick={() => loginIfValid(props.login, props.email, props.password, props.setErrorMessage)}>
                Login
            </LoadingButton>
        </div>
    )

};

const loginIfValid = (loginFunction, email, password, errorMessageSetter) => {
    const emailValidationResult = UserCredentialsValidationService.validateEmail(email);
    const passwordValidationResult = UserCredentialsValidationService.validatePassword(password);

    if (emailValidationResult !== "" || passwordValidationResult !== "") {
        errorMessageSetter(`${emailValidationResult} \n ${passwordValidationResult}`);
    } else {
        loginFunction(email, password);
    }
}

const mapStateToLoginButtonsProps = (state) => {
    return {
        email: state.loginFormEmail,
        password: state.loginFormPassword,
        loading: state.authFormIsLoading
    }
}

const mapDispatchToLoginButtonsProps = (dispatch) => {
    return {
        login: (email, password) => {
            dispatch(fetchLogin(email, password))
        },
        setErrorMessage: (errorMessage) => {
            dispatch(setLoginFormError(errorMessage))
        }
    }
}

export default connect(mapStateToLoginButtonsProps, mapDispatchToLoginButtonsProps)(LoginButtons);