import axios, { type AxiosRequestConfig } from "axios";

export class BaseApi {
  private baseUrl: string

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  async get(path: string, query?: AxiosRequestConfig["params"], config?: AxiosRequestConfig) {
    return axios.get(this.baseUrl + path, {
      params: query,
      ...config,
    }).then(res => res.data)
  }

  async post(path: string, body?: AxiosRequestConfig["params"], config?: AxiosRequestConfig) {
    return axios.post(this.baseUrl + path, body, config).then(res => res.data)
  }
}