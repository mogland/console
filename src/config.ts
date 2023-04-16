import { apiClient } from "@utils/request";

export const SWR_CONFIG = {
  fetcher: apiClient,
  suspense: true,
}