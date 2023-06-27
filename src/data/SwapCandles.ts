import axios from 'axios';
import { FILEDOGE_FIL } from '../constants';

const host: string = `https://data.filedoge.io/api/`;

export const GetCandles = (currentTimeFrame: string, address: string , from: number, to: number) => {
  return axios.get(`${host}swap/candles?address=${address}&from=${from}&to=${to}&type=${currentTimeFrame}`);
}

export const GetHistory = (page: number, address: string) => {
  return axios.get(`${host}swap/query?address=${address}&page=${page}&pageSize=15`);
}

export const GetInfo = (address: string) => {
  return axios.get(`${host}swap/pool-info?address=${address}`);
}