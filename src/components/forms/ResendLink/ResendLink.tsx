import React, { useState } from "react";
import * as Yup from "yup";
import { Formik, Field, Form } from "formik";
import Input from "components/general/Input";
import { LoadingButton } from "components/general/Button";
import callAPI from "helper/api";
import RLSuccess from "./RLSuccess";

const validationSchema = Yup.object({
  email: Yup.string().email().required("field is required"),
});
const fields = {
  email: "",
};

const ResendLink: React.FC = () => {
  const [isSuccess, setSuccess] = useState<boolean>(false);

  const handleChangePasswordRequest = async (
    payload: any,
    { setSubmitting, setErrors }: { setSubmitting: any; setErrors: any }
  ) => {
    const { status, error } = await callAPI({
      url: "/register/resend_token",
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
  };
  if (isSuccess) {
    return <RLSuccess />;
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
          </Form>
        )}
      </Formik>
    );
  }
};

export default ResendLink;
