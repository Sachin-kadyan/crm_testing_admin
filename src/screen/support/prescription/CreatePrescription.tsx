import { Add, Camera, Check, Close, Delete, Undo } from '@mui/icons-material';
import {
  MenuItem,
  Autocomplete,
  Box,
  FormControl,
  InputLabel,
  Select,
  TextField,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Chip,
  CardMedia,
  Typography,
  CardContent,
  Button,
  Grid,
  FormHelperText
} from '@mui/material';
import { Stack } from '@mui/system';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import Webcam from 'react-webcam';
import { apiClient } from '../../../api/apiClient';
import { getDepartmentsHandler } from '../../../api/department/departmentHandler';
import { getDoctorsHandler } from '../../../api/doctor/doctorHandler';
import { createTicketHandler } from '../../../api/ticket/ticketHandler';
import useServiceStore from '../../../store/serviceStore';
import { iService } from '../../../types/store/service';

type iPrescription = {
  department: string;
  // subDepartment: string;
  doctor: string;
  admission: null | string;
  symptoms: string | null;
  condition: string | null;
  medicines: string[];
  followUp: Date | number;
  image: string | null;
  service?: { _id: string; label: string };
};

const initialPrescription = {
  department: '',
  // subDepartment: '',
  doctor: '',
  admission: 'none',
  symptoms: null,
  condition: null,
  medicines: [],
  followUp: new Date(),
  image: null
};

