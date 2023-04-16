import { app, server } from "@states/app";
import useSWR from "swr";

function getCategoryData() {
  const { data, error } = useSWR("/category");
  if (error) {
    app.error.push("category");
    return;
  }
  // console.log(data);
  
  server.categories = data;
  return;
}

function getTagData() {
  const { data, error } = useSWR("/category?type=Tag");
  if (error) {
    app.error.push("category");
    return;
  }
  server.tags = data;
  return;
}

export function useInitialData() {
  getCategoryData();
  getTagData();
}
