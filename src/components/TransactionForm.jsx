import React from "react";
import { Form, Input, Button, InputNumber, DatePicker, Card, notification } from "antd";
import { useDispatch } from "react-redux";
import { addTransaction } from "../redux/transactionSlice";
import "../styles/transactionForm.css"; // Importing the CSS file

const TransactionForm = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm(); // AntD form instance

  const onFinish = async (values) => {
    const newTransaction = {
      amount: values.amount,
      description: values.description,
      date: values.date.format("YYYY-MM-DD"),
    };

    try {
      await dispatch(addTransaction(newTransaction)).unwrap(); // to catch errors
      notification.success({
        message: "Success!",
        description: "Transaction added successfully 🎉",
        placement: "topRight",
      });
      form.resetFields(); // clear the form
    } catch (error) {
      notification.error({
        message: "Failed to add transaction 😞",
        description: error.message,
      });
    }
  };

  return (
    <Card title="Add Transaction" className="transaction-form-card">
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Amount"
          name="amount"
          className="transaction-form-item"
          rules={[{ required: true, message: "Please enter an amount" }]}
        >
          <InputNumber
            style={{ width: "100%" }}
            min={0}
            prefix="₹"
            placeholder="Enter amount"
          />
        </Form.Item>

        <Form.Item
          label="Date"
          name="date"
          className="transaction-form-item"
          rules={[{ required: true, message: "Please select a date" }]}
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          className="transaction-form-item"
          rules={[{ required: true, message: "Please enter a description" }]}
        >
          <Input placeholder="What was this for?" />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="transaction-form-button"
          >
            Add Transaction
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default TransactionForm;
