"use client"

import React from "react"
import {  Dropdown, Button } from "antd"
import { MoreOutlined } from "@ant-design/icons"
import TableComponents from "../../../components/TableComponent"

const data = [
  { id: "m5gr84i9", amount: 316, status: "success", email: "ken99@example.com" },
  { id: "3u1reuv4", amount: 242, status: "success", email: "Abe45@example.com" },
  { id: "derv1ws0", amount: 837, status: "processing", email: "Monserrat44@example.com" },
  { id: "5kma53ae", amount: 874, status: "success", email: "Silas22@example.com" },
  { id: "bhqecj4p", amount: 721, status: "failed", email: "carmella@example.com" },
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
