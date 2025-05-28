import {
  createBrowserClient,
  createServerClient,
  parseCookieHeader,
  serializeCookieHeader,
} from "@supabase/ssr";
import type { MergeDeep, SetNonNullable, SetFieldType } from "type-fest";
import type { Database as SupabaseDatabase } from "database.types";

// Supabase 에서 Typescript Codegen 할 때 불필요한 null 값을 제거하기 위해 type-fest 의 MergeDeep 사용
export type Database = MergeDeep<
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
        gpt_ideas_view: {
          Row: SetNonNullable<SupabaseDatabase["public"]["Views"]["gpt_ideas_view"]["Row"]>;
        };
        product_overview_view: {
          Row: SetNonNullable<SupabaseDatabase["public"]["Views"]["product_overview_view"]["Row"]>;
        };
        community_post_detail: {
          Row: SetNonNullable<SupabaseDatabase["public"]["Views"]["community_post_detail"]["Row"]>;
        };
      };
    };
  }
>;

const browserClient = createBrowserClient<Database>(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

export const makeSsrClient = (request: Request) => {
  const headers = new Headers();
  const ssrClient = createServerClient<Database>(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          const cookies = parseCookieHeader(request.headers.get("Cookie") ?? "");
          // undefined가 아닌 value만 필터링
          return cookies.filter(
            (cookie): cookie is { name: string; value: string } => typeof cookie.value === "string"
          );
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            headers.append("Set-Cookie", serializeCookieHeader(name, value, options))
          );
        },
      },
    }
  );

  return {
    client: ssrClient,
    headers,
  };
};
