import React, { useRef, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  IconButton,
  InputAdornment,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import useAuthStore from "../../store/auth";
import { signUpSchema, verifyUpSchema } from "@validation";
import { useNavigate } from "react-router-dom";
import BasicModal, { ModalHandle } from "@modals";
import { getDataFromCookie, saveDataToCookie } from "@token-service";

interface FormValues {
  email: string;
  first_name: string;
  gender: string;
  last_name: string;
  password: string;
}

interface VerifyFormValues {
  email: any;
  otp: string;
}

const initialValues: FormValues = {
  email: "",
  first_name: "",
  gender: "",
  last_name: "",
  password: "",
};

const verifyInitialValues: VerifyFormValues = {
  email: getDataFromCookie("email"),
  otp: "",
};

const Index: React.FC = () => {
  const modalRef = useRef<ModalHandle>(null);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const { signup  , verify} = useAuthStore();

  const handleSubmit = async (values: FormValues) => {
    try {
      const response = await signup(values);
      if (response && response.status === 200) {
        saveDataToCookie("email", values.email);
        if (modalRef.current) {
          modalRef.current.open();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const verifyHandleSubmit = async (values: VerifyFormValues) => {
    try {
      const response = await verify(values);
      if (response && response.status === 200) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleModalClose = () => {
    console.log("Modal closed");
  };

  return (
    <div className="w-full h-[100vh] flex gap-10 flex-col justify-center items-center bg-img">
      <h1 className="text-[46px] font-bold">Sign Up</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={signUpSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, handleChange, values }) => (
          <Form className="flex flex-col gap-5">
            <Field
              type="email"
              name="email"
              as={TextField}
              label="Email"
              placeholder="Email"
              size="small"
              style={{ width: "400px" }}
            />
            <ErrorMessage name="email" component="div" className="error" />

            <Field
              type="text"
              name="first_name"
              as={TextField}
              label="First Name"
              placeholder="First Name"
              size="small"
              style={{ width: "400px" }}
            />
            <ErrorMessage name="first_name" component="div" className="error" />

            <Field
              type="text"
              name="last_name"
              as={TextField}
              label="Last Name"
              placeholder="Last Name"
              size="small"
              style={{ width: "400px" }}
            />
            <ErrorMessage name="last_name" component="div" className="error" />

            <FormControl style={{ width: "400px" }} size="small">
              <InputLabel>Gender</InputLabel>
              <Field
                name="gender"
                as={Select}
                value={values.gender}
                onChange={handleChange}
                label="Gender"
              >
                <MenuItem value="">
                  <em>Choose Gender</em>
                </MenuItem>
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Field>
            </FormControl>
            <ErrorMessage name="gender" component="div" className="error" />

            <Field
              type={showPassword ? "text" : "password"}
              name="password"
              as={TextField}
              label="Password"
              placeholder="Password"
              size="small"
              style={{ width: "400px" }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword((prev) => !prev)}
                      edge="end"
                    >
                      {showPassword ? (
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <ErrorMessage name="password" component="div" className="error" />

            <Button variant="outlined" type="submit" disabled={isSubmitting}>
              Submit
            </Button>
          </Form>
        )}
      </Formik>
      <BasicModal
        ref={modalRef}
        modalContent={
          <div className="flex flex-col gap-5">
            <h1 className="text-[46px] font-bold text-center">Verify</h1>
            <Formik
              initialValues={verifyInitialValues}
              validationSchema={verifyUpSchema}
              onSubmit={verifyHandleSubmit}
            >
              {({ isSubmitting }) => (
                <Form className="flex flex-col gap-5">
                  <Field
                    type="text"
                    name="otp"
                    as={TextField}
                    label="Otp"
                    placeholder="Otp"
                    size="small"
                    style={{ width: "400px" }}
                  />
                  <ErrorMessage name="otp" component="div" className="error" />

                  <Button
                    variant="outlined"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Submit
                  </Button>
                </Form>
              )}
            </Formik>
          </div>
        }
        onClose={handleModalClose}
        showButton={false}
      />
    </div>
  );
};

export default Index;
