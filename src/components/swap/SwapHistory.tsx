import React, { useState, useEffect, Fragment } from "react"
import { Pagination } from "antd";
import { SwapHistoryWrapper, PaginationWrapper, Tabs, Tab } from './styleds';
import Table from "./Table";
import 'antd/dist/antd.css';
import { GetHistory } from '../../data/SwapCandles';
import useSwapAddress from "../../hooks/useSwapAddress";
import { isMobile } from "react-device-detect";

export default function SwapHistory() {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [current, setCurrent] = useState(1);
  const { lqaddress, pair } = useSwapAddress();
  console.log("useSwapAddress ===>", lqaddress);

  useEffect(() => {
    // 重置数据
    setData([]);
    setTotal(0);
    if(!lqaddress)return;

    setCurrent(1);

    getData(1);
  }, [lqaddress]);

  const getData = (page: number) => {
    console.log("lqaddress", lqaddress)
    GetHistory(page, lqaddress).then((Resp: any) => {
      if (!Resp || !Resp.data) return;
      setData(Resp.data.data.items);
      setTotal(Resp.data.data.total);
      setCurrent(Resp.data.data.page);
    })
  }

  const handleChange = (page: number) => {
    getData(page)
  }

  useEffect(() => {
    const timer = setInterval(() => {
      getData(current);
    }, 60 * 1000);
    return () => {
      clearInterval(timer);
    }
  }, [current, lqaddress]);

  return (
    <SwapHistoryWrapper style={{ marginTop: isMobile ? '2rem' : '0' }}>
      <Tabs>
        <Tab selected>Trade History</Tab>
        {/* <Tab>My Trade</Tab> */}
      </Tabs>
      <Fragment>
          <Table data={data} pair={pair} />
          {data.length > 0 ? <PaginationWrapper>
            <Pagination showLessItems={true} total={total} current={current} pageSize={15} onChange={handleChange} />
          </PaginationWrapper> : undefined}
        </Fragment>


    </SwapHistoryWrapper>
  )
}