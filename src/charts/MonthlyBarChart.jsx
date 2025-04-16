import React from "react";
import { useSelector } from "react-redux";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import dayjs from "dayjs";

const MonthlyBarChart = () => {
  const { items: transactions } = useSelector((state) => state.transactions);

  // Group transactions by month
  const monthlyData = transactions.reduce((acc, transaction) => {
    const month = dayjs(transaction.date).format("MMM YYYY"); // e.g., "Apr 2025"
    const existing = acc.find(item => item.month === month);

    if (existing) {
      existing.amount += Number(transaction.amount);
    } else {
      acc.push({ month, amount: Number(transaction.amount) });
    }

    return acc;
  }, []);

  // Sort by month
  monthlyData.sort((a, b) => dayjs(a.month, "MMM YYYY").toDate() - dayjs(b.month, "MMM YYYY").toDate());

  return (
    <div style={{ width: "100%", height: 300 }}>
      <h3 style={{ textAlign: "center" }}>Monthly Expenses</h3>
      <ResponsiveContainer>
        <BarChart data={monthlyData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="amount" fill="#1890ff" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlyBarChart;
