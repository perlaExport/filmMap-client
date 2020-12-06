import React from 'react';
import * as Yup from "yup";
import { Formik, Field, Form } from "formik";

const validationSchema = Yup.object({
	username: Yup.string().max(25, "username is too long").required("field is required"),
	password: Yup.string().min(5, "must be at least 5 characters").required("field is required"),
});

const fields = {
	username: "",
	password: "",
};

const Login: React.FC = () => {

    const handleLogin = () => {
        console.log("loggg");
    }

    return (
        <Formik
            initialValues={fields}
            validationSchema={validationSchema}
            onSubmit={handleLogin}
        >
            {({ isSubmitting, isValid, errors }) => (
                <Form>
                    <Field
                        hasErrors={!!errors["username"]}
                        helperText={errors["username"]}
                        label="Username"
                        name="username"
                        type="text"
                         />
                    <Field
                        hasErrors={!!errors["password"]}
                        helperText={errors["password"]}
                        label="Password"
                        name="password"
                        type="password"
                     />
                    <button type="submit">Login</button>
                </Form>
            )}

        </Formik>
    )
}

export default Login
