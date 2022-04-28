import * as nearAPI from 'near-api-js';
import { NetworkConfiguration } from '../types/configuration';
import '../styles/globals.css';
import type { AppProps } from 'next/app'
import { NearUser, UserRole } from '../types/app';
import { useEffect, useState } from 'react';
import { NearContext } from '../context/NearContext';
import { CmsContract } from '../types/contract';
  
const initContract = async () => {
  const near = await nearAPI.connect({ keyStore, ...networkConfiguration })
  const walletConnection = new nearAPI.WalletConnection(near, '')
  let currentUser

  const networkConfiguration: NetworkConfiguration = {
    networkId: 'testnet',
    nodeUrl: 'https://rpc.testnet.near.org',
    contractName: 'wickham.testnet',
    walletUrl: 'https://wallet.testnet.near.org',
    helperUrl: 'https://helper.testnet.near.org'
  }

  if (walletConnection.getAccountId()) {
    currentUser = {
      accountId: walletConnection.getAccountId(),
      balance: (await walletConnection.account().state()).amount,
    } as NearUser
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

const MyApp = async ({ Component, pageProps }: AppProps) => {
  const [currentUser, setCurrentUser] = useState<UserRole | undefined>(undefined)
  const [cmsContract, setContract] = useState<CmsContract | null>(null)
  const [nearConfig, setNearConfig] = useState<NetworkConfiguration | null>(null)
  const [walletConnection, setWalletConnection] = useState<nearAPI.WalletConnection | null>(null)
  const keyStore = new nearAPI.keyStores.BrowserLocalStorageKeyStore() 

  const setDefaultUser = (accountId: string) => {
    const userRole: UserRole = {
      account_id: accountId,
      role: 0,
    }

    setCurrentUser(userRole)
  }

  useEffect(() => {  
    initContract().then(({ contract, currentUser, walletConnection }) => {
      setNearConfig(nearConfig)
      setWalletConnection(walletConnection)
      setContract(contract as CmsContract)
      
      currentUser && cmsContract && (
        cmsContract.get_user_role({ account_id: currentUser.accountId })
          .then((user: UserRole) => {
            if (!user) {
              setDefaultUser(currentUser.accountId)
            } else {
              setCurrentUser(user)
            }
          })
      )
      
      // if (ipfs) return

      // instantiateIpfs(setIpfs)
    })
  }, [cmsContract, nearConfig])

  const initialState = {
    contract: cmsContract,
    currentUser,
    nearConfig,
    wallet: walletConnection,
    setCurrentUser,
  }

  return (
    <NearContext.Provider value={initialState}>
        <Component {...pageProps} />
    </NearContext.Provider>
  )
}

export default MyApp
