import React from "react";
import { List } from "antd";
import StatCard from "./StatCard";

export default ({ dau, mau }) => {
  console.log(dau);
  const data = [
    {
      title: "Daily Active Users",
      value: dau || 0,
      bg: "#89ccb9",
      font: "white",
      icon: "user"
    },
    {
      title: "Monthly Active Users",
      value: mau || 0,
      bg: "#89ccb9",
      font: "white",
      icon: "user"
    },
    {
      title: "Monthly Active Users",
      value: "20",
      bg: "#89ccb9",
      font: "white",
      icon: "user"
    },
    {
      title: "Errors",
      value: "20",
      bg: "#eafdd3",
      font: "#119b7c",
      icon: "exclamation-circle-o"
    }
  ];
  return (
    <List
      grid={{
        gutter: 16,
        xs: 1,
        sm: 2,
        md: 4,
        lg: 4,
        xl: 4,
        xxl: 3
      }}
      dataSource={data}
      renderItem={item => (
        <List.Item>
          <StatCard {...item} />
        </List.Item>
      )}
    />
  );
};
