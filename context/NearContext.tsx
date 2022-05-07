import * as nearAPI from 'near-api-js';
import React from 'react';
import { UserRole } from '../types/app';
import { NetworkConfiguration } from '../types/configuration';
import { CmsContract } from '../types/contract';

export const NearContext = React.createContext({
  contract: null,
  currentUser: undefined,
  nearConfig: null,
  wallet: null,
  setCurrentUser: () => {},
} as {
  contract: CmsContract | null,
  currentUser: UserRole | undefined,
  wallet: nearAPI.WalletConnection | null,
  nearConfig: NetworkConfiguration | null,
  setCurrentUser: (user: UserRole | undefined) => void,
})
