import { axios } from "../lib/request";
import config from "../config";

/* 通用 API */
export function getSystemInfo() {
  return axios({
    url: `${config.api}/v1.0/system/info`,
    method: "GET",
  });
}
