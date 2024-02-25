import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DeleteIcon from "@mui/icons-material/Delete";
import { Alert, IconButton, Snackbar, Tooltip } from "@mui/material";
import { useMutation } from "@apollo/client";
import { DELETE_USER } from "../../../store/mutations/userMutations";
import { GET_USERS } from "../../../store/queries/userQueries";

export default function DeletUser(props: any) {
  const [open, setOpen] = React.useState(false);
  const [showSuccess, setShowSuccess] = React.useState(false);
  const [openSnackbar, setOpenSnakbar] = React.useState(false);
  const [deleteClient] = useMutation(DELETE_USER, {
    variables: { id: props.id },
    refetchQueries: [{ query: GET_USERS }],
    // update(cache, { data: { deleteClient } }) {
    //   const { clients } = cache.readQuery({ query: GET_CLIENTS });
    //   cache.writeQuery({
    //     query: GET_CLIENTS,
    //     data: {
    //       clients: clients.filter((client) => client.id !== deleteClient.id),
    //     },
    //   });
    // },
  });
  // const dispatch = useDispatch();
  const handleDelete = () => {
    deleteClient()
      .then((originalPromiseResult: any) => {
        console.log("deleted");
        setShowSuccess(true);
        setOpenSnakbar(true);
        setTimeout(() => {
          console.log("close now");
          setOpen(false);
        }, 2000);
      })
      .catch((rejectedValueOrSerializedError: any) => {
        setShowSuccess(false);
        setOpenSnakbar(true);
      });
  };

  // const handleDelete = () => {
  //   dispatch(
  //     deleteEmployee({
  //       id: props.id,
  //     })
  //   )
  //     .then((originalPromiseResult: any) => {
  //       console.log("deleted");
  //       setShowSuccess(true);
  //       setOpenSnakbar(true);
  //       setTimeout(() => {
  //         console.log("close now");
  //         setOpen(false);
  //       }, 2000);
  //     })
  //     .catch((rejectedValueOrSerializedError: any) => {
  //       setShowSuccess(false);
  //       setOpenSnakbar(true);
  //     });
  // };
  return (
    <div>
      <Tooltip title="Delete">
        <IconButton aria-label="edit" onClick={() => setOpen(true)}>
          <DeleteIcon sx={{ color: "#b90505;" }} />
        </IconButton>
      </Tooltip>
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Delete Employee</DialogTitle>
        <DialogContent>
          <Snackbar
            open={openSnackbar}
            autoHideDuration={1000}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            onClose={() => setOpenSnakbar(false)}
          >
            <Alert
              onClose={() => setOpenSnakbar(false)}
              severity={showSuccess ? "success" : "error"}
              sx={{ width: "100%" }}
            >
              {showSuccess
                ? "Employee deleted successfully"
                : "Employee Cannot be deleted"}
            </Alert>
          </Snackbar>

          <DialogContentText id="alert-dialog-description">
            Are you sure to delete this employee ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} variant="outlined">
            Cancel
          </Button>

          <Button variant="outlined" onClick={handleDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
