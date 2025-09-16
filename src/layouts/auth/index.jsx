import React from "react";
import { Outlet } from "react-router-dom";
export default function AuthLayout() {
  return (
    <div>
      <header>
        <h1 className="text-center text-2xl font-extrabold">
          Riddhi Corporate Services Limited
        </h1>
      </header>
      <Outlet />
    </div>
  );
}
