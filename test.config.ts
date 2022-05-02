import * as nearAPI from 'near-api-js'
import { ContractMethods } from 'near-api-js/lib/contract'

jest.mock('near-api-js', () => {
  class MockWalletConnection {
    constructor(near: nearAPI.Near, appKeyPrefix: string | null) {}
    getAccountId() {
      return 'test_account_id';
    }
    account() {
      return {
        state() {
          return {
            amount: '1000000000000',
          };
        },
      };
    }
  }

  class MockContract {
    constructor(account: nearAPI.Account, contractName: string, options: ContractMethods) {}
  }

  return {
    keyStores: {
        BrowserLocalStorageKeyStore: jest.fn(),
    },
    WalletConnection: MockWalletConnection,
    Contract: MockContract,
    connect: (config: nearAPI.ConnectConfig) => {
      return {
        account: () => {
          return {
            state: () => {
              return {
                amount: '1000000000000000000',
              };
            },
          };
        },
      };
    }
  }
})
