import React from 'react';
import {TextField} from "@mui/material";
import {setRegisterFormEmail, setRegisterFormPassword, setRegisterFormPasswordRepeat} from "../../../../redux/actions";
import {connect} from "react-redux";

const RegisterFields = (props) => {

    const handleChange = (event) => {
        const {name, value} = event.target;
        switch (name) {
            case "email":
                props.setEmail(value);
                break;
            case "password":
                props.setPassword(value);
                break;
            case "passwordRepeat":
                props.setPasswordRepeat(value);
                break;
        }
    }

    return (
        <div className="register-form-fields">
            <TextField className="register-form-fields-box-field" variant="outlined" name="email" value={props.email}
                       label="Email" type="email" onChange={handleChange}/>
            <TextField className="register-form-fields-box-field" variant="outlined" name="password"
                       value={props.password} label="Password" type="password" onChange={handleChange}/>
            <TextField className="register-form-fields-box-field" variant="outlined" name="passwordRepeat"
                       value={props.passwordRepeat} label="Repeat password" type="password" onChange={handleChange}/>
        </div>
    );

};


const mapStateToRegisterFieldsProps = (state) => {
    return {
        email: state.registerFormEmail,
        password: state.registerFormPassword,
        passwordRepeat: state.registerFormPasswordRepeat,
    }
}

function mapDispatchToRegisterFieldsProps(dispatch) {
    return {
        setEmail: (email) => {
            dispatch(setRegisterFormEmail(email))
        }, setPassword: (password) => {
            dispatch(setRegisterFormPassword(password))
        }, setPasswordRepeat: (passwordRepeat) => {
            dispatch(setRegisterFormPasswordRepeat(passwordRepeat))
        }
    }
}

export default connect(mapStateToRegisterFieldsProps, mapDispatchToRegisterFieldsProps)(RegisterFields);