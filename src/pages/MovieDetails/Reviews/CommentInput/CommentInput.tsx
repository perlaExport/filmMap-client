import React from "react";
import "./CommentInput.scss";
import { Formik, Field, Form } from "formik";
import callAPI from "helper/api";
import { LoadingButton } from "components/general/Button";
import * as Yup from "yup";

interface CommentInputPorps {
  movieId: number;
  userReview: string;
}

const validationSchema = Yup.object({
  comment: Yup.string().required("field is required"),
});
const fields = {
  comment: "",
};

const CommentInput: React.FC<CommentInputPorps> = ({ movieId, userReview }) => {
  const submitReview = async (payload: any, { setSubmitting }: { setSubmitting: any }) => {
    const { data, status, error } = await callAPI({
      url: `/movie/${movieId}/review`,
      method: "PUT",
      token: true,
      setLoading: setSubmitting,
      payload: {
        review: payload.comment,
      },
    });
    console.log(data, status, error);
  };

  const removeReview = async () => {
    const shouldRemooveReview = window.confirm("Are you sure you want to remove your review?");
    if (shouldRemooveReview) {
      const { data, status, error } = await callAPI({
        url: `/movie/${movieId}/delete_review`,
        method: "DELETE",
        token: true,
      });
      console.log(data, status, error);
    }
  };

  return (
    <Formik initialValues={fields} validationSchema={validationSchema} onSubmit={submitReview}>
      {({ isSubmitting, errors, isValid }) => (
        <Form className="review-input">
          <div className="button-group">
            <button onClick={removeReview} className="link-element remove-review">
              Remove review
            </button>
            <LoadingButton disabled={!isValid} type="submit" isLoading={isSubmitting}>
              Submit
            </LoadingButton>
          </div>

          <Field
            error={errors["comment"]}
            name="comment"
            type="text"
            disabled={isSubmitting}
            as="textarea"
          />
        </Form>
      )}
    </Formik>
  );
};

export default CommentInput;
