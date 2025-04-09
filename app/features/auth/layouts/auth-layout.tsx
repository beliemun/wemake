import { Outlet } from "react-router";

export default function AuthLayout() {
  return (
    <div className="grid grid-cols-3 h-screen">
      <div className="col-span-2 bg-gradient-to-br from-primary/50 via-primary to-secondary" />
      <div className="col-span-1 flex items-center justify-center p-10">
        <Outlet />
      </div>
    </div>
  );
}
