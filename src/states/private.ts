import { proxy } from "valtio";

export const _private = proxy({
  showModal: false,
  modalDataId: "",
  refreshData: false,
});
