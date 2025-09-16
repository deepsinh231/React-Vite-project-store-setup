import React, { useState, useRef } from "react";
import datas from "./data.json";
import {
  Button,
  Checkbox,
  Dropdown,
  Input,
  Space,
  Form,
  Popconfirm,
  Tag,
} from "antd";
import {
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
  FilterOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import InputField from "../../../components/input/InputField";
import TableComponents from "../../../components/TableComponent";
import EditableCell from "../../../components/EditableCell";
import styled from "styled-components";
import Tooltip from "../../../components/Tooltip";
import { AnimatedTooltipSingle } from "../../../components/ui/animated-tooltip";
import TooltipComponent from "../../../components/Tooltip";

// --- Styled Components for visual enhancements ---
const StyledTableWrapper = styled.div`
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  padding: 24px; // Add internal padding for content
  margin: 20px;
  max-width: 100%;
  margin-left: auto;
  margin-right: auto;

  .ant-table-wrapper {
    margin-top: 20px;
  }

  .ant-table-thead > tr > th {
    background-color: #f7f9fc;
    color: #52627c;
    font-weight: 600;
    font-size: 15px;
    padding: 12px 16px;
    border-bottom: 1px solid #e8e8e8;
  }

  .ant-table-tbody > tr > td {
    padding: 10px 16px;
    border-bottom: 1px solid #f0f0f0;
    color: #333;
    font-size: 14px;
  }

  .ant-table-tbody > tr:hover > td {
    background: #e6f7ff20; // Light blue hover
  }

  .ant-tag {
    border-radius: 4px;
    padding: 4px 8px;
    font-size: 12px;
  }

  .status-completed {
    background-color: #e6ffed;
    color: #52c41a;
    border-color: #b7eb8f;
  }
  .status-in-progress {
    background-color: #fffbe6;
    color: #faad14;
    border-color: #ffe58f;
  }
  .status-pending {
    background-color: #f0f2f5;
    color: #8c8c8c;
    border-color: #d9d9d9;
  }
  // Add more statuses as needed

  .header-controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
  }

  .ant-pagination {
    margin-top: 20px;
    .ant-pagination-item-active {
      background-color: #1890ff;
      border-color: #1890ff;
      a {
        color: #fff;
      }
    }
  }
`;

const HeaderBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid #f0f0f0;

  h2 {
    font-size: 24px;
    font-weight: 700;
    color: #333;
    margin: 0;
  }

  .header-buttons {
    display: flex;
    gap: 10px;
  }
`;

export default function DemoTable() {
  const [form] = Form.useForm();
  const [data, setData] = useState(datas || []);
  const [tableKey, setTableKey] = useState(Date.now());
  const searchInput = useRef(null);

  /** delete row */
  const handleDelete = (id) => {
    const newData = data.filter((item) => item.id !== id);
    setData(newData);
  };

  /** column search props */
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button type="link" size="small" onClick={() => close()}>
            Close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    filterDropdownProps: {
      onOpenChange(open) {
        if (open) {
          setTimeout(() => searchInput.current?.select(), 100);
        }
      },
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  /** editing */
  const [editingKey, setEditingKey] = useState("");
  const isEditing = (record) => record.id === editingKey;
  const edit = (record) => {
    form.setFieldsValue({ ...record });
    setEditingKey(record.id);
  };
  const cancel = () => {
    setEditingKey("");
  };
  const save = async (id) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => id === item.id);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setData(newData);
        setEditingKey("");
      }
    } catch (err) {
      console.log("Validate Failed:", err);
    }
  };

  /** base columns */
  const baseColumns = [
    { title: "ID", dataIndex: "id", key: "id" },
    {
      title: "Header",
      dataIndex: "header",
      key: "header",
      editable: true,
      ...getColumnSearchProps("header"),
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      editable: true,
      ...getColumnSearchProps("type"),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      editable: true,
      // ...getColumnSearchProps("status"),
      filters: Array.from(new Set(data.map((item) => item.status))).map(
        (status) => ({
          text: status,
          value: status,
        })
      ),
      onFilter: (value, record) => record.status === value,
      render: (text) => {
        let color = "geekblue";
        if (text === "Done") color = "green";
        if (text === "In Process") color = "gold";
        if (text === "Pending") color = "default";
        return <Tag color={color}>{text.toUpperCase()}</Tag>;
      },
    },
    {
      title: "Target",
      dataIndex: "target",
      key: "target",
      editable: true,
      sorter: (a, b) => Number(a.target) - Number(b.target),
      ...getColumnSearchProps("target"),
    },
    {
      title: "Limit",
      dataIndex: "limit",
      key: "limit",
      editable: true,
      sorter: (a, b) => Number(a.limit) - Number(b.limit),
      ...getColumnSearchProps("limit"),
    },
    {
      title: "Reviewer",
      dataIndex: "reviewer",
      key: "reviewer",
      editable: true,
      ...getColumnSearchProps("reviewer"),
    },
    {
      title: "Delete",
      dataIndex: "operation",
      align: "center",
      render: (_, record) =>
        data.length >= 1 ? (
          <TooltipComponent title="Delete" placement="bottom">
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => handleDelete(record.id)}
            >
              <DeleteOutlined style={{ color: "red" }} className="text-xl" />
            </Popconfirm>
          </TooltipComponent>
        ) : null,
    },
  ];

  /** merge editable cells */
  const mergedColumns = baseColumns.map((col) => {
    if (!col.editable) return col;
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  /** add edit/save/cancel column */
  mergedColumns.push({
    title: "Action",
    dataIndex: "action",
    render: (_, record) => {
      const editable = isEditing(record);
      return editable ? (
        <span>
          <TooltipComponent title="Save" placement="bottom">
            {/* Save Icon */}
            <a
              onClick={() => save(record.id)}
              className="text-gray-800 "
              style={{ marginRight: 10 }}
            >
              <CheckOutlined
                className="text-gray-800 text-xl border border-gray-800 rounded-sm p-1"
                style={{ color: "green" }}
              />
            </a>
          </TooltipComponent>
          <TooltipComponent title="Cancel" placement="bottom">
            {/* Cancel Icon */}
            <a
              onClick={cancel}
              className="text-red-800 border border-red-800 rounded-sm p-1"
            >
              <CloseOutlined
                className="text-red-800 text-xl"
                style={{ color: "red" }}
              />
            </a>
          </TooltipComponent>
        </span>
      ) : (
        <TooltipComponent title="Edit" placement="bottom">
          {/* Edit Icon */}
          <a disabled={editingKey !== ""} onClick={() => edit(record)}>
            <EditOutlined />
          </a>
        </TooltipComponent>
      );
    },
  });

  /** global search + column visibility */
  const [globalSearch, setGlobalSearch] = useState("");
  const safeSearch = (globalSearch || "").toLowerCase();
  const filteredData = data.filter((item) =>
    Object.values(item).some((val) =>
      (val ?? "").toString().toLowerCase().includes(safeSearch)
    )
  );
  const [visibleCols, setVisibleCols] = useState(baseColumns.map((c) => c.key));
  const menuItems = baseColumns.map((col) => ({
    key: col.key,
    label: (
      <Checkbox
        checked={visibleCols.includes(col.key)}
        onChange={(e) => {
          if (e.target.checked) {
            setVisibleCols([...visibleCols, col.key]);
          } else {
            setVisibleCols(visibleCols.filter((k) => k !== col.key));
          }
        }}
      >
        {col.title}
      </Checkbox>
    ),
  }));
  const visibleColumns = mergedColumns.filter((col) =>
    visibleCols.includes(col.key)
  );

  const resetAll = () => {
    // reset global search
    setGlobalSearch("");

    // reset form fields (editable cells)
    form.resetFields();

    // reset editing key
    setEditingKey("");

    // reset visible columns to all
    setVisibleCols(baseColumns.map((c) => c.key));

    // reload the original data if you want to undo deletions/edits
    // setData(datas);

    // antd Table keeps internal filters; easiest way: force key change
    setTableKey(Date.now());
  };

  return (
    <StyledTableWrapper>
      <HeaderBar>
        <h2>Task List</h2> {/* Title for the table */}
        <div className="header-buttons">
          <InputField
            placeholder="Search all columns..."
            type="search"
            className="h-[32px]"
            mt="mt-0"
            onChange={(e) => setGlobalSearch(e.target.value)}
          />
          <Dropdown menu={{ items: menuItems }} trigger={["click"]}>
            <Button icon={<FilterOutlined />}>Columns</Button>
          </Dropdown>
          {/* Add a close button if needed, like the 'x' in your image */}
          <Button
            onClick={resetAll}
            icon={<span style={{ fontWeight: "bold" }}>&times;</span>}
          />
        </div>
      </HeaderBar>
      <Form form={form} component={false}>
        <TableComponents
          rowKey="id"
          key={tableKey}
          columns={visibleColumns}
          dataSource={filteredData}
          props={{
            components: {
              body: {
                cell: EditableCell,
              },
            },
            rowClassName: "editable-row",
          }}
          pagination={{ onChange: cancel }}
        />
      </Form>
    </StyledTableWrapper>
  );
}