const CreatePrescription = () => {
  const { departments, doctors } = useServiceStore();
  // const [medicine, setMedicine] = useState('');
  const [openCamera, setOpenCamera] = useState(false);
  const [foundServices, setFoundServices] = useState<iService[]>([]);
  const camera = useRef<Webcam>(null);
  const { id } = useParams();
  const [prescription, setPrescription] =
    useState<iPrescription>(initialPrescription);
  const [diagnostics, setDiagnostics] = useState<string[]>([]);
  const defaultValidation = { message: '', value: false };

  const findService = async (query: string) => {
    try {
      if (query.length <= 3) return;
      const { data } = await apiClient.get(`/service/search?search=${query}`);
      setFoundServices(data);
    } catch (error) {
      console.log(error);
    }
  };

  const [validations, setValidations] = useState({
    department: { message: '', value: false },
    // subDepartment: { message: '', value: false },
    doctor: { message: '', value: false },
    admission: { message: '', value: false },
    service: { message: '', value: false },
    followUp: { message: '', value: false },
    image: { message: '', value: false }
  });

  const changePrescriptionValue = (field: any, value: any) => {
    setPrescription((prev: any) => {
      prev[field] = value;
      return { ...prev };
    });
  };

  const validation = () => {
    const department = prescription.department === '';
    // const subDepartment = prescription.subDepartment === '';
    const doctor = prescription.doctor === '';
    const admission = prescription.admission === '';
    const image = prescription.image === null;
    let service = false;
    if (prescription.admission !== 'none') {
      if (!prescription.service || prescription.service?._id === '') {
        service = true;
      }
    }
    const followUp = new Date(prescription.followUp).getTime() < Date.now();

    setValidations((prev) => {
      prev.department = department
        ? { message: 'Invalid Value', value: true }
        : defaultValidation;
      // prev.subDepartment = subDepartment
      //   ? { message: 'Invalid Value', value: true }
      //   : defaultValidation;
      prev.doctor = doctor
        ? { message: 'Invalid Value', value: true }
        : defaultValidation;
      prev.admission = admission
        ? { message: 'Invalid Value', value: true }
        : defaultValidation;
      prev.followUp = followUp
        ? { message: 'Invalid Value', value: true }
        : defaultValidation;
      prev.image = image
        ? { message: 'Invalid Value', value: true }
        : defaultValidation;
      prev.service = service
        ? { message: 'Please specify service', value: true }
        : defaultValidation;
      return { ...prev };
    });
    return (
      department === false &&
      // subDepartment === false &&
      doctor === false &&
      admission === false &&
      image === false &&
      followUp === false &&
      service === false
    );
  };
  const handelUploadPrescription = async () => {
    const validationCheck = validation();
    if (validationCheck === true) {
      const ticket: any = structuredClone(prescription);
      delete ticket.department;
      delete ticket.subDepartment;
      ticket.consumer = id;
      ticket.departments = [prescription.department];
      ticket.diagnostics = diagnostics;
      await createTicketHandler(ticket);
      setPrescription(initialPrescription);
      setDiagnostics([]);
    }
  };

  useEffect(() => {
    (async function () {
      await getDepartmentsHandler();
      await getDoctorsHandler();
    })();
  }, []);

  return (
    <>
      <Box display={openCamera ? 'none' : 'block'}>
        <form>
          <Box my={1.5}>
            <Autocomplete
              fullWidth
              onChange={(_, newValue) =>
                changePrescriptionValue('department', newValue!._id!)
              }
              getOptionLabel={(option) => option.name}
              options={departments.filter((item) => item.parent === null)}
              renderInput={(params) => (
                <TextField {...params} label="Department" />
              )}
            />
            <FormHelperText error={validations.department.value}>
              {validations.department.message}
            </FormHelperText>
          </Box>
          {/* <Box my={1.5}>
            <Autocomplete
              disablePortal
              fullWidth
              onChange={(_, newValue) =>
                changePrescriptionValue('subDepartment', newValue!._id!)
              }
              options={subDepartmentLabels}
              renderInput={(params) => (
                <TextField {...params} label="Sub Department" />
              )}
            />
            <FormHelperText error={validations.subDepartment.value}>
              {validations.subDepartment.message}
            </FormHelperText>
          </Box> */}
          <Box my={1.5}>
            <Autocomplete
              disablePortal
              fullWidth
              onChange={(_, newValue) =>
                changePrescriptionValue('doctor', newValue!._id!)
              }
              options={doctors}
              getOptionLabel={(option) => option.name}
              renderInput={(params) => <TextField {...params} label="Doctor" />}
            />
            <FormHelperText error={validations.doctor.value}>
              {validations.doctor.message}
            </FormHelperText>
          </Box>
          <Box my={1.5}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Admission Type
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={prescription.admission}
                label="Admission Type"
                onChange={(e) =>
                  changePrescriptionValue('admission', e.target.value!)
                }
              >
                <MenuItem value={'none'}>None</MenuItem>
                <MenuItem value={'Surgery'}>Surgery</MenuItem>
                <MenuItem value={'Radiation'}>Radiation</MenuItem>
                <MenuItem value={'Medical Management'}>
                  Medical Management
                </MenuItem>
              </Select>
              <FormHelperText error={validations.admission.value}>
                {validations.admission.message}
              </FormHelperText>
            </FormControl>
            {prescription.admission !== 'none' && (
              <Box my={1.5}>
                <Autocomplete
                  fullWidth
                  onChange={(_, newValue) =>
                    changePrescriptionValue('service', newValue)
                  }
                  options={foundServices}
                  getOptionLabel={(option) => option.name}
                  renderInput={(params) => (
                    <TextField
                      onChange={(e) => findService(e.target.value)}
                      {...params}
                      label="Service"
                    />
                  )}
                />
                <FormHelperText error={validations.service.value}>
                  {validations.service.message}
                </FormHelperText>
              </Box>
            )}
          </Box>
          {/* <Box my={1.5}>
            <TextField
              value={prescription.symptoms}
              onChange={(e) =>
                changePrescriptionValue('symptoms', e.target.value)
              }
              rows={3}
              fullWidth
              multiline
              placeholder="Headache, Vomit"
              label="Symptoms"
            />
          </Box>
          <Box my={1.5}>
            <TextField
              value={prescription.condition}
              onChange={(e) =>
                changePrescriptionValue('condition', e.target.value)
              }
              rows={3}
              fullWidth
              multiline
              placeholder="BP 80/130"
              label="Conditions"
            />
          </Box>
          <Box my={1.5}> */}
          {/* {prescription.medicines.map((item, index) => (
            <Chip
              sx={{ mx: 1 }}
              label={item}
              onDelete={() =>
                setPrescription((prev) => {
                  prev.medicines.splice(index, 1);
                  return { ...prev };
                })
              }
            />
          ))} */}
          {/* <FormControl sx={{ mt: 0.5 }} fullWidth variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Medicine
            </InputLabel>
            <OutlinedInput
              fullWidth
              value={medicine}
              onChange={(e) => setMedicine(e.target.value)}
              id="outlined-adornment-password"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => {
                      if (medicine.length <= 0) return;
                      setPrescription((prev) => {
                        prev.medicines.push(medicine);
                        return { ...prev };
                      });
                      setMedicine('');
                    }}
                    edge="end"
                  >
                    <Add />
                  </IconButton>
                </InputAdornment>
              }
              label="Medicines"
            />
          </FormControl> */}
          {/* </Box> */}
          <FormControl fullWidth sx={{ my: 1 }}>
            <InputLabel id="demo-multiple-name-label">Diagnostics</InputLabel>
            <Select
              labelId="demo-multiple-name-label"
              value={diagnostics}
              onChange={(e) =>
                setDiagnostics(
                  typeof e.target.value === 'string'
                    ? e.target.value.split(',')
                    : e.target.value
                )
              }
              id="demo-multiple-name"
              multiple
              input={<OutlinedInput label="Diagnostics" />}
            >
              {['MRI', 'CT-SCAN', 'PETCT'].map((name) => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Box my={1.5}>
            <TextField
              inputProps={{ inputProps: { min: new Date() } }}
              value={prescription.followUp}
              required
              onChange={(e) =>
                changePrescriptionValue('followUp', e.target.value)
              }
              fullWidth
              label="Follow Up Date"
              type="date"
              error={validations.followUp.value}
              helperText={validations.followUp.message}
            />
          </Box>
          <Box my={1.5}>
            <Grid container>
              <Grid item xs={6}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component="div" variant="subtitle1">
                      Prescription Image
                    </Typography>
                    <Stack spacing={0.5}>
                      {prescription.image === null && (
                        <Button
                          onClick={() => setOpenCamera(true)}
                          fullWidth
                          variant="outlined"
                          startIcon={<Camera />}
                        >
                          Capture
                        </Button>
                      )}
                      {prescription.image !== null && (
                        <>
                          <Button
                            fullWidth
                            variant="outlined"
                            startIcon={<Undo />}
                            onClick={() => setOpenCamera(true)}
                          >
                            Retake
                          </Button>
                          <Button
                            fullWidth
                            variant="outlined"
                            color="error"
                            startIcon={<Delete />}
                            onClick={() =>
                              changePrescriptionValue('image', null)
                            }
                          >
                            Delete
                          </Button>
                        </>
                      )}
                    </Stack>
                  </CardContent>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <CardMedia
                  component="img"
                  sx={{ width: '150px', objectFit: 'contain', height: '150px' }}
                  image={
                    prescription.image
                      ? prescription.image
                      : 'https://www.grouphealth.ca/wp-content/uploads/2018/05/placeholder-image.png'
                  }
                  alt="Prescription Image"
                />
              </Grid>
            </Grid>
            <FormHelperText error={validations.image.value}>
              {validations.image.message}
            </FormHelperText>
          </Box>
          <Box my={1.5}>
            <Button
              onClick={handelUploadPrescription}
              variant="contained"
              fullWidth
              startIcon={<Check />}
            >
              Upload Prescription
            </Button>
          </Box>
        </form>
      </Box>
      <Box
        display={openCamera ? 'absolute' : 'none'}
        sx={{
          position: 'absolute',
          height: '100vh',
          width: '100vw',
          top: '0px',
          backgroundColor: 'white',
          zIndex: 10,
          left: '0px',
          overflow: 'hidden'
        }}
      >
        {prescription.image === null ? (
          <Webcam
            style={{ height: '90vh' }}
            audio={false}
            screenshotFormat="image/jpeg"
            ref={camera}
            videoConstraints={{
              facingMode: { exact: 'environment' }
            }}
          />
        ) : (
          <Box>
            <img
              src={prescription.image}
              style={{ width: '100vw', height: '90vh', objectFit: 'contain' }}
            />
          </Box>
        )}
        <Box display="flex" justifyContent="space-evenly" alignItems="center">
          <IconButton onClick={() => changePrescriptionValue('image', null)}>
            <Undo fontSize="large" />
          </IconButton>
          <IconButton
            onClick={() => {
              changePrescriptionValue(
                'image',
                camera.current!.getScreenshot()!
              );
            }}
          >
            <Camera fontSize="large" />
          </IconButton>
          <IconButton onClick={() => setOpenCamera(false)}>
            {prescription.image === null ? (
              <Close fontSize="large" />
            ) : (
              <Check fontSize="large" />
            )}
          </IconButton>
        </Box>
      </Box>
    </>
  );
};

export default CreatePrescription;
