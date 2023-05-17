import React, { Fragment } from 'react';
import map from 'lodash/map';
import { Table, TableHeader, Tr, Td } from './styleds';
import dayjs from 'dayjs';
import clsx from 'clsx';
import parsePrice from '../../utils/parsePrice';
import formatAddress from '../../utils/formatAddress';
import { utils } from 'ethers';
import { useCurrency } from '../../hooks/Tokens';

interface ItemProp {
  blocktime: number;
  side: number;
  price: string;
  amount: string;
  volumn: string;
  address: string;
  from: string;
}

interface DataProps {
  data: ItemProp[]
  pair: (string | undefined)[]
}

const formatPrice = (price: any) => new Intl.NumberFormat('en-US', {
  //@ts-ignore
  notation: "compact",
  minimumFractionDigits:2,
  maximumSignificantDigits: 6 
}).format(price);


export default function TableRoot({ data, pair }: DataProps) {
  const base = useCurrency(pair[1])
  const quota = useCurrency(pair[0])
  return (
    <Fragment>
    <Table>
      <TableHeader>
        <Tr>
          <Td>Time</Td>
          <Td width={'120px'}>Type</Td>
          <Td width={'180px'}>Price</Td>
          <Td>Amount({quota?.symbol})</Td>
          <Td width={'180px'}>Volume({base?.symbol})</Td>
          {/* <Td>DEX</Td> */}
          <Td style={{ textAlign: 'right' }}>User</Td>
        </Tr>
      </TableHeader>
      
      {
        map(data, (item: any, index) => (
          <Tr key={index}>
            <Td>{dayjs(Number(`${item.blocktime}000`)).format('YYYY-MM-DD HH:mm:ss')}</Td>
            <Td className={clsx({ Buy: item.side === 0, Sell: item.side === 1 })}>{item.side === 0 ? 'Buy' : 'Sell'}</Td>
            <Td>{parsePrice(item.price)}</Td>
            <Td>{formatPrice(utils.formatEther(item.amount))}</Td>
            <Td>{formatPrice(utils.formatEther(item.volume))}</Td>
            {/* <Td>{item.address.slice(0, 4)}</Td> */}
            <Td>{formatAddress(item.from)}</Td>
          </Tr>
        ))
      }
    </Table>
    {data.length === 0 ? <div style={{ textAlign: "center", marginTop: "2rem" }}>No data</div> : null}
    </Fragment>
  );
}