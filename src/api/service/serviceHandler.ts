import useServiceStore from '../../store/serviceStore';
import { createTag, iService, iServiceTag } from '../../types/store/service';
import {
  getServiceTags,
  getAllServices,
  uploadServiceMaster,
  createServiceTag
} from './service';

export const createServiceHandler = async (parsedData: iService[]) => {
  const { services, setServices } = useServiceStore.getState();
  const servicesAdded = await uploadServiceMaster(parsedData);

  setServices([...services, ...servicesAdded]);
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

export const createServiceTagsHandler = async (tag: createTag) => {
  const { serviceTags, setServiceTags } = useServiceStore.getState();
  const serviceTagAdded = (await createServiceTag(tag)) as iServiceTag;
  setServiceTags([...serviceTags, serviceTagAdded]);
};
