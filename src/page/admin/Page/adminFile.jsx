"use client"

import React from "react"
import { MoreOutlined } from "@ant-design/icons"
import TableComponents from "../../../components/TableComponent"

import { Button, Dropdown } from "antd"

const data = [
  {
    id: "m5gr84i9",
    amount: 316,
    status: "success",
    email: "ken99@example.com",
    date: "2023-09-01",
    customer: "John Doe",
  },
  {
    id: "3u1reuv4",
    amount: 242,
    status: "success",
    email: "Abe45@example.com",
    date: "2023-09-02",
    customer: "Alice Johnson",
  },
  {
    id: "derv1ws0",
    amount: 837,
    status: "processing",
    email: "Monserrat44@example.com",
    date: "2023-09-03",
    customer: "Michael Brown",
  },
  {
    id: "5kma53ae",
    amount: 874,
    status: "success",
    email: "Silas22@example.com",
    date: "2023-09-04",
    customer: "Sophia Lee",
  },
  {
    id: "bhqecj4p",
    amount: 721,
    status: "failed",
    email: "carmella@example.com",
    date: "2023-09-05",
    customer: "David Smith",
  },
]

const columns = [
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (text) => <span className="capitalize">{text}</span>,
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    sorter: (a, b) => a.email.localeCompare(b.email),
    render: (text) => <span className="lowercase">{text}</span>,
  },
  {
    title: "Customer",
    dataIndex: "customer",
    key: "customer",
    sorter: (a, b) => a.customer.localeCompare(b.customer),
  },
{
    title: "Date",
    dataIndex: "date",
    key: "date",
    sorter: (a, b) => new Date(a.date) - new Date(b.date),
    render: (date) =>
      new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }).format(new Date(date)),
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
    sorter: (a, b) => a.amount - b.amount,
    align: "right",
    render: (amount) =>
      new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount),
  },
  {
    title: "Actions",
    key: "actions",
    render: (_, record) => (
      <Dropdown
        menu={{
          items: [
            {
              key: "1",
              label: "Copy payment ID",
              onClick: () => navigator.clipboard.writeText(record.id),
            },
            {
              key: "2",
              label: "View customer",
            },
            {
              key: "3",
              label: "View payment details",
            },
          ],
        }}
        placement="bottomRight"
      >
        <Button shape="circle" icon={<MoreOutlined />} />
      </Dropdown>
    ),
  },
]

export default function DataTableDemo() {
  return (
    <TableComponents
      rowKey="id"
      columns={columns}
      dataSource={data}
      pagination={{ pageSize: 5 }}
    />
  )
}
