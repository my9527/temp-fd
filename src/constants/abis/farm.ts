import { Interface } from '@ethersproject/abi'
import FARM_ABI from './farm.json'

const FARM_INTERFACE = new Interface(FARM_ABI)


export { FARM_INTERFACE, FARM_ABI }
