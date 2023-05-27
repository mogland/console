import { toast } from "sonner";
import { proxy, subscribe } from "valtio";
import { MOG_OFFICIAL_SERVICES } from "@constants/services";
export const app = proxy({
  token: null as string | null,
  showSidebar: false,
  authenticated: false,
  // if there is an error, it will be stored here ( just use in init phase )
  // example: ["user", "comments"] --  means there is an error in user and comments service
  // Gateway's error will not be stored here, it will turn to Internal Server Error Page directly
  error: [] as any[],
  gatewayError: false,
});

subscribe(app.error, (state) => {
  if (state.length > 0) {
    const allServices = MOG_OFFICIAL_SERVICES
    for (let i = 0; i < state.length; i++) {
      const service = allServices.find((s) => s.url === state[i][2]!.toString());
      if (service) {
        toast.error(`${service.name} 出现故障`);
      } else {
        toast.error(`未知服务 ${state[i]} 出现故障`);
      }
      app.error = app.error.filter((e) => e !== state[i]);
    }
  }
})

export const server = proxy({
  categories: [] as any[],
  tags: [] as {
    name: string;
    count: number;
  }[],
});