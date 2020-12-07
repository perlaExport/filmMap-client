import React from 'react';
import * as Yup from "yup";
import { Formik, Field, Form } from "formik";
import Input from "components/general/Input/Input";
import "./Register.scss";
import {LoadingButton} from "components/general/Button";

const validationSchema = Yup.object({
    email: Yup.string().email().required("field is required"),
    password: Yup.string().min(5, "must be at least 5 characters").required("field is required"),
    matchPassword: Yup.string()
        .oneOf([Yup.ref("password")], "password does not match")
        .required("Password confirm is required"),
});
const fields = {
	email: "",
	password: "",
	matchPassword: "",
};

const Register: React.FC = () => {
    
    const handleRegister = (data: any, { setSubmitting }: {setSubmitting: any}) => {
        setSubmitting(true);
        setTimeout(() => {
            console.log({ data });
            setSubmitting(false);
        }, 2000);
    }

    return (
        <Formik
            initialValues={fields}
            validationSchema={validationSchema}
            onSubmit={handleRegister}
        >
            {({ isSubmitting, errors }) => (
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
                        error={errors["password"]}
                        label="Password"
                        name="password"
                        type="password"
                        disabled={isSubmitting}
                        as={Input}
                     />
                    <Field
                        error={errors["matchPassword"]}
                        label="Repeat password"
                        name="matchPassword"
                        type="password"
                        disabled={isSubmitting}
                        as={Input}
                     />
                    <LoadingButton type="submit" isLoading={isSubmitting} >
                        Register
                    </LoadingButton>
                </Form>
            )}

        </Formik>
    )
}

export default Register
