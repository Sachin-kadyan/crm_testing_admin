import { Add, AddCircle, Label, Search } from '@mui/icons-material';
import {
  Autocomplete,
  Box,
  Button,
  Chip,
  Drawer,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { useEffect, useState } from 'react';
import { getAllServicesHandler } from '../../../api/service/serviceHandler';
import { getWardsHandler } from '../../../api/ward/wardHandler';
import { useServiceGetter } from '../../../hooks/useServiceGetter';
import useServiceStore from '../../../store/serviceStore';
import {
  iEstimate,
  iService,
  IWard,
  serviceAdded
} from '../../../types/store/service';

type Props = {};

const drawerWidth = 1200;

const Estimate = (props: Props) => {
  useEffect(() => {
    (async function () {
      await getAllServicesHandler();
      await getWardsHandler();
    })();
  }, []);

  const [estimateFileds, setEstimateFields] = useState<iEstimate>({
    type: 1,
    isEmergency: false,
    wardDays: 0,
    icuDays: 0,
    icuType: '',
    paymentType: 0,
    insuranceCompany: '',
    insurancePolicyNumber: '',
    insurancePolicyAmount: 0,
    service: [],
    investigationAmount: 0,
    procedureAmount: 0,
    medicineAmount: 0,
    equipmentAmount: 0,
    bloodAmount: 0,
    additionalAmount: 0,
    prescription: '',
    ticket: ''
  });

  const [serviceObject, setServiceObject] = useState<serviceAdded>({
    id: '',
    isSameSite: false
  });

  const [clickedIndex, setClickedIndex] = useState<number | undefined>();

  const { services, wards } = useServiceStore();

  const serviceProps = {
    options: services,
    getOptionLabel: (option: iService) => option.name
  };

  const handleServiceType = (e: number) => {
    setClickedIndex(e);
    setEstimateFields({ ...estimateFileds, type: e });
  };

  const addServiceToArray = () => {
    setEstimateFields({
      ...estimateFileds,
      service: [...estimateFileds.service, serviceObject]
    });
    setServiceObject({
      id: '',
      isSameSite: false
    });
  };

  const deleteService = (index: number) => {
    const updatedServices = estimateFileds.service.splice(index, 0);
    console.log(updatedServices);
    setEstimateFields({ ...estimateFileds, service: updatedServices });
  };

  const serviceGetter = (id: string | undefined) => {
    return services.find((element) => element._id === id)?.name;
  };

  return (
    <div>
      <Button variant="contained" endIcon={<Add />}>
        Create Estimate
      </Button>
      <Drawer
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth
          }
        }}
        anchor="right"
        open
      >
        <Box
          height="10vh"
          p={1}
          borderBottom={0.5}
          bgcolor="white"
          borderLeft={0.5}
          borderColor="#F0F0F0"
          display="flex"
          alignItems="center"
          position={'sticky'}
          top={0}
          zIndex={2}
        >
          <Typography variant="h5" fontWeight="bold">
            Create Estimate
          </Typography>
        </Box>
        <Stack direction="row" height={'100vh'} overflow="hidden">
          <Box width="30%" position="static" sx={{ offsetDistance: '10vh' }}>
            <img
              src="https://images.ctfassets.net/aj9z008chlq0/7l0trYEJH9HyxUj8qYjuAm/09ebc15ce9b94db1b349aa4dfbfbc8cf/elasticTemplateExample.png?w=495&h=1049&q=50&fm=png"
              style={{ maxHeight: '95vh' }}
              alt="prescription"
            />
          </Box>
          <Box
            bgcolor="#f1f5f7"
            width="70%"
            p={1}
            height="90vh"
            overflow="scroll"
          >
            <Box my={1} bgcolor="white" borderRadius={3} p={1}>
              <Typography fontWeight={500} my={1}>
                Select Service Type
              </Typography>
              <Stack direction="row" spacing={2}>
                {[
                  { name: 'Package', value: 0 },
                  { name: 'Non Package', value: 1 }
                ].map((item: any, index: number) => {
                  return (
                    <Chip
                      key={index}
                      label={item.name}
                      color="primary"
                      variant={
                        clickedIndex === item.value ? 'filled' : 'outlined'
                      }
                      onClick={() => handleServiceType(item.value)}
                    />
                  );
                })}
              </Stack>
            </Box>
            <Box my={1} bgcolor="white" borderRadius={3} p={1}>
              <Typography fontWeight={500} my={1}>
                Ward Details
              </Typography>
              <Stack direction="row" spacing={2}>
                <FormControl fullWidth size="small">
                  <InputLabel id="demo-simple-select-label">
                    ICU Type
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="ICU Type"
                    value={estimateFileds.icuType}
                    onChange={(e) => {
                      setEstimateFields({
                        ...estimateFileds,
                        icuType: e.target.value
                      });
                    }}
                  >
                    {wards
                      .filter((ward) => ward.type === 1)
                      .map((item: IWard, index: number) => {
                        return (
                          <MenuItem value={item._id}>{item.name}</MenuItem>
                        );
                      })}
                  </Select>
                </FormControl>
                <TextField
                  label="Ward Days"
                  required
                  size="small"
                  onChange={(e) => {
                    setEstimateFields({
                      ...estimateFileds,
                      wardDays: +e.target.value
                    });
                  }}
                  placeholder="5"
                  sx={{ borderRadius: 40 }}
                />
                <TextField
                  onChange={(e) => {
                    setEstimateFields({
                      ...estimateFileds,
                      icuDays: +e.target.value
                    });
                  }}
                  label="ICU Days"
                  required
                  size="small"
                  placeholder="5"
                  sx={{ borderRadius: 40 }}
                />
              </Stack>
            </Box>
            <Box my={1} bgcolor="white" borderRadius={3} p={1}>
              <Typography fontWeight={500} my={1}>
                Emergency Details
              </Typography>
              <Stack direction="row" spacing={2} my={1}>
                <FormControl required>
                  <FormLabel id="demo-row-radio-buttons-group-label">
                    Is Emergency Admission
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    onChange={(e) => {
                      setEstimateFields({
                        ...estimateFileds,
                        isEmergency: e.target.value === 'true' ? true : false
                      });
                    }}
                  >
                    <FormControlLabel
                      value="true"
                      control={<Radio />}
                      label="Yes"
                    />
                    <FormControlLabel
                      value="false"
                      control={<Radio />}
                      label="No"
                    />
                  </RadioGroup>
                </FormControl>
              </Stack>
            </Box>
            <Box my={1} bgcolor="white" borderRadius={3} p={1}>
              <Typography fontWeight={500} my={1}>
                Insurance Details (optional)
              </Typography>

              <Stack direction="row" spacing={2} my={1}>
                <FormControl required>
                  <FormLabel id="payment-type">
                    Preferred Payment Type
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="payment-type"
                    name="payment-type"
                    onChange={(e) => {
                      setEstimateFields({
                        ...estimateFileds,
                        paymentType: +e.target.value
                      });
                    }}
                  >
                    <FormControlLabel
                      value="0"
                      control={<Radio />}
                      label="Cash"
                    />
                    <FormControlLabel
                      value="1"
                      control={<Radio />}
                      label="Insurance"
                    />
                    <FormControlLabel
                      value="2"
                      control={<Radio />}
                      label="CGHS/ECHS"
                    />
                  </RadioGroup>
                </FormControl>
              </Stack>
              {estimateFileds.paymentType === 1 && (
                <Stack direction="row" spacing={2}>
                  <TextField
                    label="Insurance Company Name"
                    size="small"
                    placeholder="eg: Birla Sun Life Insurance"
                    sx={{ borderRadius: 40 }}
                    onChange={(e) => {
                      setEstimateFields({
                        ...estimateFileds,
                        insuranceCompany: e.target.value
                      });
                    }}
                  />
                  <TextField
                    label="Policy Number"
                    size="small"
                    placeholder="eg: XXX-XXXXX-XXXX"
                    sx={{ borderRadius: 40 }}
                    onChange={(e) => {
                      setEstimateFields({
                        ...estimateFileds,
                        insurancePolicyNumber: e.target.value
                      });
                    }}
                  />
                  <TextField
                    label="Policy Amount"
                    size="small"
                    placeholder="eg: 500000"
                    sx={{ borderRadius: 40 }}
                    onChange={(e) => {
                      setEstimateFields({
                        ...estimateFileds,
                        insurancePolicyAmount: +e.target.value
                      });
                    }}
                  />
                </Stack>
              )}
            </Box>
            <Box my={1} bgcolor="white" borderRadius={3} p={1}>
              <Typography fontWeight={500} my={1}>
                Services Details
              </Typography>
              <Stack direction="row" spacing={2}>
                <Autocomplete
                  options={services}
                  onChange={(event, value) =>
                    setServiceObject({ ...serviceObject, id: value?._id })
                  }
                  id="combo-box-demo"
                  getOptionLabel={(option) => option.name}
                  sx={{ width: 500, textTransform: 'capitalize' }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      sx={{ textTransform: 'capitalize' }}
                      label="Select Surgery"
                    />
                  )}
                />
                <FormControl required>
                  <FormLabel id="payment-type">Is On Same Site</FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="is-same-site"
                    name="isSameSite"
                    onChange={(e) => {
                      setServiceObject({
                        ...serviceObject,
                        isSameSite: e.target.value === '0' ? true : false
                      });
                    }}
                  >
                    <FormControlLabel
                      value="0"
                      control={<Radio />}
                      label="Yes"
                    />
                    <FormControlLabel
                      value="1"
                      control={<Radio />}
                      label="No"
                    />
                  </RadioGroup>
                </FormControl>
                <Button endIcon={<AddCircle />} onClick={addServiceToArray}>
                  Add Service
                </Button>
              </Stack>
              {estimateFileds.service.length > 0 && (
                <Stack
                  my={1}
                  display="grid "
                  gridTemplateColumns="repeat(4,1fr)"
                  gap={1}
                >
                  {estimateFileds.service.map((item, index: number) => (
                    <Chip
                      color="primary"
                      label={`${serviceGetter(item.id)}/ ${
                        item.isSameSite ? 'Same Site' : 'Different Site'
                      }`}
                      variant="outlined"
                      onDelete={() => deleteService(index)}
                    />
                  ))}
                </Stack>
              )}
            </Box>
            <Box my={1} bgcolor="white" borderRadius={3} p={1}>
              <Typography fontWeight={500} my={1}>
                Investigation(optional)
              </Typography>
              <Stack direction="row" spacing={2}>
                <Autocomplete
                  {...serviceProps}
                  id="combo-box-demo"
                  sx={{ width: 500 }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      sx={{ textTransform: 'capitalize' }}
                      label="Select Investigation"
                    />
                  )}
                />
                <Button endIcon={<AddCircle />}>Add Investigation</Button>
              </Stack>
              <Stack my={1} direction="row" spacing={2}>
                <Chip
                  color="primary"
                  label="Investigation Name"
                  variant="outlined"
                  onDelete={() => console.log('Deleted')}
                />
              </Stack>
              <Stack my={1} direction="row" spacing={2}>
                <TextField
                  label="Investigation Charges"
                  size="small"
                  placeholder="eg:5000"
                  onChange={(e) => {
                    setEstimateFields({
                      ...estimateFileds,
                      investigationAmount: +e.target.value
                    });
                  }}
                />
              </Stack>
            </Box>
            <Box my={1} bgcolor="white" borderRadius={3} p={1}>
              <Typography fontWeight={500} my={1}>
                Procedure(optional)
              </Typography>
              <Stack direction="row" spacing={2}>
                <Autocomplete
                  {...serviceProps}
                  id="combo-box-demo"
                  sx={{ width: 500 }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      sx={{ textTransform: 'capitalize' }}
                      label="Select Procedure"
                    />
                  )}
                />
                <Button endIcon={<AddCircle />}>Add Procedure</Button>
              </Stack>
              <Stack my={1} direction="row" spacing={2}>
                <Chip
                  color="primary"
                  label="Procedure Name"
                  variant="outlined"
                  onDelete={() => console.log('Deleted')}
                />
              </Stack>
              <Stack my={1} direction="row" spacing={2}>
                <TextField
                  label="Procedure Charges"
                  size="small"
                  placeholder="eg:5000"
                  onChange={(e) => {
                    setEstimateFields({
                      ...estimateFileds,
                      procedureAmount: +e.target.value
                    });
                  }}
                />
              </Stack>
            </Box>
            <Box my={1} bgcolor="white" borderRadius={3} p={1}>
              <Typography fontWeight={500} my={1}>
                Other Charges(optional)
              </Typography>
              <Stack direction="row" spacing={2}>
                <TextField
                  fullWidth
                  label="Medicine Amount"
                  size="small"
                  onChange={(e) => {
                    setEstimateFields({
                      ...estimateFileds,
                      medicineAmount: +e.target.value
                    });
                  }}
                  placeholder="eg: 500000"
                />
                <TextField
                  fullWidth
                  label="Equipment Amount"
                  size="small"
                  placeholder="eg: 500000"
                  onChange={(e) => {
                    setEstimateFields({
                      ...estimateFileds,
                      equipmentAmount: +e.target.value
                    });
                  }}
                />
              </Stack>
              <Stack my={1} direction="row" spacing={2}>
                <TextField
                  fullWidth
                  label="Blood Amount"
                  size="small"
                  placeholder="eg: 500000"
                  onChange={(e) => {
                    setEstimateFields({
                      ...estimateFileds,
                      bloodAmount: +e.target.value
                    });
                  }}
                />
                <TextField
                  fullWidth
                  label="Miscellenous Charges"
                  size="small"
                  placeholder="eg: 500000"
                  onChange={(e) => {
                    setEstimateFields({
                      ...estimateFileds,
                      additionalAmount: +e.target.value
                    });
                  }}
                />
              </Stack>
            </Box>
          </Box>
        </Stack>
      </Drawer>
    </div>
  );
};

export default Estimate;
