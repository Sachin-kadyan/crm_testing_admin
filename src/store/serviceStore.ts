import create from "zustand";
import { iServiceStore } from "../types/store/service";
const useServiceStore = create<iServiceStore>((set) => ({
  departments: [],
  setDepartments: (departments) => set({ departments }),
  doctors: [],
  setDoctors: (doctors) => {
    set({ doctors });
  },
  departmentTags: [],
  setDepartmentTags: (departmentTags) => {
    set({ departmentTags });
  },
}));

export default useServiceStore;
