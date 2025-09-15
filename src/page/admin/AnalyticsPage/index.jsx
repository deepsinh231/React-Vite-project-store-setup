import React from "react";
import ChartBarInteractive from "./page";
import { ChartBarDefault } from "./page1";
import { ChartBarHorizontal } from "./page2";
import { ChartLineInteractive } from "./line1";
import { ChartLineMultiple } from "./line2";
import { ChartLineDotsColors } from "./line3";
import { ChartLineLabel } from "./line4";
import { ChartPieStacked } from "./pie1";
import { ChartPieInteractive } from "./pie2";
import { ChartTooltipAdvanced } from "./Tool";

export default function AnalyticsPage() {
  return (
    <div className="grid grid-cols-3 gap-6 p-3">
      <div className="col-span-3">
        <ChartBarInteractive />
      </div>
      <div className="">
        <ChartBarDefault />
      </div>
      <div>
        <ChartBarHorizontal />
      </div>
      <div className="col-span-3">
        <ChartLineInteractive />
      </div>
      <div>
        <ChartLineMultiple />
      </div>
      <div>
        <ChartLineDotsColors />
      </div>
      <div>
        <ChartLineLabel />
      </div>
      <div>
        <ChartPieStacked />
      </div>
      <div>
        <ChartPieInteractive />
      </div>
      <div>
        <ChartTooltipAdvanced />
      </div>
    </div>
  );
}
