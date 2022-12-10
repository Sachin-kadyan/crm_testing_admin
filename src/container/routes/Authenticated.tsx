import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../../screen/dashboard/Dashboard";
import Department from "../../screen/department/Department";
import DashboardLayout from "../layout/Dashboard";

type Props = {};

const Authenticated = (props: Props) => {
  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="department" element={<Department />} />
      </Route>
    </Routes>
  );
};

export default Authenticated;
