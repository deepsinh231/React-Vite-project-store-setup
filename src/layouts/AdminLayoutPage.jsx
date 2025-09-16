import React from "react";
import { Outlet } from "react-router-dom";

export default function AdminLayoutPage() {
  return (
    <div className="px-4 py-4">
      <Outlet />
    </div>
  );
}
