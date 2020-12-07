import React from 'react';
import * as Yup from "yup";
import { Formik, Field, Form } from "formik";
import Input from "components/general/Input/Input";
import { LoadingButton } from "components/general/Button";
import "./Login.scss";

const validationSchema = Yup.object({
    email: Yup.string().email().required("field is required"),
    password: Yup.string().required("field is required"),
});
const fields = {
	email: "",
	password: "",
};

const Login: React.FC = () => {
    
    const handleLogin = (data: any, { setSubmitting }: {setSubmitting: any}) => {
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
            onSubmit={handleLogin}
        >
            {({ isSubmitting, errors }) => (
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
                    <LoadingButton type="submit" isLoading={isSubmitting} >
                        Login
                    </LoadingButton>
                </Form>
            )}

        </Formik>
    )
}

export default Login
