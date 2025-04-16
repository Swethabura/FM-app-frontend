import React, { useEffect, useState } from "react";
import {
  List,
  Typography,
  Button,
  Card,
  Space,
  Popconfirm,
  message,
  Modal,
  Form,
  Input,
  DatePicker,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTransactions,
  deleteTransaction,
  updateTransaction,
} from "../redux/transactionSlice";
import dayjs from "dayjs";
import "../styles/transactionList.css";

const TransactionList = () => {
  const dispatch = useDispatch();
  const { items: transactions, loading } = useSelector((state) => state.transactions);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteTransaction(id)).unwrap();
      message.success("Transaction deleted");
    } catch {
      message.error("Failed to delete");
    }
  };

  const handleEditClick = (transaction) => {
    setEditingTransaction(transaction);
    form.setFieldsValue({
      amount: transaction.amount,
      description: transaction.description,
      date: dayjs(transaction.date),
    });
    setIsModalVisible(true);
  };

  const handleUpdate = async () => {
    try {
      const values = await form.validateFields();
      await dispatch(
        updateTransaction({
          id: editingTransaction._id,
          data: {
            ...values,
            date: values.date.format("YYYY-MM-DD"),
          },
        })
      ).unwrap();
      message.success("Transaction updated");
      setIsModalVisible(false);
      setEditingTransaction(null);
    } catch {
      message.error("Failed to update");
    }
  };

  return (
    <>
      <Card title="Transactions" className="transaction-card">
        <List
          bordered
          loading={loading}
          dataSource={transactions}
          locale={{ emptyText: "No transactions found." }}
          renderItem={(item) => (
            <List.Item
              actions={[
                <Button size="small" onClick={() => handleEditClick(item)}>Edit</Button>,
                <Popconfirm
                  title="Are you sure you want to delete?"
                  onConfirm={() => handleDelete(item._id)}
                >
                  <Button danger size="small">Delete</Button>
                </Popconfirm>,
              ]}
            >
              <Space direction="vertical">
              <Typography.Text className="transaction-amount">₹{item.amount}</Typography.Text>
              <Typography.Text className="transaction-desc">{item.description}</Typography.Text>
                <Typography.Text>{item.date}</Typography.Text>
              </Space>
            </List.Item>
          )}
        />
      </Card>

      <Modal
        title="Edit Transaction"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={handleUpdate}
        okText="Update"
      >
        <Form layout="vertical" form={form}>
          <Form.Item name="amount" label="Amount" rules={[{ required: true }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item name="description" label="Description" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="date" label="Date" rules={[{ required: true }]}>
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default TransactionList;
