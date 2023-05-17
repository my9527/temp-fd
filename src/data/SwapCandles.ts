import axios from 'axios';
import { FILEDOGE_FIL } from '../constants';

const host: string = `https://256btc.com/api/`;

export const GetCandles = (currentTimeFrame: string, address: string = FILEDOGE_FIL, from: number, to: number) => {
  return axios.get(`${host}swap/candles?address=${address}&from=${from}&to=${to}&type=${currentTimeFrame}`);
}

export const GetHistory = (page: number, address: string) => {
  return axios.get(`${host}swap/query?address=${address}&page=${page}&pageSize=15`);
}

export const GetInfo = (address: string = FILEDOGE_FIL) => {
  return axios.get(`${host}swap/pool-info?address=${address}`);
}