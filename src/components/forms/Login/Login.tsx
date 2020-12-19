import React, { useContext } from 'react';
import * as Yup from "yup";
import { Formik, Field, Form } from "formik";
import Input from "components/general/Input/Input";
import CheckBox from "components/general/CheckBox/CheckBox";
import { LoadingButton } from "components/general/Button";
import "./Login.scss";
import callAPI from "helper/apiCall";
import { UserContext } from "context/userContext"
import { FormSceneNames } from "types";
import {ReactComponent as GoogleLogo} from "assets/images/google-logo-color.svg"; 



const validationSchema = Yup.object({
    email: Yup.string().email().required("field is required"),
    password: Yup.string().required("field is required"),
});
const fields = {
	email: "",
	password: "",
};

interface LoginProps {
    changeSceneHandler: (type: FormSceneNames, delay: number) => void,
}

const Login: React.FC<LoginProps> = ({ changeSceneHandler }) => {

    const [,dispatchUser] = useContext(UserContext);
    
    const handleLogin = async (payload: any, { setSubmitting, setErrors }: {setSubmitting: any, setErrors: any }) => {
        const { data, status, error } = await callAPI({
            url: "/login",
            method: "POST",
            setLoading: setSubmitting,
            payload
        });
        if(status === 200 && !!data) {
            const {token, user} = data;
            if(!!data.token) {
                dispatchUser({type: "LOGIN_SUCCESS", payload: { token: token, user: user.name }})
                changeSceneHandler("Close", 0)
            }
            let errorMessages: any = {};

            for (const [key] of Object.entries(fields)) {
                errorMessages[key] = data[key];
              }
            setErrors(errorMessages)
        } else {
            let errorMessages: any = {};
            for (const [key] of Object.entries(fields)) {
                errorMessages[key] = error[key];
              }
            setErrors(errorMessages)
        }

    }

    const redirectToOAuth = () => {
        const { REACT_APP_SERVER_URL } = process.env;
        const BASE_URL = REACT_APP_SERVER_URL || "http://localhost:8181";
        window.location.href=`${BASE_URL}/oauth2/authorize/google`;
    }

    const changeToRegister = () => changeSceneHandler("Register", 700)
    const changeToForgotPass = () => changeSceneHandler("Forgot Password", 700)

    return (
        <Formik
            initialValues={fields}
            validationSchema={validationSchema}
            onSubmit={handleLogin}
        >
            {({ isSubmitting, errors, isValid }) => (
                <Form className="login-form">
                    <Field
                        error={errors["email"]}
                        label="Email"
                        name="email"
                        type="text"
                        disabled={isSubmitting}
                        as={Input}
                         />
                    <Field
                        error={errors["password"]}
                        label="Password"
                        name="password"
                        type="password"
                        disabled={isSubmitting}
                        as={Input}
                     />
                     <div className="option-group">
                        <CheckBox label="remember me" />
                        <button onClick={changeToForgotPass} type="button" className="link-element">forgot password?</button>
                     </div>
                    <LoadingButton disabled={!isValid} type="submit" isLoading={isSubmitting} >
                        Login
                    </LoadingButton>
                    <button type="button" onClick={redirectToOAuth} className="oath-options-group">
                        <GoogleLogo />
                        <span>Login with Google</span>
                    </button>
                    <button type="button" className="link-element register-nav-link" onClick={changeToRegister}>
                        Don't have an account ?
                    </button>
                </Form>
            )}

        </Formik>
    )
}

export default Login
