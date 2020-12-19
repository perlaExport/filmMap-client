import React, { useState } from 'react';
import * as Yup from "yup";
import { Formik, Field, Form } from "formik";
import Input from "components/general/Input/Input";
import "./Register.scss";
import {LoadingButton} from "components/general/Button";
import callAPI from "helper/apiCall";
import RegistrationSuccess from "./RegistrationSuccess";
import { FormSceneNames } from "types";


const validationSchema = Yup.object({
    email: Yup.string().email().required("field is required"),
    password: Yup.string().min(5, "must be at least 5 characters").required("field is required"),
    name: Yup.string().required("field is required"),
    matchingPassword: Yup.string()
        .oneOf([Yup.ref("password")], "password does not match")
        .required("Password confirm is required"),
});
const fields = {
    email: "",
    name: "",
	password: "",
	matchingPassword: "",
};

interface RegisterProps {
    changeSceneHandler: (type: FormSceneNames, delay: number) => void,
}

const Register: React.FC<RegisterProps> = ({ changeSceneHandler }) => {

    const [registartionEmail, setRegistartionEmail] = useState<string>("");
    
    const handleRegister = async (payload: any, { setSubmitting, setErrors }: {setSubmitting: any, setErrors: any}) => {
        const { data ,status, error } = await callAPI({
            url: "/register",
            method: "POST",
            setLoading: setSubmitting,
            payload
        });
        if(status === 200) {
            setRegistartionEmail(data.email);
        }
        else if(!!error) setErrors({ email: error});
        
    }

    const changeSceneToLogin = () => {
        changeSceneHandler("Login", 700);
    }
    if(!!registartionEmail) {
        return(
            <RegistrationSuccess email={registartionEmail} changeFormSceneToLogin={changeSceneToLogin} />
        )
    } else{
        return (
            <Formik
                initialValues={fields}
                validationSchema={validationSchema}
                onSubmit={handleRegister}
            >
                {({ isSubmitting, errors, isValid}) => (
                    <Form className="register-form">
                        <Field
                            error={errors["email"]}
                            label="Email"
                            name="email"
                            type="text"
                            disabled={isSubmitting}
                            as={Input}
                             />
                        <Field
                            error={errors["name"]}
                            label="Name"
                            name="name"
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
                        <Field
                            error={errors["matchingPassword"]}
                            label="Repeat password"
                            name="matchingPassword"
                            type="password"
                            disabled={isSubmitting}
                            as={Input}
                         />
                        <LoadingButton disabled={!isValid} type="submit" isLoading={isSubmitting} >
                            Register
                        </LoadingButton>
                        <button type="button" className="link-element login-nav-link" onClick={changeSceneToLogin}>
                            Login
                        </button>
                    </Form>
                )}
    
            </Formik>
        )
    }
}

export default Register
