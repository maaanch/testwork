import {
  createAsyncThunk,
  createEntityAdapter,
  PayloadAction,
} from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import axiosAuth from "../../api/axios";

interface Employee {
  id: string;
  name: string;
  designation: string;
  email: string;
  role: string;
}

const employeeAdapter = createEntityAdapter<Employee>({
  sortComparer: (a: any, b: any) => a.createdAt.localeCompare(b.createdAt),
});

interface InitialState {
  status: string;
  error: any;
}

const initialState: InitialState = {
  status: "idle",
  error: null,
};

export const fetchAllEmployees = createAsyncThunk(
  "employees/fetchAllEmployees",
  async () => {
    try {
      const res = await axiosAuth.get("/employees", {});

      return [...res.data.data];
    } catch (error) {
      console.log("error occurred in fetching users");
      console.log(error);
      throw error;
    }
  }
);

export const addNewEmployee = createAsyncThunk(
  "employees/addNewEmployee",
  async (newEmployee: Employee) => {
    try {
      const res = await axiosAuth.post("/employees", newEmployee);

      return res.data.data;
    } catch (error) {
      console.log("error occurred in adding users");
      console.log(error);
      throw error;
    }
  }
);

export const updateEmployee = createAsyncThunk(
  "employees/updateEmployee",
  async (initialVal: Employee) => {
    try {
      const { name, designation, email, id, role } = initialVal;

      const res = await axiosAuth.put(`/employees/${id}`, {
        name,
        designation,
        email,
        role,
      });

      return res.data.data;
    } catch (error) {
      console.log("error occurred in updating users");
      console.log(error);
      throw error;
    }
  }
);

export const deleteEmployee = createAsyncThunk(
  "employees/deleteEmployee",
  async (initialVal: { id: string }) => {
    try {
      const { id } = initialVal;

      const res = await axiosAuth.delete(`/employees/${id}`);

      return id;
    } catch (error) {
      console.log("error occurred in deleting users");
      console.log(error);
      throw error;
    }
  }
);

const employeeSlice = createSlice({
  name: "attandacne",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchAllEmployees.fulfilled, (state, action) => {
      state.status = "fulfilled";
      // employeeAdapter.upsertMany(state, action.payload);
    });
    builder.addCase(fetchAllEmployees.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(fetchAllEmployees.rejected, (state, action) => {
      state.status = "rejected";
      state.error = action.error.message;
    });
    builder.addCase(addNewEmployee.fulfilled, (state, action) => {
      // employeeAdapter.addOne(state, action.payload);
    });
    builder.addCase(updateEmployee.fulfilled, (state, action) => {
      // employeeAdapter.upsertOne(state, action.payload);
    });
    builder.addCase(deleteEmployee.fulfilled, (state, action) => {
      // employeeAdapter.removeOne(state, action.payload);
    });
  },
});

export const {
  selectAll: selectAllEmployees,
  selectById: getEmployeeById,
  selectIds: selectEmployeeIds,
} = employeeAdapter.getSelectors((state: { Employee: any }) => state.Employee);

export const getEmployeeStatus = (state: { Employee: InitialState }) =>
  state.Employee.status;

export default employeeSlice.reducer;
