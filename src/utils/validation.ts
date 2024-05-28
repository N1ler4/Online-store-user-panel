import * as Yup from "yup";

export const loginSchema = Yup.object().shape({
  email: Yup.string().min(4, "Too Short!").required("Required"),
  password: Yup.string().min(6, "Too Short!").required("Required"),
});
export const signUpSchema = Yup.object().shape({
  email: Yup.string().min(4, "Too Short!").required("Required"),
  first_name: Yup.string().required("Required"),
  gender: Yup.string().required("Required"),
  last_name: Yup.string().required("Required"),
  password: Yup.string().min(6, "Too Short!").required("Required"),
});
export const verifyUpSchema = Yup.object().shape({
  otp: Yup.string().required("Required"),
})
