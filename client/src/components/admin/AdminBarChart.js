import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function AdminBarChart(props) {
  const data = [
    {
      name: "Blogs",

      amt: props.data.blogs?.length,
    },
    {
      name: "Reviews",

      amt: props.data.reviews?.length,
    },
    {
      name: "Users",

      amt: props.data.users?.length,
    },
  ];
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 50,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="amt" fill="#3D506E" />
      </BarChart>
    </ResponsiveContainer>
  );
}
