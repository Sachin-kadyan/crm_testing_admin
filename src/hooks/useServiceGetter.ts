import useServiceStore from '../store/serviceStore';

export const useServiceGetter = (id: string | undefined) => {
  const { services } = useServiceStore();

  const serviceName = services.find((element) => element._id === id)?.name;
  return serviceName;
};
