import { DownloadForOfflineOutlined } from '@mui/icons-material';
import { Box, IconButton, Tooltip } from '@mui/material';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { getDepartmentsHandler } from '../../../api/department/departmentHandler';
import { getDoctorsHandler } from '../../../api/doctor/doctorHandler';
import { getTicketHandler } from '../../../api/ticket/ticketHandler';
import useServiceStore from '../../../store/serviceStore';
import useTicketStore from '../../../store/ticketStore';
import Papa from 'papaparse';
import FileSaver from 'file-saver';
import { ageSetter } from '../../../utils/ageReturn';

type Props = {};

const DownloadAllTickets = (props: Props) => {
  const { doctors, departments } = useServiceStore();

  const doctorSetter = (id: string) => {
    return doctors.find((element) => element._id === id)?.name;
  };

  const departmentSetter = (id: string) => {
    return departments.find((element) => element._id === id)?.name;
  };
  //   const [ticketsData, setTicketsData] = useState([
  //     {
  //       name: '',
  //       uhid: '',
  //       phone: '',
  //       age: '',
  //       department: '',
  //       doctor: '',
  //       admissionType: '',
  //       serviceName: '',
  //       diagnostics: '',
  //       followUpDate: '',
  //       prescriptionCreatedAt: '',
  //       prescriptionLink: ''
  //     }
  //   ]);

  useEffect(() => {
    (async function () {
      await getTicketHandler();
      await getDoctorsHandler();
      await getDepartmentsHandler();
    })();
  }, []);

  const { tickets } = useTicketStore();
  const downloadData = async () => {
    const data = tickets.map((ticket, index) => {
      return {
        serialNo: index + 1,
        firstName: ticket.consumer[0].firstName,
        lastName: ticket.consumer[0].lastName && ticket.consumer[0].lastName,
        uhid: ticket.consumer[0].uid,
        gender: ticket.consumer[0].gender,
        phone: ticket.consumer[0].phone,
        age: ageSetter(ticket.consumer[0].dob),
        department: departmentSetter(ticket.prescription[0].departments[0]),
        doctor: doctorSetter(ticket.prescription[0].doctor),
        admissionType: ticket.prescription[0].admission
          ? ticket.prescription[0].admission
          : 'Not Advised',
        serviceName: ticket.prescription[0].service
          ? ticket.prescription[0].service.name
          : 'No Advised',
        diagnostics: ticket.prescription[0].diagnostics[0],
        followUpDate: ticket.prescription[0].followUp
          ? dayjs(ticket.prescription[0].followUp).format('DD/MMM/YYYY')
          : 'No Follow Up',
        prescriptionCreatedAt: ticket.prescription[0].createdAt,
        prescriptionLink: ticket.prescription[0].image
      };
    });
    const csv = Papa.unparse(data);
    const csvBlob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    FileSaver.saveAs(
      csvBlob,
      `${dayjs(new Date()).format('DD:MM:YY')}Data.csv`
    );
  };

  return (
    <Box>
      <Tooltip title="Download All Data">
        <IconButton onClick={downloadData}>
          <DownloadForOfflineOutlined />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default DownloadAllTickets;
