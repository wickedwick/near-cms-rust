import * as nearAPI from 'near-api-js';
import React from 'react';
import { UserRole } from '../types/app';
import { NetworkConfiguration } from '../types/configuration';

export const NearContext = React.createContext({
  contract: null,
  currentUser: undefined,
  nearConfig: null,
  wallet: null,
  setCurrentUser: () => {},
} as {
  contract: nearAPI.Contract | null,
  currentUser: UserRole | undefined,
  wallet: nearAPI.WalletConnection | null,
  nearConfig: NetworkConfiguration | null,
  setCurrentUser: () => void,
})
