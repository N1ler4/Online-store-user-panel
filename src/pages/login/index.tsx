import { Formik, Form, Field, ErrorMessage } from "formik";
import { TextField, Button } from "@mui/material";
import useAuthStore from "../../store/auth";
import { loginSchema } from "@validation";
import { useNavigate } from "react-router-dom";
import "./style.css";

interface InitialValues {
  email: string;
  password: string;
}

function Index() {
  const navigate = useNavigate();
  const { signin } = useAuthStore();

  const initialValues: InitialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async (values: InitialValues) => {
    try {
      const res = await signin(values);
      if (res && res.status === 200) {
        navigate("/main");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full h-[100vh] flex gap-10 flex-col justify-center items-center bg-img">
      <h1 className="text-[46px] font-bold">Login</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={loginSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
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
              type="password"
              name="password"
              as={TextField}
              label="Password"
              placeholder="Password"
              size="small"
              style={{ width: "400px" }}
            />
            <ErrorMessage name="password" component="div" className="error" />

            <Button variant="outlined" type="submit" disabled={isSubmitting}>
              Submit
            </Button>
          </Form>
        )}
      </Formik>
      <div>
        <p className="text-center flex gap-3">
          Don't have an account?{" "}
          <span
            className="text-blue-700 cursor-pointer"
            onClick={() => navigate("/signup")}
          >
            Register
          </span>
        </p>
        <p className="text-center">
          <span
            className="text-blue-700 cursor-pointer"
          >
            Forgot Password
          </span>
        </p>
      </div>
    </div>
  );
}

export default Index;
