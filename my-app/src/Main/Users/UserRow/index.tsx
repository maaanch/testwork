import { Grid, TableCell, TableRow } from "@mui/material";
import React from "react";
import DeletUser from "../DeleteUser";
import EditUser from "../EditUser";
const UserRow = () => {
  // const employee = useSelector((state) => getEmployeeById(state, id));
  const employee: any = {
    id: "1",
    name: "ali",
    email: "ali",
    createdAt: "",
  };
  return (
    <>
      <TableRow hover>
        <TableCell>{employee.name}</TableCell>
        <TableCell>{employee.email}</TableCell>
        <TableCell>
          {new Date().toLocaleDateString()}
        </TableCell>
        <TableCell>
          <Grid
            container
            direction="row"
            alignItems="center"
          >
            <EditUser data={employee} />
            <DeletUser id={employee.id} />
          </Grid>
        </TableCell>
      </TableRow>
    </>
  );
};

export default UserRow;
