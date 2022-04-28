use nanoid::nanoid;
use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::collections::{LookupMap, UnorderedMap};
use near_sdk::{env, near_bindgen};

near_sdk::setup_alloc!();

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize)]
pub struct Cms {
    content_types: UnorderedMap<String, ContentType>,
    content: UnorderedMap<String, Content>,
    user_registry: LookupMap<String, Vec<UserRole>>,
    client_registry: LookupMap<String, Vec<String>>,
}

// #[near_bindgen]
impl Default for Cms {
    fn default() -> Self {
        Self {
            content_types: UnorderedMap::new(b"ct".to_vec()),
            content: UnorderedMap::new(b"c".to_vec()),
            user_registry: LookupMap::new(b"ur".to_vec()),
            client_registry: LookupMap::new(b"cr".to_vec()),
        }
    }
}

#[near_bindgen]
impl Cms {
    pub fn set_content_type(&mut self, name: String, description: String, fields: Vec<String>) {
        let name_clone = name.clone();
        let mut fields_lookup_map = LookupMap::new(b"f".to_vec());

        for field in fields {
            fields_lookup_map.insert(&name_clone, &field);
        }

        self.content_types.insert(
            &name_clone,
            &ContentType {
                name,
                description,
                fields: fields_lookup_map,
            },
        );
    }

    #[result_serializer(borsh)]
    pub fn get_content_type(&self, name: String) -> Option<ContentType> {
        return self.content_types.get(&name);
    }

    #[result_serializer(borsh)]
    pub fn get_content_types(&self) -> Vec<ContentType> {
        return self.content_types.values_as_vector().to_vec();
    }

    #[result_serializer(borsh)]
    pub fn set_content(
        &mut self,
        name: String,
        content_type_name: String,
        is_public: bool,
        is_encrypted: bool,
    ) -> String {
        let account_id = env::signer_account_id();
        let content_type = self.content_types.get(&content_type_name).unwrap();
        let uuid = nanoid!(); //Uuid::new_v4().to_hyphenated().to_string();

        let content = Content::new(
            name,
            uuid,
            content_type,
            is_public,
            is_encrypted,
            account_id,
        );

        let content_slug = content.slug.clone();
        self.content.insert(&content.slug, &content);
        return content_slug;
    }

    #[result_serializer(borsh)]
    pub fn get_content(&self, slug: String) -> Option<Content> {
        return self.content.get(&slug);
    }

    #[result_serializer(borsh)]
    pub fn get_contents(&self) -> Vec<Content> {
        return self.content.values_as_vector().to_vec();
    }

    pub fn set_user_role(&mut self, account_id: String, user_to_add: String, role: i32) {
        let mut user_roles = self.user_registry.get(&account_id).unwrap_or_default();

        // if user_roles contains a user with the same name, remove it
        let mut index = 0;
        for user_role in user_roles.iter() {
            if user_role.account_id == user_to_add {
                user_roles.remove(index);
                break;
            }
            index += 1;
        }

        user_roles.push(UserRole {
            account_id: user_to_add,
            role,
        });

        self.user_registry.insert(&account_id, &user_roles);
    }

    #[result_serializer(borsh)]
    pub fn get_user_role(&self, account_id: String) -> Option<Vec<UserRole>> {
        return self.user_registry.get(&account_id);
    }

    pub fn set_client_registry(&mut self, account_id: String, client_to_add: String) {
        let mut clients = self.client_registry.get(&account_id).unwrap_or_default();

        if clients.contains(&client_to_add) {
            return;
        }

        clients.push(client_to_add);
        self.client_registry.insert(&account_id, &clients);
    }

    pub fn get_client_registry(&self, account_id: String) -> Option<Vec<String>> {
        return self.client_registry.get(&account_id);
    }
}

#[derive(BorshDeserialize, BorshSerialize)]
pub struct ContentType {
    pub name: String,
    pub description: String,
    pub fields: LookupMap<String, String>,
}

impl ContentType {
    pub fn new(name: String, description: String) -> Self {
        Self {
            name,
            description,
            fields: LookupMap::new(b"f".to_vec()),
        }
    }
}

#[derive(BorshDeserialize, BorshSerialize)]
pub struct Content {
    pub name: String,
    pub slug: String,
    pub content_type: ContentType,
    pub is_public: bool,
    pub is_encrypted: bool,
    pub owner: String,
    created_at: u64,
    updated_at: u64,
}

impl Content {
    pub fn new(
        name: String,
        slug: String,
        content_type: ContentType,
        is_public: bool,
        is_encrypted: bool,
        owner: String,
    ) -> Self {
        Self {
            name,
            slug,
            content_type,
            is_public,
            is_encrypted,
            owner,
            created_at: near_sdk::env::block_timestamp(),
            updated_at: near_sdk::env::block_timestamp(),
        }
    }
}

#[derive(BorshDeserialize, BorshSerialize)]
pub struct UserRole {
    pub account_id: String,
    pub role: i32,
}

impl UserRole {
    pub fn new(account_id: String, role: i32) -> Self {
        Self { account_id, role }
    }
}

#[cfg(not(target_arch = "wasm32"))]
#[cfg(test)]
mod tests {
    use super::*;
    use near_sdk::MockedBlockchain;
    use near_sdk::{testing_env, VMContext};

