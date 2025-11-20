import { getAddress, addAddress } from "./address/address";
import { Address, Args, MutationArgs } from "./address/types";

export const resolvers = {
  Query: {
    address: async (parent: any, args: Args, context: any, info: any): Promise<Address> => {
      return await getAddress(parent, args, context);
    },
  },
  Mutation: {
    addAddress: async (parent: any, args: MutationArgs, context: any, info: any): Promise<Address> => {
    return await addAddress(parent, args, context)
    }
  }
};
