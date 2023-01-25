import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Tab,
  Tabs,
  Typography
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getConsumerTicketsHandler } from '../../../api/consumer/consumerHandler';
import useConsumerStore from '../../../store/consumerStore';
import Estimate from '../../ticket/widgets/Estimate';
import CreatePrescription from '../prescription/CreatePrescription';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const Consumer = () => {
  const [value, setValue] = useState(0);
  const { consumerHistory } = useConsumerStore();
  const { id } = useParams();

  const TabPanel = (props: TabPanelProps) => {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
      >
        {value === index && <Box p={1}>{children}</Box>}
      </div>
    );
  };

  useEffect(() => {
    (async function () {
      if (id) {
        await getConsumerTicketsHandler(id);
      }
    })();
  }, []);
  return (
    <Box>
      <Tabs
        variant="fullWidth"
        value={value}
        onChange={(_, newValue: number) => setValue(newValue)}
      >
        <Tab label="History" />
        <Tab label="Prescription" />
        <Tab label="Estimate" />
      </Tabs>
      <Box>
        <TabPanel value={value} index={0}>
          {consumerHistory.map((history) => {
            return (
              <Card
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  my: 1,
                  backgroundColor: 'primary.light'
                }}
              >
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography
                      textTransform="capitalize"
                      component="div"
                      variant="h6"
                    >
                      {history.prescription.admission === null
                        ? 'No Admission '
                        : history.prescription.admission}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      color="text.secondary"
                      component="div"
                    >
                      {new Date(history.prescription.followUp).toDateString()}
                    </Typography>
                    {history.prescription !== null && (
                      <Typography
                        variant="subtitle2"
                        color="text.secondary"
                        component="div"
                      >
                        {history.prescription.service?.name}
                      </Typography>
                    )}
                    {/* <Typography textTransform="capitalize">
                      {history.prescription.condition}
                    </Typography>
                    <Typography textTransform="capitalize">
                      {history.prescription.symptoms}
                    </Typography> */}
                    {history.prescription.medicines?.map((item) => (
                      <Typography textTransform="capitalize">{item}</Typography>
                    ))}
                  </CardContent>
                </Box>
                <CardMedia
                  component="img"
                  sx={{ width: 151 }}
                  image={history.prescription.image}
                  alt="prescription image"
                />
              </Card>
            );
          })}
        </TabPanel>
        <TabPanel value={value} index={1}>
          <CreatePrescription />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Estimate />
        </TabPanel>
      </Box>
    </Box>
  );
};

export default Consumer;
