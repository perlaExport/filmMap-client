import React, { useState } from "react";
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

const CommentInput: React.FC<CommentInputPorps> = ({ movieId, userReview }) => {
  const [isReviewed, setIsReviewed] = useState<boolean>(userReview !== "");

  const submitReview = async (payload: any, { setSubmitting }: { setSubmitting: any }) => {
    const { status } = await callAPI({
      url: `/movie/${movieId}/review`,
      method: "PUT",
      token: true,
      setLoading: setSubmitting,
      payload: {
        review: payload.comment,
      },
    });
    if (status === 200 && !isReviewed) setIsReviewed(true);
  };

  const removeReview = async () => {
    const shouldRemooveReview = window.confirm("Are you sure you want to remove your review?");
    if (shouldRemooveReview) {
      const { status } = await callAPI({
        url: `/movie/${movieId}/delete_review`,
        method: "DELETE",
        token: true,
      });
      if (status === 200) setIsReviewed(false);
    }
  };

  return (
    <Formik
      initialValues={{ comment: userReview }}
      validationSchema={validationSchema}
      onSubmit={submitReview}>
      {({ isSubmitting, errors, isValid }) => (
        <Form className="review-input">
          <div className="button-group">
            {isReviewed && (
              <button type="button" onClick={removeReview} className="link-element remove-review">
                Remove review
              </button>
            )}
            <LoadingButton disabled={!isValid} type="submit" isLoading={isSubmitting}>
              {isReviewed ? "Update" : "Submit"}
            </LoadingButton>
          </div>

          <Field
            error={errors["comment"]}
            name="comment"
            type="text"
            disabled={isSubmitting}
            placeholder="You opinion about the movie..."
            as="textarea"
          />
        </Form>
      )}
    </Formik>
  );
};

export default CommentInput;
