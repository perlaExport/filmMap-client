import React, { useContext } from "react";
import * as Yup from "yup";
import { Formik, Field, Form } from "formik";
import Input from "components/general/Input";
import { LoadingButton } from "components/general/Button";
import "./Login.scss";
import callAPI from "helper/api";
import { UserContext } from "context/UserContext";
import { FormProps } from "../";
import OAuthLogin from "./OAuthLogin";
import { processErros } from "helper/formUtils";

const validationSchema = Yup.object({
  email: Yup.string().email().required("field is required"),
  password: Yup.string().required("field is required"),
});
const fields = {
  email: "",
  password: "",
};

const Login: React.FC<FormProps> = ({ changeSceneHandler }) => {
  const [, dispatchUser] = useContext(UserContext);

  const handleLogin = async (
    payload: any,
    { setSubmitting, setErrors }: { setSubmitting: any; setErrors: any }
  ) => {
    const { data, status, error } = await callAPI({
      url: "/login",
      method: "POST",
      setLoading: setSubmitting,
      payload,
    });
    if (status === 200 && !!data) {
      const { token, user } = data;
      if (!!data.token) {
        dispatchUser({
          type: "LOGIN_SUCCESS",
          payload: { token: token, user: user.name },
        });
        changeSceneHandler("Close", 0);
      }
    } else if (status === 400 && !!error.message) {
      window.alert(error.message);
    } else {
      setErrors(processErros(fields, error));
    }
  };

  const changeToRegister = () => changeSceneHandler("Register", 700);
  const changeToForgotPass = () => changeSceneHandler("Forgot Password", 700);

  return (
    <Formik initialValues={fields} validationSchema={validationSchema} onSubmit={handleLogin}>
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
            <button onClick={changeToForgotPass} type="button" className="link-element">
              forgot password?
            </button>
          </div>
          <LoadingButton disabled={!isValid} type="submit" isLoading={isSubmitting}>
            Login
          </LoadingButton>
          <OAuthLogin />
          <button
            type="button"
            className="link-element register-nav-link"
            onClick={changeToRegister}>
            Don't have an account ?
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default Login;
