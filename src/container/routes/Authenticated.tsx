import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from '../../screen/dashboard/Dashboard';
import Department from '../../screen/department/Department';
import Doctor from '../../screen/doctor/Doctor';
import DashboardLayout from '../layout/DashboardLayout';
import DepartmentLayout from '../layout/DepartmentLayout';
import TicketLayout from '../layout/TicketLayout';
import Services from '../../screen/services/Services';
import Wards from '../../screen/wards/Wards';
import SingleTicketDetails from '../../screen/ticket/SingleTicketDetails';
import Tags from '../../screen/tags/Tags';

type Props = {};

const Authenticated = (props: Props) => {
  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="department" element={<DepartmentLayout />}>
          <Route index element={<Department />} />
          <Route path="doctors" element={<Doctor />} />
          <Route path="wards" element={<Wards />} />
        </Route>
        <Route path="services" element={<Services />} />
        <Route path="tags" element={<Tags />} />
      </Route>
      <Route path="ticket" element={<TicketLayout />}>
        <Route path=":id" element={<SingleTicketDetails />} />
      </Route>
    </Routes>
  );
};

export default Authenticated;
