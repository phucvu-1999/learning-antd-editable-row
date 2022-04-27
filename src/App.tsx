import React, { useState, useEffect } from "react";
import { Table, Input, Button, Form } from "antd";
import { ColumnsType } from "antd/lib/table";

import logo from "./logo.svg";
import "./App.css";

import { User } from "./model/user";

function App() {
  const [form] = Form.useForm();

  const [dataSource, setDataSource] = useState<User[]>([]);
  const [editingRow, setEditingRow] = useState<number | null>(null);

  useEffect(() => {
    const data: User[] = [];

    for (let i = 0; i < 10; i++) {
      data.push({ address: `Address: ${i}`, key: i, name: `Name: ${i}` });
    }

    setDataSource(data);
  }, []);

  const columns: ColumnsType<User> = [
    {
      title: "Name",
      dataIndex: "name",
      render: (value, record) => {
        if (editingRow === record.key) {
          return (
            <Form.Item
              name="name"
              rules={[{ required: true, message: "Please enter the value" }]}
            >
              <Input />
            </Form.Item>
          );
        } else {
          return <p>{value}</p>;
        }
      },
    },
    {
      title: "Address",
      dataIndex: "address",
      render: (value, record) => {
        if (editingRow === record.key) {
          return (
            <Form.Item
              name="address"
              rules={[
                { required: true, message: "Please enter the address value" },
              ]}
            >
              <Input />
            </Form.Item>
          );
        } else {
          return <p>{value}</p>;
        }
      },
    },
    {
      title: "Actions",
      render: (_, record) => {
        return (
          <>
            <Button
              type="link"
              onClick={() => {
                setEditingRow(record.key);
                form.setFieldsValue({
                  name: record.name,
                  address: record.address,
                });
              }}
            >
              Edit
            </Button>
            <Button type="link" htmlType="submit">
              Save
            </Button>
          </>
        );
      },
    },
  ];

  const onFinish = (values: User) => {
    const updatedDataSource = [...dataSource];
    updatedDataSource.splice(editingRow! as number, 1, {
      ...values,
      key: editingRow! as number,
    });

    setDataSource(updatedDataSource);
    setEditingRow(null);
  };

  return (
    <div className="App">
      <header className="App-header">
        <Form form={form} onFinish={onFinish}>
          <Table
            rowKey="key"
            columns={columns}
            dataSource={dataSource}
            pagination={false}
          />
        </Form>
      </header>
    </div>
  );
}

export default App;
