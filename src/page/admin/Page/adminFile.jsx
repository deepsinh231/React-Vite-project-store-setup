"use client";

import React from "react";
import DemoTable from "../default/demoTable";
import { useLocation } from "react-router-dom";

export default function DataTableDemo() {
  const location = useLocation();
  return (
    <div className="admin-file">
      <h1 className="text-2xl font-bold mb-4">
        {location?.pathname.split("/").map((key) => `${key?.toUpperCase()}`).join(" ")}
      </h1>
      <DemoTable />
    </div>
  );
}
