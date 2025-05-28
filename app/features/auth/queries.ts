import { makeSsrClient } from "~/supabase-client";

export const checkUserNameExists = async ({ username }: { username: string }, request: Request) => {
  const { client } = makeSsrClient(request);
  const { error } = await client.from("profiles").select("*").eq("username", username).single();

  if (error) {
    return { exists: false };
  }

  return { exists: true };
};
