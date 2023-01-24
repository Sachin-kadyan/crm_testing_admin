import { Box, Tab, Tabs, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getConsumerTicketsHandler } from '../../../api/consumer/consumerHandler';
import useConsumerStore from '../../../store/consumerStore';
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
        value={value}
        onChange={(_, newValue: number) => setValue(newValue)}
      >
        <Tab label="History" />
        <Tab label="Create Prescription" />
      </Tabs>
      <Box>
        <TabPanel value={value} index={0}>
          {consumerHistory.map((history) => {
            return (
              <Box
                key={history._id}
                bgcolor="primary.light"
                p={1}
                borderRadius={1}
                my={0.5}
              >
                <Typography>{history.prescription.admission}</Typography>
                <Typography>{history.prescription.condition}</Typography>
                <Typography>{history.prescription.symptoms}</Typography>
                {history.prescription.medicines?.map((item) => (
                  <Typography>{item}</Typography>
                ))}
              </Box>
            );
          })}
        </TabPanel>
        <TabPanel value={value} index={1}>
          <CreatePrescription />
        </TabPanel>
      </Box>
    </Box>
  );
};

export default Consumer;
