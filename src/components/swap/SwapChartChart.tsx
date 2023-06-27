import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createChart, ColorType } from 'lightweight-charts';
import clsx from 'clsx';
import { SwapChartContainer, SwapChartChartWrapper, TimeBox, TimeItem } from './styleds';
import parsePrice from '../../utils/parsePrice';
import { GetCandles } from '../../data/SwapCandles';

const Times = ['1min', '15min', '1day', '1week'];

// 秒
const TimesDelayMap = {
  '1min': 30,
  "15min": 60 * 3,
  "1day": 60 * 3,
  "1week": 60 * 3,
}
const CandleTimeSlice = {
  '1min': 60,
  "15min": 60 * 15,
  "1day": 60 * 60 * 24,
  "1week": 60 * 60 * 24 * 7,
}

const getInitTimeRange = () => {
  const from = 1679241600;// 2023-3-23;
  const to = Math.floor(Date.now() / (60 * 1000)) * 60
  return {from, to}
}

export default function SwapChartChart({ lqaddress, pair }: { lqaddress: string, pair: string[] }) {
  const ref = useRef(null) as any;
  const chart = useRef(null) as any;
  const chartSeries = useRef(null) as any;
  const [timeTick, setTimeTick] = useState('15min');
  const [lastestCandles, updateLatestCandle] = useState({
    time:0,
  });
  const [chartDatas, updateChartDatas] = useState([]);

  function init() {
    
    chart.current = null;
    chart.current = createChart(ref.current, {
      width: 678,
      height: 300,
      layout: {
        background: {
          type: ColorType.Solid,
          color: '#141c1c',
        },
        textColor: 'rgba(255, 255, 255, 0.8)',
      },
      grid: {
        vertLines: {
          color: 'rgba(255, 255, 255, 0.06)',
        },
        horzLines: {
          color: 'rgba(255, 255, 255, 0.06)',
        },
      },
      
      localization: {
        locale: "en-US",
        priceFormatter: function (price: number) {
          return parsePrice(price); 
        },
      },
      timeScale: {
        borderColor: "#485c7b",
        timeVisible: true,
        secondsVisible: false,
        ticksVisible: true,
      },
    });

    chart.current.timeScale().fitContent();
    chartSeries.current = chart.current.addCandlestickSeries({
      upColor: 'green',
      downColor: 'red',
      borderDownColor: 'red',
      borderUpColor: 'green',
      wickDownColor: 'red',
      wickUpColor: 'green',
    });
  }

  useEffect(() => {
    init()
  }, []);

  const handleGetSwapData = (isUpdate = true, time:string, from: number, to: number, init: boolean = false) => {
    if(!lqaddress){
      return;
    }
    GetCandles(time, lqaddress, from, to).then((Resp: any) => {
      if (Resp?.data?.data) {
        if(Resp?.data?.data.length){
          let newDatas: any[] = Resp?.data?.data;
          // @ts-ignore
          // let newDatas = _newDatas.filter(v => v.time > lastData.time);
          if(isUpdate) {
            const _new = [...Resp?.data?.data].filter(v => v.time > (lastestCandles?.time || 0))
            newDatas = [...chartDatas, ..._new].sort((a, b) => a.time - b.time);
          } else {
            newDatas  = [...Resp?.data?.data]
          }
          chartSeries.current.setData(newDatas);
          // @ts-ignore
          updateChartDatas(newDatas);
          const lastId = Resp?.data?.data.length -1;
          
          updateLatestCandle(Resp?.data?.data[lastId]);
          
        }
        // chartSeries.current
      }
    });
  };

  const changeTime = (time: string) => {
    if (time === timeTick) return;
    // init();
    // updateChartDatas([]);
    setTimeTick(time);
    const { from, to} = getInitTimeRange();
    setTimeout(() => {
      handleGetSwapData(false, time, from, to, true);
    }, 5);
  }

  useEffect(() => {
    const { from, to} = getInitTimeRange();
    console.log("aaaaa", lqaddress, from, to);
    
    handleGetSwapData(false, '15min', from,to,true);
  }, [lqaddress]);

  useEffect(() => {
    const timer = setInterval(() => {
      const timeRange = getInitTimeRange();
      // @ts-ignore
      timeRange.from =  lastestCandles?.time ? lastestCandles?.time : timeRange.from;
      // timeRange.from = timeRange.from > timeRange.to ? timeRange.to : timeRange.from;
      // @ts-ignore
      // timeRange.from = timeRange.to - (CandleTimeSlice[timeTick] as number);
      // @ts-ignore
      timeRange.to =  timeRange.to + (CandleTimeSlice[timeTick] as number);
      console.log('timeRange', timeRange);

      handleGetSwapData(true, timeTick, timeRange.from, timeRange.to );
    // @ts-ignore
    }, TimesDelayMap[timeTick] * 1000);
    return () => {
      clearInterval(timer);
    }
  }, [timeTick, lqaddress, lastestCandles, chartDatas]);

  return (
    <SwapChartChartWrapper key={timeTick}>
      {/* <TimeBox>
        {Times.map((item, key) => (
          <TimeItem key={key} onClick={() => changeTime(item)} className={clsx({ selected: item === timeTick })}>{item}</TimeItem>
        ))}
      </TimeBox> */}
      <SwapChartContainer ref={ref} />
    </SwapChartChartWrapper>
  );
}