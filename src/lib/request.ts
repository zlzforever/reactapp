import axios from "axios";
import oidc from "oidc-client";
import config from "../config";
import { message } from "antd";
import { User } from "../UserContext";

axios.defaults.withCredentials = true;
// 创建 axios 实例
const service = axios.create({
  timeout: 300 * 1000, // 请求超时时间
});

const err = (error: any) => {
  if (error.response) {
    if (error.response.status === 403) {
      message.error("访问受限");
    } else if (error.response.status === 401) {
      const mgr = new oidc.UserManager(config.ids4);
      mgr.signinRedirect();
    } else {
      message.error("内部请求错误 500");
    }
  } else {
    message.error("请求失败，服务开小差或网络连接失败");
  }
  return Promise.reject(error);
};

// Request interceptor
service.interceptors.request.use((config: any) => {
  const token = User.accessToken;
  config.headers.Authorization = `Bearer ${token}`;
  return config;
}, err);

// Response interceptor
service.interceptors.response.use((response) => {
  if (response.status === 401) {
    localStorage.removeItem("user");
    window.location.href = "/";
    return;
  }
  if (!response.data) {
    // 1. 若没有返回数据，则根据 statusCode 来判断
    if (response.status !== 200) {
      throw new Error("执行异常");
    }
    return null;
  }
  // 2. 若有返回数据，且不是标准接口
  if (response.data.code === undefined && response.data.success === undefined) {
    return {
      success: true,
      code: 0,
      data: response.data,
      headers: response.headers,
      msg: "",
    };
  }

  // 3. 标准数据
  const result = response.data;
  if (!result.success) {
    if (result.msg) {
      // message.error(result.msg);
      throw result.msg;
    } else {
      if (result.errors) {
        const msg = Object.getOwnPropertyNames(result.errors).map((e) => {
          const message = result.errors[e].map((x: any) => `${x} `);
          return `${e}：${message}`;
        });
        // message.error(msg);
        throw msg[0];
      } else {
        // 4. 应该不返回错误信息，直接处理掉
        // todo:
        // eslint-disable-next-line no-throw-literal
        throw "未知的错误";
      }
    }
  }
  return result;
}, err);

export { service as axios };
