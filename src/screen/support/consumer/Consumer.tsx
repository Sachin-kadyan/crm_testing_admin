import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Tab,
  Tabs,
  Typography
} from '@mui/material';
import { Stack } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getConsumerTicketsHandler } from '../../../api/consumer/consumerHandler';
import { uploadAndSendEstimateHandler } from '../../../api/estimate/estimateHandler';
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

  const UploadComp = ({ id }: { id: string }) => {
    const [file, setFile] = useState<File | null>(null);
    return (
      <>
        {file ? (
          <>
            <Button
              size="small"
              variant="contained"
              onClick={() => uploadAndSendEstimateHandler(file, id)}
            >
              Send
            </Button>
            <Typography variant="caption">{file?.name}</Typography>
          </>
        ) : (
          <Button size="small" variant="contained" component="label">
            Upload Estimate
            <input
              hidden
              accept="application/pdf"
              onChange={(e) => setFile(e.target.files![0])}
              type="file"
            />
          </Button>
        )}
      </>
    );
  };

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
                    {history.prescription.medicines?.map((item: any) => (
                      <Typography textTransform="capitalize">{item}</Typography>
                    ))}
                    {history.prescription.admission !== null && (
                      <Stack spacing={1}>
                        <Link
                          to={`/consumer/${history.consumer}/estimate/${history.prescription._id}`}
                        >
                          <Button size="small" variant="contained">
                            Create Estimate
                          </Button>
                        </Link>
                        <UploadComp id={history._id} />
                      </Stack>
                    )}
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
      </Box>
    </Box>
  );
};

export default Consumer;
