import { Table } from "antd";
import React from "react";

export default function TableComponents({
    columns,
    dataSource,
    scrollx = 1300,
    pagination = true,
    current,
    pageSize,
    total = 0,
    onChange,
    rowKey,
    loading,
    expandable,

}) {

    return (
        <Table
            columns={columns}
            dataSource={dataSource}
            scroll={{
                x: scrollx,
                y: 400,
            }}
            pagination={
                pagination
                    ? {
                        showSizeChanger: pagination,
                        showQuickJumper: pagination,
                        total: total,
                        align: "start",
                        current: current,
                        pageSize: pageSize ? String(pageSize) : 5,
                        showTotal: (total, range) =>
                            `${range[0]}-${range[1]} of ${total} items`,
                        position: ["bottomRight"],
                        size: "small",
                        defaultPageSize: 5,
                        onChange: onChange,
                    }
                    : false
            }
            className="custom-table"
            rowKey={rowKey}
            loading={loading}
            expandable={expandable}
        // rowClassName={(_, index) => (index % 2 === 0 ? "table-row-red" : "")}

        />
    );
}
