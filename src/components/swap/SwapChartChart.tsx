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

export default function SwapChartChart({ lqaddress }: { lqaddress: string }) {
  const ref = useRef(null) as any;
  const chart = useRef(null) as any;
  const chartSeries = useRef(null) as any;
  const [timeTick, setTimeTick] = useState('15min');
  const [lastestCandles, updateLatestCandle] = useState(null);
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
        priceFormatter: function (price: number) {
          return parsePrice(price); 
        }
      },
      timeScale: {
        borderColor: "#485c7b",
        timeVisible: true,
        secondsVisible: false
      },
    });

    chart.current.timeScale().fitContent();
    chartSeries.current = chart.current.addCandlestickSeries({
      upColor: 'red',
      downColor: 'green',
      borderDownColor: 'green',
      borderUpColor: 'red',
      wickDownColor: 'green',
      wickUpColor: 'red',
    });
  }

  useEffect(() => {
    init()
  }, []);

  const handleGetSwapData = (time: string, from: number, to: number, init: boolean = false) => {
    GetCandles(time, lqaddress, from, to).then((Resp: any) => {
      if (Resp?.data?.data) {
        if(Resp?.data?.data.length){
          const newDatas = [...chartDatas, ...Resp?.data?.data];
          console.log("newDatas", newDatas);
          console.log("Resp?.data?.data", Resp?.data?.data)
          // @ts-ignore
          updateChartDatas(newDatas);
          const lastId = Resp?.data?.data.length -1;
          
          updateLatestCandle(Resp?.data?.data[lastId]);
          chartSeries.current.setData(newDatas);
        }
        // chartSeries.current
      }
    });
  };

  const changeTime = useCallback((time) => {
    if (time === timeTick) return;
    // init();
    // chartSeries.current.setData([]);
    // chart.current.timeScale().fitContent();
    updateChartDatas([]);
    setTimeTick(time);
    const { from, to} = getInitTimeRange();
    handleGetSwapData(time, from, to, true);
  }, [timeTick, handleGetSwapData]);

  useEffect(() => {
    const { from, to} = getInitTimeRange();
    handleGetSwapData('15min', from,to,true);
  }, [lqaddress]);

  useEffect(() => {
    const timer = setInterval(() => {
      const timeRange = getInitTimeRange();
      // @ts-ignore
      timeRange.from =  lastestCandles?.time ? lastestCandles?.time + CandleTimeSlice[timeTick] : timeRange.from;
      timeRange.from = timeRange.from > timeRange.to ? timeRange.to : timeRange.from;
      // @ts-ignore
      timeRange.to =  timeRange.to + CandleTimeSlice[timeTick];
      handleGetSwapData(timeTick, timeRange.from, timeRange.to );
    // @ts-ignore
    }, TimesDelayMap[timeTick] * 1000);
    return () => {
      clearInterval(timer);
    }
  }, [timeTick, lqaddress, lastestCandles, chartDatas]);

  return (
    <SwapChartChartWrapper>
      <TimeBox>
        {Times.map((item, key) => (
          <TimeItem key={key} onClick={() => changeTime(item)} className={clsx({ selected: item === timeTick })}>{item}</TimeItem>
        ))}
      </TimeBox>
      <SwapChartContainer ref={ref} />
    </SwapChartChartWrapper>
  );
}