    fn get_context(input: Vec<u8>, is_view: bool) -> VMContext {
        VMContext {
            current_account_id: "alice_near".to_string(),
            signer_account_id: "bob_near".to_string(),
            signer_account_pk: vec![0, 1, 2],
            predecessor_account_id: "carol_near".to_string(),
            input,
            block_index: 0,
            block_timestamp: 0,
            account_balance: 0,
            account_locked_balance: 0,
            storage_usage: 0,
            attached_deposit: 0,
            prepaid_gas: 10u64.pow(18),
            random_seed: vec![0, 1, 2],
            is_view,
            output_data_receivers: vec![],
            epoch_height: 0,
        }
    }

    #[test]
    fn test_get_set_content_type() {
        let context = get_context(vec![], false);
        testing_env!(context);
        let mut cms = Cms::default();
        cms.set_content_type(
            "test_content_type".to_string(),
            "test_content_type_description".to_string(),
            Vec::<String>::new(),
        );
        let content_type_from_db = cms.get_content_type("test_content_type".to_string());
        assert_eq!(
            "test_content_type".to_string(),
            content_type_from_db.unwrap().name
        );

        cms.set_content_type(
            "test_content_type".to_string(),
            "test_content_type_description".to_string(),
            Vec::<String>::new(),
        );
    }

    #[test]
    fn test_get_set_content() {
        let context = get_context(vec![], false);
        testing_env!(context);

        let mut cms = Cms::default();
        cms.set_content_type(
            "test_content_type_name".to_string(),
            "test_content_type_description".to_string(),
            Vec::<String>::new(),
        );

        let slug = cms.set_content(
            "test_name".to_string(),
            "test_content_type_name".to_string(),
            false,
            true,
        );
        let content = cms.get_content(slug.to_string());
        assert_eq!(
            content.as_ref().unwrap().content_type.name,
            "test_content_type_name".to_string()
        );
        assert_eq!(content.as_ref().unwrap().is_public, false);
        assert_eq!(content.as_ref().unwrap().is_encrypted, true);
        assert_eq!(content.as_ref().unwrap().created_at, 0);
        assert_eq!(content.as_ref().unwrap().updated_at, 0);
    }

    #[test]
    fn test_get_content_types() {
        let context = get_context(vec![], false);
        testing_env!(context);

        let mut cms = Cms::default();

        cms.set_content_type(
            "test_content_type_name".to_string(),
            "test_content_type_description".to_string(),
            Vec::<String>::new(),
        );
        cms.set_content_type(
            "test_content_type_name_2".to_string(),
            "test_content_type_description".to_string(),
            Vec::<String>::new(),
        );
        cms.set_content_type(
            "test_content_type_name_3".to_string(),
            "test_content_type_description".to_string(),
            Vec::<String>::new(),
        );
        let mut content_types = cms.get_content_types();
        assert_eq!(content_types.len(), 3);

        cms.set_content_type(
            "test_content_type_name".to_string(),
            "test_content_type_description".to_string(),
            Vec::<String>::new(),
        );
        content_types = cms.get_content_types();
        assert_eq!(content_types.len(), 3);
    }

    #[test]
    fn test_get_contents() {
        let context = get_context(vec![], false);
        testing_env!(context);

        let mut cms = Cms::default();

        cms.set_content_type(
            "test_content_type_name".to_string(),
            "test_content_type_description".to_string(),
            Vec::<String>::new(),
        );
        cms.set_content(
            "test_name_2".to_string(),
            "test_content_type_name".to_string(),
            false,
            true,
        );
        cms.set_content(
            "test_name_3".to_string(),
            "test_content_type_name".to_string(),
            false,
            true,
        );
        cms.set_content(
            "test_name_4".to_string(),
            "test_content_type_name".to_string(),
            false,
            true,
        );
        let contents = cms.get_contents();
        assert_eq!(contents.len(), 3);
    }

    #[test]
    fn test_get_set_user_role() {
        let context = get_context(vec![], false);
        testing_env!(context);

        let mut cms = Cms::default();
        cms.set_user_role("test_user".to_string(), "test_user_id".to_string(), 0);
        cms.set_user_role("test_user".to_string(), "test_user_id_1".to_string(), 1);
        cms.set_user_role("test_user".to_string(), "test_user_id_2".to_string(), 2);
        let mut user_role_vec = cms.get_user_role("test_user".to_string());
        assert_eq!(user_role_vec.unwrap().len(), 3);

        // Inserting the same user role again should not increase the length of the vector
        cms.set_user_role("test_user".to_string(), "test_user_id".to_string(), 0);
        user_role_vec = cms.get_user_role("test_user".to_string());
        assert_eq!(user_role_vec.unwrap().len(), 3);
    }

    #[test]
    fn test_get_set_client_registry() {
        let context = get_context(vec![], false);
        testing_env!(context);

        let mut cms = Cms::default();
        cms.set_client_registry("test_client".to_string(), "test_client_id".to_string());
        cms.set_client_registry("test_client".to_string(), "test_client_id_1".to_string());
        cms.set_client_registry("test_client".to_string(), "test_client_id_2".to_string());
        cms.set_client_registry("test_client".to_string(), "test_client_id_3".to_string());
        let mut client_registry = cms.get_client_registry("test_client".to_string());
        assert_eq!(client_registry.unwrap().len(), 4);

        // Inserting the same client id again should not change the length of the vector
        cms.set_client_registry("test_client".to_string(), "test_client_id_3".to_string());
        client_registry = cms.get_client_registry("test_client".to_string());
        assert_eq!(client_registry.unwrap().len(), 4);
    }
}
