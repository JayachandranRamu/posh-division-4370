import axios, { AxiosRequestConfig } from "axios";

export let ProductURL = "http://localhost:8080/products";

export const getProductDataFromAPI = (params: AxiosRequestConfig) => {
  return axios.get(ProductURL, params);
};
