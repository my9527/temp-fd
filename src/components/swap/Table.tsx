import React from 'react';
import map from 'lodash/map';
import { Table, TableHeader, Tr, Td } from './styleds';
import dayjs from 'dayjs';
import clsx from 'clsx';
import parsePrice from '../../utils/parsePrice';
import formatAddress from '../../utils/formatAddress';

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
  data: Array<ItemProp>;
}

const formatPrice = (price: any) => new Intl.NumberFormat('en-US', {
  //@ts-ignore
  notation: "compact"
}).format(price);

export default function TableRoot({ data }: DataProps) {
  return (
    <Table>
      <TableHeader>
        <Tr>
          <Td>Time</Td>
          <Td width={'120px'}>Type</Td>
          <Td width={'180px'}>Price</Td>
          <Td>Amount</Td>
          <Td width={'180px'}>Volumn</Td>
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
            <Td>{formatPrice(item.amount)}</Td>
            <Td>{formatPrice(item.volume)}</Td>
            {/* <Td>{item.address.slice(0, 4)}</Td> */}
            <Td>{formatAddress(item.from)}</Td>
          </Tr>
        ))
      }
    </Table>
  );
}