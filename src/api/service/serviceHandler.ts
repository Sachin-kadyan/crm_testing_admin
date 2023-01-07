import useServiceStore from '../../store/serviceStore';
import {
  getServiceTags,
  getAllServices,
  uploadServiceMaster,
  createServiceTag
} from './service';

export const createServiceHandler = async (parsedData: object[]) => {
  const { services, setServices } = useServiceStore.getState();
  const servicesAdded = await uploadServiceMaster(parsedData);

  setServices([...services, servicesAdded]);
};

export const getAllServicesHandler = async () => {
  const { setServices } = useServiceStore.getState();
  const services = await getAllServices();
  setServices(services);
};

export const getServiceTagsHandler = async () => {
  const { setServiceTags } = useServiceStore.getState();
  const serviceTags = await getServiceTags();
  setServiceTags(serviceTags);
};

export const createServiceTagsHandler = async (tag: object) => {
  const { serviceTags, setServiceTags } = useServiceStore.getState();
  const serviceTagAdded = await createServiceTag(tag);
  setServiceTags([...serviceTags, serviceTagAdded]);
};
