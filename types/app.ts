export type NearUser = {
  accountId: string
  balance: string
}

export type ContentType = {
  name: string
  description: string
  fields: string[]
}

export type Content = {
  name: string
  slug: string
  content_type: ContentType
  is_public: boolean
  is_encrypted: boolean
  owner: string
}

export type UserRole = {
  account_id: string
  role: number
}
