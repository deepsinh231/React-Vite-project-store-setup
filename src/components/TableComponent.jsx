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
  bordered = true,
  props,
}) {
  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      scroll={{
        x: scrollx,
        y: 1000,
      }}
      pagination={
        pagination
          ? {
              showSizeChanger: pagination,
              showQuickJumper: pagination,
              total: total,
              align: "start",
              current: current,
              pageSize: pageSize,
              showTotal: (total, range) =>
                `${range[0]}-${range[1]} of ${total} items`,
              position: ["bottomCenter"],
              size: "default",
              onChange: onChange,
              onShowSizeChange: onChange, // Ant Design's recommended way to handle page size changes
              pageSizeOptions: ["10", "20", "50", "100"],
            }
          : false
      }
      className="custom-table"
      rowKey={rowKey}
      bordered={bordered}
      loading={loading}
      expandable={expandable}
      {...props}
      // rowClassName={(_, index) => (index % 2 === 0 ? "table-row-red" : "")}
    />
  );
}

// import React from "react";
// import { Table, ConfigProvider, Empty, Pagination } from "antd";

// // --- Custom Empty Component for a friendlier message ---
// const CustomEmpty = () => (
//   <Empty
//     image={Empty.PRESENTED_IMAGE_SIMPLE}
//     description={
//       <span>
//         No data to display. Try adjusting your filters or adding new items.
//       </span>
//     }
//   />
// );

// export default function TableComponents({
//   columns,
//   dataSource,
//   scrollx = 1300,
//   pagination = true,
//   current,
//   pageSize,
//   total = 0,
//   onChange,
//   rowKey,
//   loading,
//   expandable,
//   locale, // New prop for localization
//   size = "default", // New prop for table size: 'small', 'middle', 'large'
//   bordered = false, // New prop to control table borders
//   rowSelection, // New prop for row selection
//   ...props // Catch any other props
// }) {
//   return (
//     <ConfigProvider
//       locale={locale} // Apply global locale settings
//       renderEmpty={CustomEmpty} // Use our custom empty component
//     >
//         <Table
//           columns={columns}
//           dataSource={dataSource}
//           scroll={{
//             x: scrollx,
//             y: 400, // You might want to make 'y' configurable as well
//           }}
//           pagination={
//             pagination
//               ? {
//                   showSizeChanger: true, // Always show size changer if pagination is on
//                   showQuickJumper: true, // Always show quick jumper if pagination is on
//                   total: total,
//                   current: current,
//                   pageSize: pageSize,
//                   showTotal: (total, range) =>
//                     `Showing ${range[0]}-${range[1]} of ${total} items`, // More descriptive text
//                   position: ["bottomRight"], // Explicitly set position
//                   size: "default", // Use default size for pagination to match table
//                   onChange: onChange,
//                   onShowSizeChange: onChange, // Ant Design's recommended way to handle page size changes
//                   pageSizeOptions: ['10', '20', '50', '100'], // Provide common page size options
//                 }
//               : false
//           }
//           className="custom-table" // Keep this for global overrides if needed
//           rowKey={rowKey}
//           loading={loading}
//           expandable={expandable}
//           size={size} // Apply size prop
//           bordered={bordered} // Apply bordered prop
//           rowSelection={rowSelection} // Apply row selection
//           {...props} // Pass any additional props
//           // No need for `rowClassName` for striped rows if using styled-components
//         />
//     </ConfigProvider>
//   );
// }
