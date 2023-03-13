import React from 'react';
import {TextField} from "@mui/material";
import {setLoginFormEmail, setLoginFormPassword} from "../../../../redux/actions";
import {connect} from "react-redux";

const LoginFields = (props) => {

    const handleChange = (event) => {
        const {name, value} = event.target;
        switch (name) {
            case "email":
                props.setEmail(value);
                break;
            case "password":
                props.setPassword(value);
                break;
        }
    }

    return (
        <div className="login-form-fields">
            <TextField className="login-form-fields-box-field"
                       variant="outlined"
                       name="email"
                       value={props.email}
                       label="Email"
                       type="email"
                       onChange={handleChange}/>
            <TextField className="login-form-fields-box-field"
                       variant="outlined"
                       name="password"
                       value={props.password}
                       label="Password"
                       type="password"
                       onChange={handleChange}/>
        </div>
    )

};

const mapStateToLoginFieldsProps = (state) => {
    return {
        email: state.loginFormEmail, password: state.loginFormPassword
    }
}

const mapDispatchToLoginFieldsProps = (dispatch) => {
    return {
        setEmail: (email) => {
            dispatch(setLoginFormEmail(email))
        }, setPassword: (password) => {
            dispatch(setLoginFormPassword(password))
        }
    }
}

export default connect(mapStateToLoginFieldsProps, mapDispatchToLoginFieldsProps)(LoginFields);