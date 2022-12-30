import useServiceStore from '../../store/serviceStore';
import { uploadServiceMaster } from './service';

export const createServiceHandler = async (parsedData: object[]) => {
  const { services, setServices } = useServiceStore.getState();
  const servicesAdded = await uploadServiceMaster(parsedData);
  console.log(servicesAdded);
  setServices([...services, servicesAdded]);
};
