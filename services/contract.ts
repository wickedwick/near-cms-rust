import * as nearAPI from 'near-api-js'
import { NearUser } from '../types/app'
import { NetworkConfiguration } from "../types/configuration"
import { NearContract } from '../types/contract'

export const initContract = async (): Promise<NearContract> => {
  const networkConfiguration: NetworkConfiguration = {
    networkId: 'testnet',
    nodeUrl: 'https://rpc.testnet.near.org',
    contractName: 'dev-1651110034797-23872797125041',
    walletUrl: 'https://wallet.testnet.near.org',
    helperUrl: 'https://helper.testnet.near.org'
  }

  const keyStore = new nearAPI.keyStores.BrowserLocalStorageKeyStore() 
  const near: nearAPI.Near = await nearAPI.connect({ keyStore, ...networkConfiguration })
  const walletConnection = new nearAPI.WalletConnection(near, '')
  let currentUser: NearUser | undefined

  if (walletConnection.getAccountId()) {
    currentUser = {
      accountId: walletConnection.getAccountId(),
      balance: (await walletConnection.account().state()).amount,
    }
  }
 
  const viewMethods: string[] = ['get_content_type', 'get_content_types', 'get_contents', 'get_content', 'get_user_role', 'getUser', 'getUsers', 'get_client_registry']
  const changeMethods: string[] = ['set_content_type', 'set_content', 'set_user_role', 'set_client_registry']

  const contract = new nearAPI.Contract(
    walletConnection.account(),
    networkConfiguration.contractName,
    {
      viewMethods,
      changeMethods,
    }
  )

  return { contract, currentUser, walletConnection }
}
