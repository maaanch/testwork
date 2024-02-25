import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect } from "react";
import AddButton from "../AddButton";
import Title from "../../Components/Title";
import UserRow from "../UserRow";
import { Height } from "@mui/icons-material";

export default function UserTable() {
  // const employess = useSelector(selectEmployeeIds);
  // const employeeStatus = useSelector(getEmployeeStatus);
  // console.log(employess)
  useEffect(() => {
    // dispatch(fetchAllEmployees({}));
  }, []);

  return (
    <>
      <Container
        maxWidth="lg"
        sx={{
          mt: 10,
          mb: 4,
          height: "50vh",
          boxShadow:
            "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        }}
      >
        <Paper sx={{ p: 2 }}>
          <Title>Users</Title>
          <TableContainer sx={{ maxHeight: 560 }}>
            <Table size="small">
              <TableHead>
                <TableRow hover>
                  {/* <TableCell>DeviceId</TableCell> */}
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>CreatedAt</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                <>
                  {/* {employess.map((item) => (
                        <UserRow id={item} key={item} />
                      ))} */}
                  <UserRow />
                </>
              </TableBody>
            </Table>
          </TableContainer>
          <AddButton />
        </Paper>
      </Container>
    </>
  );
}
