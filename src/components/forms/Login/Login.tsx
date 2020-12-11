import React from 'react';
import * as Yup from "yup";
import { Formik, Field, Form } from "formik";
import Input from "components/general/Input/Input";
import CheckBox from "components/general/CheckBox/CheckBox";
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

interface LoginProps {
    changeFormScene: () => void
}

const Login: React.FC<LoginProps> = ({ changeFormScene }) => {
    
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
                        <button type="button" className="link-element">forgot password?</button>
                     </div>
                    <LoadingButton disabled={!isValid} type="submit" isLoading={isSubmitting} >
                        Login
                    </LoadingButton>
                    <button type="button" className="link-element register-nav-link" onClick={changeFormScene}>
                        Don't have an account ?
                    </button>
                </Form>
            )}

        </Formik>
    )
}

export default Login
