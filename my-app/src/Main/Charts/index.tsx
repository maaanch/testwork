import { Box, Grid } from "@mui/material";
import React from "react";
import BasicLineChart from "./LineChart";
import StackBars from "./StackBars";
import Combining from "./Combining";
import ConnectNulls from "./ConnectNulls";
import LineDataset from "./LineDataset";
import PieActiveArc from "./PieChart";
import BasicScatter from "./Scatter";
import DifferentLength from "./Line2";
import BarAnimation from "./Chart2";

const Charts = () => {
  return (
    <Grid container>
      <Grid item xs={5} sx={{ p: "40px", m: "40px" }}>
        <BasicLineChart />
      </Grid>
      <Grid item xs={5} sx={{ p: "40px", m: "40px" }}>
        <StackBars />
      </Grid>
      <Grid item xs={5} sx={{ p: "40px", m: "0px 40px" }}>
        <BarAnimation />
      </Grid>
     
      <Grid item xs={5} sx={{ p: "40px", m: "0px 40px" }}>
        <ConnectNulls />
      </Grid>
      <Grid item xs={5} sx={{ p: "40px", m: "0px 40px" }}>
        <LineDataset />
      </Grid>
      <Grid item xs={5} sx={{ p: "40px", m: "0px 40px" }}>
        <PieActiveArc />
      </Grid>
      <Grid item xs={5} sx={{ p: "40px", m: "0px 40px" }}>
        <BasicScatter />
      </Grid>
      <Grid item xs={5} sx={{ p: "40px", m: "0px 40px" }}>
        <DifferentLength />
      </Grid>
      <Grid item xs={5} sx={{ p: "40px", m: "0px 40px" }}>
        <Combining />
      </Grid>
    </Grid>
  );
};

export default Charts;
