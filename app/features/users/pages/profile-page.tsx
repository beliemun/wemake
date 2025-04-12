import type { Route } from "./+types/profile-page";

export const meta: Route.MetaFunction = () => {
  return [
    {
      title: "프로필",
    },
  ];
};

export default function ProfilePage() {
  return <div>프로필 페이지</div>;
}
