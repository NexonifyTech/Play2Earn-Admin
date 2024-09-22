import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  Modal,
  Row,
  Spinner,
} from "react-bootstrap";
import BasicTable from ".././../../components/BasicTable";
import Header from ".././../../components/Title";
import Loader from ".././../../pages/Admin/Loader/Loader";
import {
  useGetUserListQuery,
  useEditUserListMutation,
} from "../../../redux/api/UserListApi";
import { toast } from "react-toastify";
import { FaEdit } from "react-icons/fa";

const UserList = () => {
  const [data, setData] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editShow, setEditShow] = useState(false);

  const {
    data: UserListData,
    isLoading,
    refetch,
  } = useGetUserListQuery();
  const [editUserListData] = useEditUserListMutation();

  useEffect(() => {
    if (UserListData && UserListData.data) {
      setData(UserListData.data);
    }
  }, [UserListData]);


 
  const handleEditShow = (id) => {
    const UserList = data.find((d) => d._id === id);

    if (UserList) {
      setEditId(id);
      setName(UserList.username);
      setPhoneNumber(UserList.mobileno);
      setEditShow(true);
    }
  };

  const handleEditClose = () => {
    setEditShow(false);
    setEditId(null);
    setName("");
    setPhoneNumber("");

  };

  const handleEditData = async () => {
    if (!name || !phoneNumber) {
      toast.error("Please fill  the fields", { autoClose: 1000 });
      return;
    }

    setLoading(true);

    try {
      const data = {
        mobileno: phoneNumber,
        name:name,
      };

      const response = await editUserListData({
        id: editId,
        data: data,
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
      Header: "User Name",
      accessor: "username",
    },
    {
      Header: "Mobile No",
      accessor: "mobileno",
      width: "auto",
      minWidth: 100,
    },
    {
      Header: "Referral Code",
      accessor: "referralcode",
      width: "auto",
      minWidth: 100,
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
                  HEADING="  UserList"
                  headingClassName="text-center text-md-start m-md-4 m-xl-2"
                />
              </Col>
            </Row>
            <Row className="justify-content-center boxShadow p-4 mb-4">
              <Col
                xs={12}
                lg={12}
                xl={12}
                xxl={12}
                md={12}
                className="table-responsive"
              >
                <BasicTable COLUMNS={COLUMNS} MOCK_DATA={data} />
              </Col>
            </Row>
          </Container>

          <Modal show={editShow} onHide={handleEditClose} centered>
            <Modal.Header closeButton>
              <Modal.Title>Edit UserList</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
              <Form.Group className="mb-3" controlId="formTitle">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Form.Group>

              <Form.Group className="mb-3" controlId="formTitle">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter phonenumber"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleEditClose}>
                Cancel
              </Button>
              <Button
                style={{ backgroundColor: "#083C7A", border: "none" }}
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
                  "Update"
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

export default UserList;
