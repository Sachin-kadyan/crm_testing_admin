import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from '../../screen/dashboard/Dashboard';
import Department from '../../screen/department/Department';
import Doctor from '../../screen/doctor/Doctor';
import Ticket from '../../screen/ticket/Ticket';
import DashboardLayout from '../layout/Layout';
import TicketLayout from '../layout/Ticket';

type Props = {};

const Authenticated = (props: Props) => {
  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="department">
          <Route index element={<Department />} />
          <Route path="doctor" element={<Doctor />} />
        </Route>
        <Route path="ticket" element={<TicketLayout />}>
          <Route index element={<Ticket />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default Authenticated;
