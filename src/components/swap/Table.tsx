import React, { Fragment } from 'react';
import map from 'lodash/map';
import { Table, TableHeader, Tr, Td } from './styleds';
import dayjs from 'dayjs';
import clsx from 'clsx';
import parsePrice from '../../utils/parsePrice';
import formatAddress from '../../utils/formatAddress';
import { utils } from 'ethers';
import { useCurrency } from '../../hooks/Tokens';
import { isMobile } from 'react-device-detect';

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
  minimumFractionDigits: 2,
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
            {!isMobile && <Td width={'120px'}>Type</Td>}
            <Td width={ isMobile ? '30%' : '180px'}>Price</Td>
            { !isMobile ? <><Td>Amount({quota?.symbol?.replace("WFIL", 'FIL')})</Td> </> : null}
            <Td width={isMobile ? '30%' : '180px'}>Volume({base?.symbol?.replace("WFIL", 'FIL')})</Td>
            {/* <Td>DEX</Td> */}
             <Td  style={{ textAlign: 'right', maxWidth: isMobile ? '3rem' : 'auto' }}>User</Td>
          </Tr>
        </TableHeader>

        {
          map(data, (item: any, index) => (
            <Tr key={index}>
              <Td>{dayjs(Number(`${item.blocktime}000`)).format('YYYY-MM-DD HH:mm:ss')}</Td>
              {!isMobile && <Td className={clsx({ Buy: item.side === 0, Sell: item.side === 1 })}>{item.side === 0 ? 'Buy' : 'Sell'}</Td>}
              <Td className={clsx({ Buy: item.side === 0, Sell: item.side === 1 })}>{parsePrice(item.price)}</Td>
             {!isMobile && <Td>{formatPrice(utils.formatEther(item.amount))}</Td> }
              <Td >{formatPrice(utils.formatEther(item.volume))}</Td>
              {/* <Td>{item.address.slice(0, 4)}</Td> */}
              <Td style={{ maxWidth: isMobile ? '3rem' : 'auto' }}>
                <a target='blank' rel='nofollow noopener noreferrer' href={`https://filscan.io/address/${item.from}`}>{formatAddress(item.from, isMobile ? 4 : 6, isMobile ? 4:7)}</a>
              </Td>
    
            </Tr>
          ))
        }
      </Table>
      {data.length === 0 ? <div style={{ textAlign: "center", marginTop: "2rem" }}>No data</div> : null}
    </Fragment>
  );
}