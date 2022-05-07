# CMS Schema Overview

## Content Types
1. Users have their own content types. LookupMap<string, UnorderedMap<ContentType>>.
2. Get the users content types by their account_id as the key.
3. Get the content types by their name as the key from the users content types.
