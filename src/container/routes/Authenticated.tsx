import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from '../../screen/dashboard/Dashboard';
import Department from '../../screen/department/Department';
import Doctor from '../../screen/doctor/Doctor';
import Ticket from '../../screen/ticket/Ticket';
import DashboardLayout from '../layout/Layout';
import DepartmentLayout from '../layout/DepartmentLayout';
import TicketLayout from '../layout/Ticket';
import Services from '../../screen/services/Services';
import Wards from '../../screen/wards/Wards';

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
        <Route path="ticket" element={<TicketLayout />}>
          <Route index element={<Ticket />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default Authenticated;
