import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createChart, ColorType } from 'lightweight-charts';
import clsx from 'clsx';
import { SwapChartContainer, SwapChartChartWrapper, TimeBox, TimeItem } from './styleds';
import parsePrice from '../../utils/parsePrice';
import { GetCandles } from '../../data/SwapCandles';

const Times = ['1min', '15min', '1day', '1week'];

export default function SwapChartChart({ lqaddress }: { lqaddress: string }) {
  const ref = useRef(null) as any;
  const chart = useRef(null) as any;
  const chartSeries = useRef(null) as any;
  const [timeTick, setTimeTick] = useState('1min');

  useEffect(() => {
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
  }, []);

  const handleGetSwapData = (time: string) => {
    GetCandles(time, lqaddress).then((Resp: any) => {
      if (Resp?.data?.data) {
        chartSeries.current.setData(Resp.data.data);
      }
    });
  };

  const changeTime = useCallback((time) => {
    if (time === timeTick) return;
    setTimeTick(time);
    handleGetSwapData(time);
  }, [timeTick, handleGetSwapData]);

  useEffect(() => {
    handleGetSwapData('1min');
  }, [lqaddress]);

  useEffect(() => {
    const timer = setInterval(() => {
      handleGetSwapData(timeTick);
    }, 60 * 1000);
    return () => {
      clearInterval(timer);
    }
  }, [timeTick, lqaddress]);

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
