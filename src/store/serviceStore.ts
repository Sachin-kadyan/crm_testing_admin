import { create } from 'zustand';
import { iServiceStore } from '../types/store/service';
const useServiceStore = create<iServiceStore>((set, get) => ({
  departments: [],
  setDepartments: (departments) => set({ departments }),
  doctors: [],
  setDoctors: (doctors) => {
    set({ doctors });
  },
  services: [],
  setServices: (services) => {
    set({ services });
  },
  serviceTags: [],
  setServiceTags: (serviceTags) => {
    set({ serviceTags });
  },
  wards: [],
  setWards: (wards) => {
    set({ wards });
  },
  stages: [],
  setStages: (stages) => {
    set({ stages });
  },
  scripts: [],
  setScripts: (scripts) => {
    set({ scripts });
  }
}));

export default useServiceStore;
