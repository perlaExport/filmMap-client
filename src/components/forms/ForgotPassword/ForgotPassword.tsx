import React, { useState } from "react";
import * as Yup from "yup";
import { Formik, Field, Form } from "formik";
import Input from "components/general/Input";
import { LoadingButton } from "components/general/Button";
import { FormProps } from "../";
import callAPI from "helper/api";
import SuccessForm from "../SuccessForm/SuccessForm";

const validationSchema = Yup.object({
  email: Yup.string().email().required("field is required"),
});
const fields = {
  email: "",
};

const ForgotPassword: React.FC<FormProps> = ({ changeSceneHandler }) => {
  const [isSuccess, setSuccess] = useState<boolean>(false);
  const handleChangePasswordRequest = async (
    payload: any,
    { setSubmitting, setErrors }: { setSubmitting: any; setErrors: any }
  ) => {
    const { data, status, error } = await callAPI({
      url: "/password/request",
      method: "GET",
      setLoading: setSubmitting,
      queryParams: {
        email: payload.email,
      },
    });
    if (status === 404 && !!error.message) {
      setErrors({ email: error.message });
    } else if (status === 200) {
      setSuccess(true);
    }
    console.log(data, status, error);
    // if(status === 200) {

    // }
    // setTimeout(() => {
    //   console.log({ data });
    //   setErrors({ email: "No account with given email was found" });
    //   setSubmitting(false);
    // }, 2000);
  };

  const changeSceneToLogin = () => {
    changeSceneHandler("Login", 700);
  };
  if (isSuccess) {
    return (
      <SuccessForm
        message={
          <>
            <span className="successfull">Password reset link sent!</span>
            <span className="instructions">Check your inbox</span>
          </>
        }
        changeFormSceneToLogin={changeSceneToLogin}
      />
    );
  } else {
    return (
      <Formik
        initialValues={fields}
        validationSchema={validationSchema}
        onSubmit={handleChangePasswordRequest}>
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
            <LoadingButton disabled={!isValid} type="submit" isLoading={isSubmitting}>
              Send
            </LoadingButton>
            <button
              type="button"
              className="link-element login-nav-link"
              onClick={changeSceneToLogin}>
              Login
            </button>
          </Form>
        )}
      </Formik>
    );
  }
};

export default ForgotPassword;
