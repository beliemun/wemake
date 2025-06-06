import { Hero } from "~/common/components/hero";
import { Form, redirect, useNavigation } from "react-router";
import InputPair from "~/common/components/input-pair";
import SelectPair from "~/common/components/select-pair";
import FilePair from "~/common/components/file-pair";
import { Button } from "~/common/components/ui/button";
import type { Route } from "./+types/categories-page";
import { z } from "zod";
import { getSignedInUserId } from "~/features/users/queries";
import { makeSsrClient } from "~/supabase-client";
import { getCategories } from "../queries";
import { createProduct } from "../mutaitons";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Submit Product | Wemake" },
    { name: "description", content: "Submit a new product" },
  ];
};

const formSchema = z.object({
  name: z.string().min(1),
  tagline: z.string().min(1),
  url: z.string().min(1),
  how_it_works: z.string().min(1),
  description: z.string().min(1),
  // category가 action에는 string으로 도착하지만, category_id는 number이기 때문에 coerce를 사용하여 타입을 변환.
  category: z.coerce.number(),
  icon: z
    .instanceof(File)
    .refine((file) => file.size <= 2097152 && file.type.startsWith("image/"), {
      message: "Icon must be an image file under 2MB",
    }),
});

export const action = async ({ request }: Route.ActionArgs) => {
  const { client } = makeSsrClient(request);
  const userId = await getSignedInUserId(client);
  const { success, data, error } = formSchema.safeParse(
    Object.fromEntries(await request.formData())
  );
  if (!success) {
    return { formErrors: error.flatten().fieldErrors };
  }
  const { icon, ...rest } = data;
  const { data: iconData, error: iconError } = await client.storage
    .from("icons")
    .upload(`${userId}/${Date.now()}`, icon, {
      contentType: icon.type,
      upsert: false,
    });
  if (iconError) {
    return { formErrors: { icon: ["Failed to upload icon"] } };
  }
  const {
    data: { publicUrl },
  } = client.storage.from("icons").getPublicUrl(iconData.path);
  const { product_id } = await createProduct(client, {
    ...rest,
    userId,
    icon: publicUrl,
  });
  return redirect(`/products/${product_id}`);
};

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client } = makeSsrClient(request);
  const userId = await getSignedInUserId(client);
  const categories = await getCategories(client);
  return { categories };
};

export default function SubmitPage({ loaderData, actionData }: Route.ComponentProps) {
  const { state } = useNavigation();
  const isSubmitting = state === "submitting";
  return (
    <main className="container mx-auto px-4 py-8">
      <Hero title="Submit Product" />
      <Form
        method="post"
        encType="multipart/form-data"
        className="grid grid-cols-2 gap-10 max-w-screen-lg mx-auto"
      >
        <div className="flex flex-col gap-6 p-6">
          <InputPair
            id="name"
            name="name"
            label="Name"
            description="This is name of your product"
            required
          />
          {actionData && "formErrors" in actionData && (
            <p className="text-red-500">{(actionData as any).formErrors.name.join(", ")}</p>
          )}
          <InputPair
            id="tagline"
            name="tagline"
            label="Tagline"
            type="text"
            description="60 characters or less"
            placeholder="A concise description of your product"
            required
          />
          {actionData && "formErrors" in actionData && (
            <p className="text-red-500">{(actionData as any).formErrors.tagline.join(", ")}</p>
          )}
          <InputPair
            id="url"
            name="url"
            label="URL"
            type="url"
            description="This is url of your product"
            placeholder="https://example.com"
            required
          />
          {actionData && "formErrors" in actionData && (
            <p className="text-red-500">{(actionData as any).formErrors.url.join(", ")}</p>
          )}
          <InputPair
            id="how_it_works"
            name="how_it_works"
            label="How it works"
            description="This is how it works of your product"
            placeholder="A concise description of how it works"
            required
            textArea
          />
          {actionData && "formErrors" in actionData && (
            <p className="text-red-500">{(actionData as any).formErrors.how_it_works.join(", ")}</p>
          )}
          <InputPair
            id="description"
            name="description"
            label="Description"
            description="This is description of your product"
            placeholder="A concise description of your product"
            required
            textArea
          />
          {actionData && "formErrors" in actionData && (
            <p className="text-red-500">{(actionData as any).formErrors.description.join(", ")}</p>
          )}
          <SelectPair
            name="category"
            defaultValue="Other"
            label="Category"
            description="This is category of your product"
            required
            placeholder="Select a category"
            options={loaderData.categories.map((category) => ({
              label: category.name,
              value: category.category_id.toString(),
            }))}
          />
          {actionData && "formErrors" in actionData && (
            <p className="text-red-500">{(actionData as any).formErrors.category.join(", ")}</p>
          )}
        </div>
        <div className="flex flex-col gap-6 p-6">
          <FilePair name="icon" label="Icon" description="This is icon of your product." />
          {actionData && "formErrors" in actionData && (
            <p className="text-red-500">{(actionData as any).formErrors.icon.join(", ")}</p>
          )}
        </div>
        <Button className={"cursor-pointer"} type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Uploading..." : "Upload"}
        </Button>
      </Form>
    </main>
  );
}
