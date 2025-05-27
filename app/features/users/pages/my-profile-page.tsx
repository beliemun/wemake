import { Form, redirect } from "react-router";
import type { Route } from "./+types/my-profile-page";

export function loader() {
  return redirect("/users/brian");
}

export const meta: Route.MetaFunction = () => {
  return [
    {
      title: "내 프로필",
    },
  ];
};

export default function MyProfilePage() {
  return <div></div>;
}
