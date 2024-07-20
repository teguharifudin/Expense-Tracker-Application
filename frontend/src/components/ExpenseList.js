import React, { useEffect, useState, useContext, useRef } from "react";
import { DeleteOutlined, EditOutlined, PieChartOutlined, UnorderedListOutlined, FilePdfOutlined } from "@ant-design/icons";
import { DatePicker, Form, Input, Modal, Select, Table, message } from "antd";
import axios from "axios";
import moment from "moment";
import ExpenseAnalytics from "./ExpenseAnalytics";
import Spinner from "./Spinner";
import { ConfigContext } from '../context/ConfigContext';
import { useReactToPrint } from 'react-to-print';
// import {CSVLink} from "react-csv";

const { RangePicker } = DatePicker;

const ExpenseList = () => {
  const authToken = localStorage.getItem('authToken');
  const {baseUrl} = useContext(ConfigContext);
  const [showModalNew, setShowModalNew] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allTransaction, setAllTransaction] = useState([]);
  const [frequency, setFrequency] = useState("365");
  const [selectedDate, setSelectedate] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [viewData, setViewData] = useState("table");
  const [editable, setEditable] = useState(null);
  const [categories, setCategories] = useState('');

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      render: (text) => <span>{moment(text).format("YYYY-MM-DD")}</span>,
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "Category",
      dataIndex: ['category', 'name'],
    },
    // {
    //   title: "Description",
    //   dataIndex: "description",
    // },
    {
      title: "Actions",
      render: (text, record) => (
        <div>
          <EditOutlined
            onClick={() => {
              setEditable(record);
              setShowModal(true);
            }}
          />
          <DeleteOutlined
            className="mx-2"
            onClick={() => {
              handleDelete(record);
            }}
          />
        </div>
      ),
    },
  ];

  useEffect(() => {
    const getAllTransactions = async () => {
      try {
        setLoading(true);
        var datas = {
          frequency: frequency,
          selectedDate: selectedDate,
          categoryFilter: categoryFilter
        }
        const res = await axios({
            method: 'post',
            url: `${baseUrl}/expense`,
            data: datas,
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        });
        setLoading(false);
        setAllTransaction(res.data);
      } catch (error) {
        message.error("Fetch issues with transactions");
      }
    };
    getAllTransactions();
  }, [authToken, baseUrl, frequency, selectedDate, categoryFilter]);

  const getAllTransactions = async () => {
    try {
      setLoading(true);
      var datas = {
        frequency: frequency,
        selectedDate: selectedDate,
        categoryFilter: categoryFilter
      }
      const res = await axios({
          method: 'post',
          url: `${baseUrl}/expense`,
          data: datas,
          headers: {
              Authorization: `Bearer ${authToken}`
          }
      });
      setLoading(false);
      setAllTransaction(res.data);
    } catch (error) {
      message.error("Fetch issues with transactions");
    }
  };
  useEffect(() => {
    getAllTransactions();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${baseUrl}/category/expense`, {
          headers: {
              Authorization: `Bearer ${authToken}`
          }
        });
        setCategories(response.data);
      } catch (error) {
        message.error("Fetch issues with categories");
      }
    };
    fetchCategories();
  }, [authToken, baseUrl]);

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      if (editable) {
        await axios({
            method: 'put',
            url: `${baseUrl}/expense/${editable._id}`,
            data: values,
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        });
        setLoading(false);
        message.success("Expense Updated Successfully");
        getAllTransactions();
        // window.location.reload();
      } else {
        await axios({
            method: 'post',
            url: `${baseUrl}/expense/create`,
            data: values,
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        });
        setLoading(false);
        message.success("Expense Added Successfully");
        getAllTransactions();
        setShowModalNew(false);
        setEditable(null);
        // window.location.reload();
      }
      setShowModal(false);
      setEditable(null);
    } catch (error) {
      setLoading(false);
      message.error("Failed to add transaction");
    }
  };

  const handleDelete = async (record) => {
    try {
      setLoading(true);
      await axios.delete(`${baseUrl}/expense/${record._id}`, {
          headers: {
              Authorization: `Bearer ${authToken}`
          }
      });
      setLoading(false);
      message.success("Transaction Deleted!");
      getAllTransactions();
      // window.location.reload();
    } catch (error) {
      setLoading(false);
      message.error("Unable to Delete");
    }
  };

  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  
  return (
    <div className="container" style={{ paddingTop: '50px', paddingBottom: '50px', minWidth: '60%' }}>
      {loading && <Spinner />}
      <h1 className="mb-3">Expense List</h1>
      <div className="filters">
        <div>
          {/* <h6>Select Frequency</h6> */}
          <Select
            value={frequency}
            onChange={(values) => setFrequency(values)}
            style={{ width: "130px" }}
          >
            <Select.Option value="7">Last 1 Week</Select.Option>
            <Select.Option value="14">Last 2 Week</Select.Option>
            <Select.Option value="21">Last 3 Week</Select.Option>
            <Select.Option value="30">Last 1 Month</Select.Option>
            <Select.Option value="60">Last 2 Month</Select.Option>
            <Select.Option value="90">Last 3 Month</Select.Option>
            <Select.Option value="365">Last 1 Year</Select.Option>
            <Select.Option value="custom">Custom</Select.Option>
          </Select>
          {frequency === "custom" && (
            <RangePicker
              value={selectedDate}
              onChange={(values) => setSelectedate(values)}
            />
          )}
        </div>
        <div>
          {/* <h6>Select Category</h6> */}
          <Select
            value={categoryFilter}
            onChange={(values) => setCategoryFilter(values)}
            style={{ width: "120px" }}
          >
            <Select.Option value="all">All</Select.Option>
            {Array.isArray(categories) && categories.map((option, index) => {
                return (
                    <Select.Option key={index} value={option._id}>{option.name}</Select.Option>
                );
            })}
          </Select>
        </div>
        <div className="switch-icons">
          <UnorderedListOutlined
            className={`mx-2 ${
              viewData === "table" ? "active-icon" : "inactive-icon"
            }`}
            onClick={() => setViewData("table")}
          />
          <PieChartOutlined
            className={`mx-2 ${
              viewData === "analytics" ? "active-icon" : "inactive-icon"
            }`}
            onClick={() => setViewData("analytics")}
          />
        </div>
        <div className="switch-icons">
          <FilePdfOutlined
              className={`mx-2`}
              onClick={handlePrint}
            />
          {/* <CSVLink
              filename={"Expense_Table.csv"}
              data={ allTransaction }
              className="btn btn-primary"
              onClick={()=>{
                message.success("The file is downloading")
              }}
            >
              CSV
          </CSVLink> */}
        </div>
      </div>
      <div className="filters">
        <div>
          <button
            className="btn"
            onClick={() => setShowModalNew(true)}
            style={{ color: 'white', backgroundColor: '#e76e50', marginRight: '5px' }}
          >
            Add New
          </button>
        </div>
      </div>
      <div className="content">
        {viewData === "table" ? (
          <div ref={componentRef}><Table columns={columns} dataSource={allTransaction} /></div>
        ) : (
          <ExpenseAnalytics allTransaction={allTransaction} />
        )}
      </div>
      <Modal
        destroyOnClose={true}
        title="Add New"
        open={showModalNew}
        onCancel={() => setShowModalNew(false)}
        footer={false}
      >
        <Form
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Form.Item label="Amount" name="amount">
            <Input type="text" />
          </Form.Item>
          <Form.Item label="Category" name="category">
            <Select>
              {Array.isArray(categories) && categories.map((option, index) => {
                  return (
                      <Select.Option key={index} value={option._id}>{option.name}</Select.Option>
                  );
              })}
            </Select>
          </Form.Item>
          {/* <Form.Item label="Description" name="description">
            <Input type="text" />
          </Form.Item> */}
          <Form.Item label="Date" name="date">
            <Input type="date" />
          </Form.Item>
          <div className="d-flex justify-content-end">
            <button 
              type="submit" 
              className="btn"
              style={{ color: 'white', backgroundColor: '#e76e50', marginRight: '5px' }}
            >
              {" "}
              SAVE
            </button>
          </div>
        </Form>
      </Modal>
      <Modal
        destroyOnClose={true}
        title="Edit"
        open={showModal}
        onCancel={() => setShowModal(false)}
        footer={false}
      >
        <Form
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={editable}
        >
          <Form.Item label="Amount" name="amount">
            <Input type="text" />
          </Form.Item>
          <Form.Item label="Category" name={['category', '_id']}>
            <Select>
              {Array.isArray(categories) && categories.map((option, index) => {
                  return (
                      <Select.Option key={index} value={option._id}>{option.name}</Select.Option>
                  );
              })}
            </Select>
          </Form.Item>
          {/* <Form.Item label="Description" name="description">
            <Input type="text" />
          </Form.Item> */}
          <Form.Item label="Date" name="date">
            <Input type="date" />
          </Form.Item>
          <div className="d-flex justify-content-end">
            <button 
              type="submit" 
              className="btn"
              style={{ color: 'white', backgroundColor: '#e76e50', marginRight: '5px' }}
            >
              {" "}
              SAVE
            </button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default ExpenseList;