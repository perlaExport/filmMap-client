import React from "react";
import * as Yup from "yup";
import { Formik, Field, Form } from "formik";
import Input from "components/general/Input";
import { LoadingButton } from "components/general/Button";

const validationSchema = Yup.object({
  email: Yup.string().email().required("field is required"),
});
const fields = {
  email: "",
};

const ResendLink: React.FC = () => {
  const handleChangePasswordRequest = (
    data: any,
    { setSubmitting, setErrors }: { setSubmitting: any; setErrors: any }
  ) => {
    setSubmitting(true);
    setTimeout(() => {
      console.log({ data });
      setErrors({ email: "No account with given email was found" });
      setSubmitting(false);
    }, 2000);
  };

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
};

export default ResendLink;
