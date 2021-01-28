import React, { useState } from "react";
import type { ProColumns } from "@ant-design/pro-table";
import { EditableProTable } from "@ant-design/pro-table";
import ProField from "@ant-design/pro-field";
import { ProFormRadio } from "@ant-design/pro-form";
import ProCard from "@ant-design/pro-card";
import "antd/dist/antd.css";

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

type DataSourceType = {
  id: React.Key;
  account?: string;
  title?: string;
  group?: string;
  category?: string;
  decs?: string;
  state?: string;
  master?: string;
  created_at?: string;
  children?: DataSourceType[];
};

const defaultData: DataSourceType[] = [
  {
    id: 624748504,
    account: 123456,
    title: "TP-Link",
    decs: "这个活动真好玩",
    state: "open",
    created_at: "2020-05-26T09:42:56Z"
  },
  {
    id: 624691229,
    account: 123456,

    title: "TP-Link",
    decs: "342423",
    state: "closed",
    created_at: "2020-05-26T08:19:22Z"
  }
];

export default () => {
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const [dataSource, setDataSource] = useState<DataSourceType[]>([]);
  const [position, setPosition] = useState<"top" | "bottom" | "hidden">(
    "bottom"
  );
  const [newRecord, setNewRecord] = useState({
    id: (Math.random() * 1000000).toFixed(0)
  });

  const columns: ProColumns<DataSourceType>[] = [
    {
      title: "vvv",
      dataIndex: "title",
      editable: true
    },
    {
      title: "title",
      dataIndex: "title",
      formItemProps: (form, { rowIndex }) => {
        return {
          rules: rowIndex > 2 ? [{ required: true, message: "req" }] : []
        };
      },
      // 第二行不允许编辑
      editable: (text, record, index) => {
        return index !== 0;
      },
      width: "30%"
    },
    {
      title: "state",
      key: "state",
      dataIndex: "state",
      valueType: "select",
      valueEnum: {
        all: { text: "Default", status: "Default" },
        open: {
          text: "Error",
          status: "Error"
        },
        closed: {
          text: "Success",
          status: "Success"
        }
      }
    },
    {
      title: "Data",
      dataIndex: "decs",
      fieldProps: (from, { rowKey, rowIndex }) => {
        if (from.getFieldValue([rowKey || "", "title"]) === "Title Data") {
          return {
            disabled: true
          };
        }
        if (rowIndex > 9) {
          return {
            disabled: true
          };
        }
        return {};
      }
    },
    {
      title: "select",
      valueType: "option",
      width: 200,
      render: (text, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
            action.startEditable?.(record.id);
          }}
        >
          Edit
        </a>,
        <a
          key="delete"
          onClick={() => {
            setDataSource(dataSource.filter((item) => item.id !== record.id));
          }}
        >
          Delete
        </a>
      ]
    }
  ];

  return (
    <>
      <EditableProTable<DataSourceType>
        rowKey="id"
        headerTitle="HeaderT"
        maxLength={5}
        recordCreatorProps={
          position !== "hidden"
            ? {
                position: position as "top",
                record: newRecord
              }
            : false
        }
        toolBarRender={() => [
          <ProFormRadio.Group
            key="render"
            fieldProps={{
              value: position,
              onChange: (e) => setPosition(e.target.value)
            }}
            options={[
              {
                label: "top",
                value: "top"
              },
              {
                label: "bottom",
                value: "bottom"
              },
              {
                label: "hidden",
                value: "hidden"
              }
            ]}
          />
        ]}
        columns={columns}
        request={async () => ({
          data: defaultData,
          total: 3,
          success: true
        })}
        value={dataSource}
        onChange={setDataSource}
        editable={{
          type: "multiple",
          editableKeys,
          onSave: async () => {
            await waitTime(2000);
            setNewRecord({
              id: (Math.random() * 1000000).toFixed(0)
            });
          },
          onChange: setEditableRowKeys
        }}
      />
      <ProCard title="Data" headerBordered collapsible defaultCollapsed>
        <ProField
          fieldProps={{
            style: {
              width: "100%"
            }
          }}
          mode="read"
          valueType="jsonCode"
          text={JSON.stringify(dataSource)}
        />
      </ProCard>
    </>
  );
};
