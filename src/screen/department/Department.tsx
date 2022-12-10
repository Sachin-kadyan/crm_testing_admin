import { Box } from "@mui/system";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React, { useEffect } from "react";
import { getDepartmentsHandler } from "../../api/department/departmentHandler";
import useServiceStore from "../../store/serviceStore";
import AddDepartment from "./widget/AddDepartment";

const Department = () => {
  const { departments } = useServiceStore();
  const columns: GridColDef[] = [
    { field: "id", headerName: "Id", width: 250 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "parent", headerName: "Parent", width: 200 },
  ];
  const rows = departments.map((item) => {
    return {
      name: item.name,
      parent: item.parent ? departments.find((dept) => dept._id === item.parent)?.name : "None",
      id: item._id,
    };
  });

  useEffect(() => {
    (async function () {
      await getDepartmentsHandler();
    })();
  }, []);

  return (
    <Box sx={{ height: "100vh" }}>
      <Box sx={{ height: "5vh" }}>
        <AddDepartment />
      </Box>
      <DataGrid columns={columns} pageSize={5} rowsPerPageOptions={[10]} rows={rows} />
    </Box>
  );
};

export default Department;
