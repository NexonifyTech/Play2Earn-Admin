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
import Header from ".././../../components/Header";
import Loader from ".././../../pages/Admin/Loader/Loader";
import {
  useGetTransactionQuery,
  useAddTransactionMutation,
  useEditTransactionMutation,
} from "../../../redux/api/TransactionApi";
import { toast } from "react-toastify";
import { format } from "date-fns";
import { FaEdit } from "react-icons/fa";

const Transaction = () => {
  const [data, setData] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editShow, setEditShow] = useState(false);

  const {
    data: TransactionData,
    isLoading,
    refetch,
  } = useGetTransactionQuery();
  const [addTransactionApi] = useAddTransactionMutation();
  const [editTransactionData] = useEditTransactionMutation();

  useEffect(() => {
    if (TransactionData && TransactionData.data) {
      setData(TransactionData.data);
    }
  }, [TransactionData]);

  const handleNavigateAddForm = () => setShowAddModal(true);

  const handleAddTransaction = async () => {
    setLoading(true);
    try {
      const data = {
        mobileno: phoneNumber,
      };
      const response = await addTransactionApi({ data: data });
      if (response?.data) {
        toast.success(response?.data?.message, { autoClose: 1000 });
        setPhoneNumber("");
        setShowAddModal(false);
      } else {
        toast.error(response?.error?.data.error, { autoClose: 1000 });
        setPhoneNumber("");
        console.log("else part");
        console.log(response.error);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditShow = (rows) => {
    console.log(rows.transactionStatus);

    const Transaction = data.find((d) => d._id === rows._id);

    if (Transaction) {
      setEditId(rows._id);
      setStatus(rows.transactionStatus);
      setEditShow(true);
    }
  };

  const handleEditClose = () => {
    setEditShow(false);
    setEditId(null);
    setStatus("");
  };

  const handleEditData = async () => {
    if (!status) {
      toast.error("Please fill  the fields", { autoClose: 1000 });
      return;
    }

    setLoading(true);

    try {
      const data = {
        transactionStatus: status,
      };

      const response = await editTransactionData({
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
      Header: "Account Holder Name",
      accessor: "bankDetails.accountHolderName",
    },
    {
      Header: "Bank Name",
      accessor: "bankDetails.bankName",
      width: "auto",
      minWidth: 100,
    },
    {
      Header: "Account Number",
      accessor: "bankDetails.accountNumber",
    },
    {
      Header: "IFSC Code",
      accessor: "bankDetails.ifscCode",
      width: "auto",
      minWidth: 100,
    },
    {
      Header: "Mobile No",
      accessor: "mobileno",
      width: "auto",
      minWidth: 100,
    },

    {
      Header: "Coins",
      accessor: "coins",
      width: "auto",
      minWidth: 100,
    },
    {
      Header: "Transaction Status",
      accessor: "transactionStatus",
      width: "auto",
      minWidth: 100,
    },
    {
      Header: "Created At",
      accessor: "createdAt",
      width: "auto",
      minWidth: 100,
      Cell: ({ value }) => {
        const formattedDateTime = format(new Date(value), "dd-MM-yyyy hh:mm a");
        return <span>{formattedDateTime}</span>;
      },
    },
    {
      Header: "Updated At",
      accessor: "updatedAt",
      width: "auto",
      minWidth: 100,
      Cell: ({ value }) => {
        const formattedDateTime = format(new Date(value), "dd-MM-yyyy hh:mm a");
        return <span>{formattedDateTime}</span>;
      },
    },
    {
      Header: "ACTIONS",
      accessor: "action",
      fixed: "right",
      Cell: (props) => {
        const rowIdx = props.row.original;
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
                  ONCLICK={handleNavigateAddForm}
                  HEADING="  Transaction"
                  BUTTON_NAME="Add "
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

          <Modal
            show={showAddModal}
            onHide={() => setShowAddModal(false)}
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>Add Transaction</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
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
              <Button
                variant="secondary"
                onClick={() => setShowAddModal(false)}
              >
                Close
              </Button>
              <Button
                variant="primary"
                onClick={handleAddTransaction}
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
                  "Add"
                )}
              </Button>
            </Modal.Footer>
          </Modal>

          <Modal show={editShow} onHide={handleEditClose} centered>
            <Modal.Header closeButton>
              <Modal.Title>Edit Transaction</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId="deviceStatusSelect" className="mb-3">
                  <Form.Label>
                    Status <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="" disabled>
                      Select Status
                    </option>
                    <option value="Pending">Pending</option>
                    <option value="Successfully">Successfully</option>
                    <option value="Failed">Failed</option>
                  </Form.Select>
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

export default Transaction;
