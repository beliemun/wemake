import { createClient } from "@supabase/supabase-js";
import type { MergeDeep, SetNonNullable, SetFieldType } from "type-fest";
import type { Database as SupabaseDatabase } from "database.types";

// Supabase 에서 Typescript Codegen 할 때 불필요한 null 값을 제거하기 위해 type-fest 의 MergeDeep 사용
type Database = MergeDeep<
  SupabaseDatabase,
  {
    public: {
      Views: {
        community_post_list_view: {
          Row: SetFieldType<
            SetNonNullable<SupabaseDatabase["public"]["Views"]["community_post_list_view"]["Row"]>,
            "author_avatar",
            string | null
          >;
        };
      };
    };
  }
>;

const client = createClient<Database>(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!);

export default client;
