import React from "react";
import "./NewPassword.scss";
import * as Yup from "yup";
import { Formik, Field, Form } from "formik";
import Input from "components/general/Input";
import { LoadingButton } from "components/general/Button";
import callAPI from "helper/api";

const validationSchema = Yup.object({
  newPassword: Yup.string().min(5, "must be at least 5 characters").required("field is required"),
  matchingPassword: Yup.string()
    .oneOf([Yup.ref("password")], "password does not match")
    .required("Password confirm is required"),
});
const fields = {
  newPassword: "",
  matchingPassword: "",
};

interface NewPasswordProps {
  userId: string;
  token: string;
}

const NewPassword: React.FC<NewPasswordProps> = ({ userId, token }) => {
  const handleChnagePassword = async (payload: any, { setSubmitting }: { setSubmitting: any }) => {
    const { data, status, error } = await callAPI({
      url: "/register",
      method: "POST",
      setLoading: setSubmitting,
      payload,
    });
    console.log(data, status, error);
  };

  return (
    <Formik
      initialValues={fields}
      validationSchema={validationSchema}
      onSubmit={handleChnagePassword}>
      {({ isSubmitting, errors, isValid }) => (
        <Form className="new-password-form">
          <h1>New password</h1>
          <Field
            error={errors["newPassword"]}
            label="New password"
            name="newPassword"
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
            Update
          </LoadingButton>
        </Form>
      )}
    </Formik>
  );
};

export default NewPassword;
