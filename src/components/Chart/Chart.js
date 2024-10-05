import React from "react";
import ChartBar from "./ChartBar";
import './Chart.css'

export default function Chart(prop) {

    
  return (
    <div className="chart">
      {prop.dataPoints.map((dataPoint) => (
        <ChartBar
          key={dataPoint.label}
          label={dataPoint.label}
          value={dataPoint.value}
          maxValue={dataPoint.value}
        />
      ))}
    </div>
  );
}
