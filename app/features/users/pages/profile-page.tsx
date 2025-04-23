import type { Route } from "./+types/profile-page";

export const meta: Route.MetaFunction = () => {
  return [{ title: "프로필 | WeMake" }];
};

export default function ProfilePage() {
  return (
    <div className="max-w-screen-md flex flex-col space-y-10">
      <div className="space-y-2">
        <h4 className="text-lg font-bold">Headline</h4>
        <p className="text-muted-foreground">
          I'm a product designer based on the UK, I like doing product design, design systems and
          design tokens.
        </p>
      </div>
      <div className="space-y-2">
        <h4 className="text-lg font-bold">Bio</h4>
        <p className="text-muted-foreground">
          I'm a product designer based on the UK, I like doing product design, design systems and
          design tokens. And I want to make a product that helps people to learn design. So I'm
          currently working on it.
        </p>
      </div>
    </div>
  );
}
