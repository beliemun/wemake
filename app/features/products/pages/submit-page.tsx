import { Hero } from "~/common/components/hero";
import type { Route } from "./+types/submit-page";
import { Form } from "react-router";
import { Input } from "~/common/components/ui/input";
import { Label } from "~/common/components/ui/label";
import InputPair from "~/common/components/input-pair";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/common/components/ui/select";
import SelectPair from "~/common/components/select-pair";
export const meta: Route.MetaFunction = () => {
  return [
    { title: "Submit Product | Wemake" },
    { name: "description", content: "Submit a new product" },
  ];
};

export default function SubmitPage({ loaderData }: Route.ComponentProps) {
  return (
    <main className="container mx-auto px-4 py-8">
      <Hero title="Submit Product" />
      <Form className="grid grid-cols-2 gap-10 max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-6 p-6">
          <InputPair id="name" label="Name" description="This is name of your product" required />
          <InputPair
            id="tagline"
            label="Tagline"
            type="text"
            description="60 characters or less"
            placeholder="A concise description of your product"
            required
          />
          <InputPair
            id="url"
            label="URL"
            type="url"
            description="This is url of your product"
            placeholder="https://example.com"
            required
          />
          <InputPair
            id="description"
            label="Description"
            description="This is description of your product"
            placeholder="A concise description of your product"
            required
            textArea
          />
          <SelectPair
            name="category"
            label="Category"
            description="This is category of your product"
            required
            placeholder="Select a category"
            options={[
              { label: "Option 1", value: "option-1" },
              { label: "Option 2", value: "option-2" },
              { label: "Option 3", value: "option-3" },
            ]}
          />
        </div>
      </Form>
    </main>
  );
}
