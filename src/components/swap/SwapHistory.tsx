import React, { useState, useEffect } from "react"
import { Pagination } from "antd";
import { SwapHistoryWrapper, PaginationWrapper, Tabs, Tab } from './styleds';
import Table from "./Table";
import 'antd/dist/antd.css';
import { GetHistory } from '../../data/SwapCandles';
import useSwapAddress from "../../hooks/useSwapAddress";

export default function SwapHistory() {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [current, setCurrent] = useState(1);
  const { lqaddress } = useSwapAddress();

  useEffect(() => {
    getData(1);
  }, [lqaddress]);

  const getData = (page: number) => {
    GetHistory(page, lqaddress).then((Resp: any) => {
      if (!Resp || !Resp.data) return;
      setData(Resp.data.data.items);
      setTotal(Resp.data.data.total);
      setCurrent(Resp.data.data.page);
    })
  }

  const handleChange =(page: number) => {
    getData(page)
  }

  useEffect(() => {
    const timer = setInterval(() => {
      getData(current);
    }, 60 * 1000);
    return () => {
      clearInterval(timer);
    }
  }, [current]);

  return (
    <SwapHistoryWrapper>
      <Tabs>
        <Tab selected>Trade History</Tab>
        {/* <Tab>My Trade</Tab> */}
      </Tabs>
      <Table data={data} />
      <PaginationWrapper>
        <Pagination total={total} current={current} pageSize={15} onChange={handleChange} />
      </PaginationWrapper>
    </SwapHistoryWrapper>
  )
}