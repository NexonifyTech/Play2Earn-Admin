import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Modal, Row, Spinner } from "react-bootstrap";
import { MdDelete } from "react-icons/md";
import BasicTable from ".././../../components/BasicTable";
import Header from ".././../../components/Header";
import Loader from ".././../../pages/Admin/Loader/Loader";
import { useGetNotificationQuery, useDeleteNotificationMutation, useAddNotificationMutation, useEditNotificationMutation } from "../../../redux/api/NotificationApi";
import { toast } from "react-toastify";
import DeleteModel from ".././../../components/DeleteModel";
import { BsSearch, BsX } from "react-icons/bs";
import { format } from "date-fns";
import DragAndDropImageUpload from "../../../components/DragAndDropImageUpload";
import InputImage from "../../../components/ImageInputs";
import { FaEdit } from "react-icons/fa";

const Notification = () => {
 
  const [data, setData] = useState([]);
  const [idToDelete, setIdToDelete] = useState("");
  const [deleteShow, setDeleteShow] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editBody, setEditBody] = useState("");
  const [editImage, setEditImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editShow, setEditShow] = useState(false);


  const { data: NotificationData, isLoading ,refetch} = useGetNotificationQuery();
  const [deleteNotificationApi] = useDeleteNotificationMutation();
  const [addNotificationApi] = useAddNotificationMutation();
  const [editNotificationData] = useEditNotificationMutation();


  useEffect(() => {
    if (NotificationData && NotificationData.data) {
      setData(NotificationData.data);
    }
  }, [NotificationData]);

  console.log(NotificationData);

  const handleNavigateAddForm = () => setShowAddModal(true);

  const deleteHandleClose = () => setDeleteShow(false);

  const deleteHandleShow = (id) => {
    setIdToDelete(id);
    setDeleteShow(true);
  };

 

  const deleteNotification = async () => {
    try {
      const response = await deleteNotificationApi(idToDelete);
      setDeleteShow(false);
      setIdToDelete("");
      if (response?.data) {
        toast.success(response?.data?.message, { autoClose: 1000 });
        console.log(response);
      } else {
        toast.error(response?.error?.data.error, { autoClose: 1000 });
        console.log("else part");
        console.log(response.error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddNotification = async () => {
    setLoading(true);
    try {
      const response = await addNotificationApi ({
        title: title,
        message: body,
        image:image,
         
      });
      if (response?.data) {   
        toast.success(response?.data?.message, { autoClose: 1000 });
        setTitle("");
        setBody("");
        setImage("");
        setShowAddModal(false)     
      } else {
        toast.error(response?.error?.data.error, { autoClose: 1000 });
        console.log("else part");
        console.log(response.error);
      }
    } catch (error) {
      console.error(error);
    }
      finally {
        setLoading(false);
    }
  };

  const handleFileAddChange = (file) => {
    setImage(file);
  };

  const handleFileChange = (file) => {
    setEditImage(file);
  };

  const handleEditShow = (id) => {
    const Notification = data.find((d) => d._id === id);

    if (Notification) {
      setEditId(id);
      setEditTitle(Notification.title);
      setEditBody(Notification.message);
      setEditImage(Notification.imageUrl);
      setEditShow(true);
    }
  };

  const handleEditClose = () => {
    setEditShow(false);
    setEditId(null);
    setEditTitle("");
      setEditBody("");
      setEditImage(null);
  ;
  };

  
  const handleEditData = async () => {
    if (!editTitle || !editBody) {
      toast.error('Please fill all the fields', { autoClose: 1000 });
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('title', editTitle);
      formData.append('message', editBody);
      formData.append('imageUrl', editImage);

      const response = await editNotificationData({
        id: editId,
        data: formData,
      });

      if (response.data) {
        toast.success(response.data.message, { autoClose: 1000 });
        setEditShow(false);
        refetch();
      } else {
        toast.error(response.error.data.error, { autoClose: 1000 });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };


  const COLUMNS = [
    {
      Header: "ID",
      accessor: (d, i) => i + 1,
    },
    {
      Header: "Image",
      accessor: "imageUrl",
      Cell: (props) => {
        const imageUrl = props.value;
        return <img src={imageUrl} alt="img" style={{ maxWidth: '50px', maxHeight: '50px' }} />;
      },
    },
    {
      Header: "Title",
      accessor: "title",
      width: "auto",
      minWidth: 100,
    },
    {
      Header: "Message",
      accessor: "message",
      width: "auto",
      minWidth: 100,
    },

    {
      Header: "Created At",
      accessor: "createdAt",
      width: "auto",
      minWidth: 100,
      Cell: ({ value }) => {
        const formattedDateTime = format(new Date(value), 'dd-MM-yyyy hh:mm a');
        return <span>{formattedDateTime}</span>;
      },
    },
    {
      Header: "Updated At",
      accessor: "updatedAt",
      width: "auto",
      minWidth: 100,
      Cell: ({ value }) => {
        const formattedDateTime = format(new Date(value), 'dd-MM-yyyy hh:mm a');
        return <span>{formattedDateTime}</span>;
      },
    },
    {
      Header: "ACTIONS",
      accessor: "action",
      fixed: "right",
      Cell: (props) => {
        const rowIdx = props.row.original._id;
        return (
          <div className="d-flex align-items-center justify-content-center flex-row">
            <Button variant="warning" onClick={() => handleEditShow(rowIdx)}>
              <FaEdit />
            </Button>
            <Button variant="danger" className="m-1" onClick={() => deleteHandleShow(rowIdx)}>
              <MdDelete />
            </Button>
          </div>
        );
      },
    },
  ];

  
  return (
    <div>
      {!isLoading ? (
        <>
          <Container fluid className="my-4">
            <Row className="boxShadow p-4 mb-4 mt-4">
              <Col>
                <Header
                  ONCLICK={handleNavigateAddForm}
                  HEADING="  Notification"
                  BUTTON_NAME="Add "
                  headingClassName="text-center text-md-start m-md-4 m-xl-2"
                />
              </Col>
            </Row>
            <Row className="justify-content-center boxShadow p-4 mb-4">
              <Col xs={12} lg={12} xl={12} xxl={12} md={12} className="table-responsive">
                <BasicTable
                  COLUMNS={COLUMNS}
                  MOCK_DATA={data}
                />
              </Col>
            </Row>
          </Container>
          <DeleteModel
            DELETESTATE={deleteShow}
            ONCLICK={deleteHandleClose}
            YES={deleteNotification}
            DESCRIPTION="Confirm to Delete this notification"
            DELETETITLE="Notification"
          />
          <Modal show={showAddModal} onHide={() => setShowAddModal(false)} centered>
            <Modal.Header closeButton>
              <Modal.Title>Add  Notification</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group className="mb-3" controlId="formTitle">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBody">
                  <Form.Label>Body</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter body"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                  />
                </Form.Group>
                <DragAndDropImageUpload
              labelText="Upload Image"
              accepts={{
                'image/*': ['.png', '.jpeg', '.jpg', '.svg', '.webp'],
              }}
              handleFileChange={(file) => {
                handleFileAddChange(file);
              }}
            />
            <div>
              <small className="text-muted">
                Accepted file types: .jpg , .jpeg, .png, .svg, .webp{' '}
              </small>
            </div>
            <InputImage image={image} valueImage={image} />
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowAddModal(false)}>
                Close
              </Button>
              <Button variant="primary" 
              onClick={handleAddNotification}  
              style={{ backgroundColor: "#083C7A", border: "none" }}
              disabled={loading}
          >
            {loading ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  className="me-2"
                />
                Adding...
              </>
            ) : (
              'Add'
            )}
              </Button>
            </Modal.Footer>
          </Modal>


          <Modal show={editShow} onHide={handleEditClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Notification</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="deviceNameInput" className="mb-3">
              <Form.Label>
                  Title <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                placeholder="Enter the title name here"
              />
            </Form.Group>
            <Form.Group controlId="deviceNameInput" className="mb-3">
              <Form.Label>
                  Body <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                value={editBody}
                onChange={(e) => setEditBody(e.target.value)}
                placeholder="Enter the title name here"
              />
            </Form.Group>
            <DragAndDropImageUpload
              labelText="Upload Image"
              accepts={{
                'image/*': ['.png', '.jpeg', '.jpg', '.svg', '.webp'],
              }}
              handleFileChange={(file) => {
                handleFileChange(file);
              }}
            />
            <div>
              <small className="text-muted">
                Accepted file types: .jpg , .jpeg, .png, .svg, .webp{' '}
              </small>
            </div>
            <InputImage image={editImage} valueImage={editImage} />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleEditClose}>
            Cancel
          </Button>
          <Button
            style={{ backgroundColor: "#083C7A", border: 'none' }}
            onClick={handleEditData}
            disabled={loading}
          >
            {loading ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  className="me-2"
                />
                Updating...
              </>
            ) : (
              'Update'
            )}
          </Button>
        </Modal.Footer>
      </Modal>
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Notification;
