import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import Details from "@mui/icons-material/Details";

export default function UserDetail(props: any) {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Tooltip title="Detail">
        <IconButton
          color="primary"
          aria-label="detail"
          onClick={() => setOpen(true)}
        >
          <Details />
        </IconButton>
      </Tooltip>
      <Dialog open={open} onClose={handleClose} fullWidth={true}>
        <DialogTitle color="primary">Employee Details</DialogTitle>
        <Box
          sx={{
            bgcolor: "background.paper",
            p: "30px",
            m: "30px",
            display:'flex',
            flexDirection:'column',
            gap:'20px'
          }}
        >
        
          <Typography variant="body2" component="div">
            <strong>Name:</strong> {props.data.name}
          </Typography>
          <Typography variant="body2" component="div">
            <strong>Email:</strong> {props.data.email}
          </Typography>
          <Typography variant="body2" component="div">
            <strong>Phone:</strong> {props.data.phone}
          </Typography>
        </Box>
        <Button onClick={handleClose}>Close</Button>

      </Dialog>
    </>
  );
}
