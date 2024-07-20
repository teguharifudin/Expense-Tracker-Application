import React, { useEffect, useState, useContext } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Form, Input, Modal, Table, message } from "antd";
import axios from "axios";
import Spinner from "./Spinner";
import { ConfigContext } from '../context/ConfigContext';

const CategoryList = () => {
  const authToken = localStorage.getItem('authToken');
  const {baseUrl} = useContext(ConfigContext);
  const [showModalNew, setShowModalNew] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allTransaction, setAllTransaction] = useState();
  const [editable, setEditable] = useState(null);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
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

  // useEffect(() => {
  //   const getAllTransactions = async () => {
  //     try {
  //       setLoading(true);
  //       const res = await axios({
  //           method: 'get',
  //           url: `${baseUrl}/category`,
  //           headers: {
  //               Authorization: `Bearer ${authToken}`
  //           }
  //       });
  //       setLoading(false);
  //       setAllTransaction(res.data);
  //     } catch (error) {
  //       message.error("Fetch issues with category");
  //     }
  //   };
  //   getAllTransactions();
  // }, [authToken, baseUrl]);

  const getAllTransactions = async () => {
    try {
      setLoading(true);
      const res = await axios({
          method: 'get',
          url: `${baseUrl}/category`,
          headers: {
              Authorization: `Bearer ${authToken}`
          }
      });
      setLoading(false);
      setAllTransaction(res.data);
    } catch (error) {
      message.error("Fetch issues with category");
    }
  };
  useEffect(() => {
    getAllTransactions();
  }, []);

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      if (editable) {
        await axios({
            method: 'put',
            url: `${baseUrl}/category/${editable._id}`,
            data: values,
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        });
        setLoading(false);
        message.success("Category Updated Successfully");
        getAllTransactions();
        // window.location.reload();
      } else {
        await axios({
            method: 'post',
            url: `${baseUrl}/category`,
            data: values,
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        });
        setLoading(false);
        message.success("Category Added Successfully");
        getAllTransactions();
        setShowModalNew(false);
        setEditable(null);
        // window.location.reload();
      }
      setShowModal(false);
      setEditable(null);
    } catch (error) {
      setLoading(false);
      message.error("Unable to Edit");
    }
  };

  const handleDelete = async (record) => {
    try {
      setLoading(true);
      await axios.delete(`${baseUrl}/category/${record._id}`, {
          headers: {
              Authorization: `Bearer ${authToken}`
          }
      });
      setLoading(false);
      message.success("Category Deleted!");
      getAllTransactions();
      // window.location.reload();
    } catch (error) {
      setLoading(false);
      message.error("Unable to Delete");
    }
  };
  
  return (
    <div className="container" style={{ paddingTop: '50px', paddingBottom: '50px', minWidth: '60%' }}>
      {loading && <Spinner />}
      <h1 className="mb-3">Category List</h1>
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
          <Table columns={columns} dataSource={allTransaction} />
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
          <Form.Item label="Name" name="name">
            <Input type="text" />
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
          <Form.Item label="Name" name="name">
            <Input type="text" />
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

export default CategoryList;