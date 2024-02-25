import { Grid, TableCell, TableRow } from "@mui/material";
import React from "react";
import DeletUser from "../DeleteUser";
import EditUser from "../EditUser";
import { DELETE_USER } from "../../../store/mutations/userMutations";
import { useMutation } from "@apollo/client";
import { GET_USERS } from "../../../store/queries/userQueries";
import UserDetail from "../UserDetail";
const UserRow = ({ client }: any) => {
  // const employee = useSelector((state) => getEmployeeById(state, id));

  console.log("client", client);
  return (
    <>
      <TableRow hover>
        <TableCell>{client.name}</TableCell>
        <TableCell>{client.email}</TableCell>
        <TableCell>{client.phone}</TableCell>
        <TableCell>
          <Grid container direction="row" alignItems="center">
            <UserDetail data={client} />
            <EditUser data={client} />
            <DeletUser id={client.id} />
          </Grid>
        </TableCell>
      </TableRow>
    </>
  );
};

export default UserRow;
