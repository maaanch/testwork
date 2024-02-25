import {
  Alert,
  Box,
  Button,
  Container,
  DialogActions,
  FormControl,
  FormHelperText,
  Snackbar,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import CircularLoader from "../../Components/CircularLoader";
import { useMutation } from "@apollo/client";
import { ADD_USER, UPDATE_USER } from "../../../store/mutations/userMutations";
import { GET_USERS } from "../../../store/queries/userQueries";

const AddButtonFields = ({ setOpen, props }: any) => {
  const [showSuccess, setShowSuccess] = useState(false);

  const [openSnackbar, setOpenSnakbar] = useState(false);
  const [load, setLoad] = useState(false);
  console.log("props", props);

  const [updateClient, { loading, error }] = useMutation(UPDATE_USER, {
    refetchQueries: [{ query: GET_USERS }],
  });
  if (loading) return <CircularLoader />;
  return (
    <>
      {load && <CircularLoader />}
      <Formik
        initialValues={{
          fullName: props?.data?.name,
          email: props?.data?.email, // 'admin@silverstay.com',
          phone: props?.data?.phone, // 'admin@silverstay.com',
        }}
        validationSchema={Yup.object().shape({
          fullName: Yup.string()
            .min(3, "Too short")
            .required("Email is required"),
          email: Yup.string()
            .email("Must be a valid email")
            .max(255, "Email must be at most 255 characters")
            .required("Email is required"),
          phone: Yup.number().required("phone is required"),
        })}
        onSubmit={(values) => {
          setLoad(true);
          updateClient({
            variables: {
              id: props?.data?.id,
              name: values.fullName,
              email: values.email,
              phone: values.phone,
            },
          })
            .then(() => {
              setShowSuccess(true);
              setLoad(false);
              setOpenSnakbar(true);
              setTimeout(() => {
                setOpen(false);
              }, 2000);
            })
            .catch((rejectedValueOrSerializedError: any) => {
              console.log("error ocured here");
              setLoad(false);
              setOpenSnakbar(true);
            });
        }}
        // onSubmit={(values) => {
        //   setLoad(true);
        //   dispatch(
        //     updateEmployee({
        //       name: values.fullName,
        //       designation: values.designation,
        //       email: values.email,
        //       role: values.role,
        //       id: props.data.id,
        //     })
        //   )
        //     .unwrap()
        //     .then((originalPromiseResult: any) => {
        //       setShowSuccess(true);
        //       setLoad(false);
        //       setOpenSnakbar(true);
        //       setTimeout(() => {
        //         setOpen(false);
        //       }, 900);
        //     })
        //     .catch(() => {
        //       setLoad(false);
        //       setOpenSnakbar(true);
        //     });
        // }}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          touched,
          setFieldValue,
          values,
        }) => (
          <Container sx={{ p: 2 }}>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <FormControl fullWidth sx={{ mb: 4 }}>
                <TextField
                  error={Boolean(touched.fullName && errors.fullName)}
                  variant="standard"
                  id="outlined-adornment-fullName-add"
                  value={values.fullName}
                  name="fullName"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  label="Full Name"
                  inputProps={{}}
                  fullWidth
                />
                {touched.fullName && errors.fullName && (
                  <FormHelperText
                    error
                    id="standard-weight-helper-text-fullName-add"
                  >
                    {errors?.fullName.toString()}
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl fullWidth sx={{ mb: 4 }}>
                <TextField
                  error={Boolean(touched.email && errors.email)}
                  variant="standard"
                  id="outlined-adornment-email-add"
                  value={values.email}
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  label="Email"
                  inputProps={{}}
                />
                {touched.email && errors.email && (
                  <FormHelperText
                    error
                    id="standard-weight-helper-text-email-add"
                  >
                    {errors.email.toString()}
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl fullWidth sx={{ mb: 4 }}>
                <TextField
                  error={Boolean(touched.phone && errors.phone)}
                  variant="standard"
                  id="outlined-adornment-phone-add"
                  type="text"
                  value={values.phone}
                  name="phone"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  label="phone"
                  inputProps={{}}
                  fullWidth
                />
                {touched.phone && errors.phone && (
                  <FormHelperText
                    error
                    id="standard-weight-helper-text-phone-add"
                  >
                    {errors?.phone?.toString()}
                  </FormHelperText>
                )}
              </FormControl>
              <Snackbar
                open={openSnackbar}
                autoHideDuration={1400}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                onClose={() => setOpenSnakbar(false)}
              >
                <Alert
                  onClose={() => setOpenSnakbar(false)}
                  severity={showSuccess ? "success" : "error"}
                  sx={{ width: "100%" }}
                >
                  {showSuccess
                    ? "Employee updated successfully"
                    : "Employee Cannot be updated"}
                </Alert>
              </Snackbar>
              <DialogActions>
                <Button
                  onClick={() => setOpen(false)}
                  variant="outlined"
                  color="error"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disableElevation
                  disabled={isSubmitting}
                  variant="outlined"
                >
                  Update
                </Button>
              </DialogActions>
            </Box>
          </Container>
        )}
      </Formik>
    </>
  );
};

export default AddButtonFields;
