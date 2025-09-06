import React from "react";
import { Outlet } from "react-router-dom";
export default function AuthLayout() {
  return (
    <div>
      <header>
        <h1>Auth Layout Header</h1>
      </header>
      <Outlet />
      <footer>
        <p>Auth Layout Footer</p>
      </footer>
    </div>
  );
}
