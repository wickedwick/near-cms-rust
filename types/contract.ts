import * as nearAPI from 'near-api-js'
import { Content, ContentType, NearUser, UserRole } from './app'

export type NearContract = {
  contract: nearAPI.Contract
  currentUser: NearUser | undefined
  walletConnection: nearAPI.WalletConnection
}

export interface CmsContract extends nearAPI.Contract {
  // getUsers: () => Promise<UserRole[]>
  get_user_role: ({ account_id }: { account_id: string }) => Promise<UserRole>
  set_user_role: ({ account_id, user_to_add, role }: { account_id: string, user_to_add: string, role: number }) => Promise<void>
  get_content: ({ slug }: { slug: string }) => Promise<Content>
  set_content: ({ name, content_type_name, is_public, is_encrypted}: { name: string, content_type_name: string, is_public: boolean, is_encrypted: boolean }) => Promise<void>
  //deleteContent: ({ content }: { content: Content }) => Promise<void>
  // getMediaBySlug: ({ slug }: { slug: string }) => Promise<Media>
  // getMedia: () => Promise<Media[]>
  // setMedia: ({ args, callbackUrl }: { args: { media: Media }, callbackUrl: string }) => Promise<void>
  //deleteMedia: ({ args, callbackUrl }: { args: { slug: string }, callbackUrl: string }) => Promise<void>
  get_contents: () => Promise<Content[]>
  // getPublicContent: ({ slug }: { slug: string }) => Promise<Content>
  // getPublicContents: () => Promise<Content[]>
  // getClient: ({ slug }: { slug: string }) => Promise<Client>
  // setClient: ({ args, callbackUrl }: { args: { clientUpdate: Client }, callbackUrl: string }) => Promise<void>
  // getClients: () => Promise<Client[]>
  set_content_type: ({ name, description, fields}: {name: string, description: string, fields: string[]}) => Promise<void>
  get_content_type: ({ name }: { name: string }) => Promise<ContentType>
  get_content_types: () => Promise<ContentType[]>
  // deleteContentType: ({ name }: { name: string }) => Promise<void>
  // getUserRole: ({ name }: { name: string }) => Promise<UserRole>
}