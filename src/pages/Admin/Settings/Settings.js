import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Modal, Row, Spinner } from "react-bootstrap";
import { MdDelete } from "react-icons/md";
import BasicTable from ".././../../components/BasicTable";
import Header from ".././../../components/Header";
import Loader from ".././../../pages/Admin/Loader/Loader";
import {  useDeleteBannerMutation, useGetSettingQuery } from "../../../redux/api/SettingsApi";
import { toast } from "react-toastify";
import DeleteModel from ".././../../components/DeleteModel";
import { BsSearch, BsX } from "react-icons/bs";
import { format } from "date-fns";
import DragAndDropImageUpload from "../../../components/DragAndDropImageUpload";
import InputImage from "../../../components/ImageInputs";
import { FaEdit } from "react-icons/fa";

const Settings = () => {
 
  const [data, setData] = useState([]);
  const [gameData, setGameData] = useState([]);
  const [idToDelete, setIdToDelete] = useState("");
  const [deleteShow, setDeleteShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editShow, setEditShow] = useState(false);


  const { data: SettingsData, isLoading ,refetch} = useGetSettingQuery();
  const [deleteBanner] = useDeleteBannerMutation();




  useEffect(() => {
    if (SettingsData && SettingsData.data) {
      setData(SettingsData.data[0].banners);
      setGameData(SettingsData.data[0].gameCategories);

    }
  }, [SettingsData]);



//   const handleNavigateAddForm = () => setShowAddModal(true);

  const deleteHandleClose = () => setDeleteShow(false);

  const deleteHandleShow = (id) => {
    setIdToDelete(id);
    setDeleteShow(true);
  };

 

  const deleteSettings = async () => {
    try {
      const response = await deleteBanner(idToDelete);
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

//   const handleAddSettings = async () => {
//     setLoading(true);
//     try {
//       const response = await addSettingsApi ({
//         title: title,
//         message: body,
//         image:image,
         
//       });
//       if (response?.data) {   
//         toast.success(response?.data?.message, { autoClose: 1000 });
//         setTitle("");
//         setBody("");
//         setImage("");
//         setShowAddModal(false)     
//       } else {
//         toast.error(response?.error?.data.error, { autoClose: 1000 });
//         console.log("else part");
//         console.log(response.error);
//       }
//     } catch (error) {
//       console.error(error);
//     }
//       finally {
//         setLoading(false);
//     }
//   };

//   const handleFileAddChange = (file) => {
//     setImage(file);
//   };

//   const handleFileChange = (file) => {
//     setEditImage(file);
//   };

//   const handleEditShow = (id) => {
//     const Settings = data.find((d) => d._id === id);

//     if (Settings) {
//       setEditId(id);
//       setEditTitle(Settings.title);
//       setEditBody(Settings.message);
//       setEditImage(Settings.imageUrl);
//       setEditShow(true);
//     }
//   };

//   const handleEditClose = () => {
//     setEditShow(false);
//     setEditId(null);
//     setEditTitle("");
//       setEditBody("");
//       setEditImage(null);
//   ;
//   };

  
//   const handleEditData = async () => {
//     if (!editTitle || !editBody) {
//       toast.error('Please fill all the fields', { autoClose: 1000 });
//       return;
//     }

//     setLoading(true);

//     try {
//       const formData = new FormData();
//       formData.append('title', editTitle);
//       formData.append('message', editBody);
//       formData.append('imageUrl', editImage);

//       const response = await editSettingsData({
//         id: editId,
//         data: formData,
//       });

//       if (response.data) {
//         toast.success(response.data.message, { autoClose: 1000 });
//         setEditShow(false);
//         refetch();
//       } else {
//         toast.error(response.error.data.error, { autoClose: 1000 });
//       }
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };


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
            {/* <Button variant="warning" onClick={() => handleEditShow(rowIdx)}>
              <FaEdit />
            </Button>
            <Button variant="danger" className="m-1" onClick={() => deleteHandleShow(rowIdx)}>
              <MdDelete />
            </Button> */}
          </div>
        );
      },
    },
  ];

  const COLUMN = [
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
      Header: "Name",
      accessor: "name",
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
            {/* <Button variant="warning" onClick={() => handleEditShow(rowIdx)}>
              <FaEdit />
            </Button>
            <Button variant="danger" className="m-1" onClick={() => deleteHandleShow(rowIdx)}>
              <MdDelete />
            </Button> */}
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
                  ONCLICK={""}
                  HEADING="Banners"
                  BUTTON_NAME="Add Banner"
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
            <Row className="boxShadow p-4 mb-4 mt-4">
              <Col>
                <Header
                  ONCLICK={""}
                  HEADING="Game Categories"
                  BUTTON_NAME="Add Game"
                  headingClassName="text-center text-md-start m-md-4 m-xl-2"
                />
              </Col>
            </Row>
            <Row className="justify-content-center boxShadow p-4 mb-4">
              <Col xs={12} lg={12} xl={12} xxl={12} md={12} className="table-responsive">
                <BasicTable
                  COLUMNS={COLUMN}
                  MOCK_DATA={gameData}
                />
              </Col>
            </Row>
          </Container>
          <DeleteModel
            DELETESTATE={deleteShow}
            ONCLICK={deleteHandleClose}
            YES={deleteSettings}
            DESCRIPTION="Confirm to Delete this Settings"
            DELETETITLE="Settings"
          />
         


         
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Settings;
