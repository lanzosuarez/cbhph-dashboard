import React from "react";
import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line
} from "recharts";
import { getRandomColor } from "../../helpers";
import { CMS_ACTIVITIES } from "../../globals";

const CMSActivities = props => {
  return (
    <div>
      <h4>CMS Activity Traffic</h4>
      <LineChart
        width={500}
        height={250}
        data={props.data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend margin={{ top: 100 }} />
        {CMS_ACTIVITIES.map(act => (
          <Line
            type="monotone"
            key={act}
            dataKey={act}
            stroke={getRandomColor()}
          />
        ))}
      </LineChart>
    </div>
  );
};

export default CMSActivities;
