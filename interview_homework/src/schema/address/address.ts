import { Addresses, Address, Args, MutationArgs } from './types';
import { GraphQLError } from 'graphql';
import path from 'path';
import fs from 'fs';


const dataPath = path.resolve('data/addresses.json');

const readAddresses = (): Addresses =>
  JSON.parse(fs.readFileSync(dataPath, 'utf8'));

const writeAddresses = (data: Addresses) =>
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf8');


export const getAddress = async (_: any, args: Args, context: any): Promise<Address> => {
  context.logger.info('getAddress', 'Enter resolver');
  const addresses = readAddresses();
  const address = addresses[args.username];

  if (address) {
    context.logger.info('getAddress', 'Returning address');
    return address;
  }
  context.logger.error('getAddress', 'No address found');
  throw new GraphQLError('No address found in getAddress resolver');
};

export const addAddress = async (_: any, args: MutationArgs, context: any): Promise<Address> => {
  context.logger.info('addAddress', 'Enter resolver');
  const addresses = readAddresses();
  const username = args.username;
  const address = args.address;

  if (addresses[username]) {
    context.logger.error('addAddress', 'Address already exists');
    throw new GraphQLError('Address already exists for that user');
  }

  if (address) {
    addresses[username] = address;
    writeAddresses(addresses);
    context.logger.info('addAddress', 'adding address');
    return address;
  }

  context.logger.error('addAddress', 'Error adding address');
  throw new GraphQLError('Error adding address');
};
