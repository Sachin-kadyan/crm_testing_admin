import create from "zustand";
import { iServiceStore } from "../types/store/service";
const useServiceStore = create<iServiceStore>((set) => ({
  departments: [],
  setDepartments: (departments) => set({ departments }),
  doctors: [],
  setDoctors: (doctors) => {
    set({ doctors });
  },
}));

export default useServiceStore;
