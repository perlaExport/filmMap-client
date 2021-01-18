import React, { useState } from "react";
import * as Yup from "yup";
import { Formik, Field, Form } from "formik";
import Input from "components/general/Input";
import "./Register.scss";
import { LoadingButton } from "components/general/Button";
import callAPI from "helper/api";
// import RegistrationSuccess from "./RegistrationSuccess";
import { FormProps } from "../";
import SuccessForm from "../SuccessForm/SuccessForm";

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

const Register: React.FC<FormProps> = ({ changeSceneHandler }) => {
  const [registartionEmail, setRegistartionEmail] = useState<string>("");

  const handleRegister = async (
    payload: any,
    { setSubmitting, setErrors }: { setSubmitting: any; setErrors: any }
  ) => {
    const { data, status, error } = await callAPI({
      url: "/register",
      method: "POST",
      setLoading: setSubmitting,
      payload,
    });
    console.log(data, status, error);
    if (status === 200) {
      setRegistartionEmail(payload.email);
    } else if (!!error) setErrors({ email: error.message });
  };

  const changeSceneToLogin = () => {
    changeSceneHandler("Login", 700);
  };
  const changeSceneToResendToken = () => {
    changeSceneHandler("Resend Link", 700);
  };
  if (!!registartionEmail) {
    return (
      <SuccessForm
        message={
          <>
            <span className="successfull">Your registration was successful!</span>
            <span className="instructions">{"Activate your account using the link sent to "}</span>
            <strong className="email">{`"${registartionEmail}"`}</strong>
          </>
        }
        changeFormSceneToLogin={changeSceneToLogin}
      />
    );
  } else {
    return (
      <Formik initialValues={fields} validationSchema={validationSchema} onSubmit={handleRegister}>
        {({ isSubmitting, errors, isValid }) => (
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
            <LoadingButton disabled={!isValid} type="submit" isLoading={isSubmitting}>
              Register
            </LoadingButton>
            <button
              type="button"
              className="link-element login-nav-link"
              onClick={changeSceneToLogin}>
              Login
            </button>
            <button
              type="button"
              className="link-element login-nav-link"
              onClick={changeSceneToResendToken}>
              Resend activation link
            </button>
          </Form>
        )}
      </Formik>
    );
  }
};

export default Register;
