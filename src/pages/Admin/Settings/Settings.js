import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Modal, Row, Spinner } from "react-bootstrap";
import { MdDelete } from "react-icons/md";
import BasicTable from ".././../../components/BasicTable";
import Header from ".././../../components/Header";
import Loader from ".././../../pages/Admin/Loader/Loader";
import {  useAddBannerMutation, useAddGameMutation, useDeleteBannerMutation, useDeleteGameMutation, useEditBannerMutation, useEditGameMutation, useGetSettingQuery } from "../../../redux/api/SettingsApi";
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

  const [gameIdToDelete, setGameIdToDelete] = useState("");
  const [gameDeleteShow, setGameDeleteShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editGameId, setEditGameId] = useState(null);




    // Modal visibility states
    const [showBannerModal, setShowBannerModal] = useState(false);
    const [showGameModal, setShowGameModal] = useState(false);

    const [showBannerEditModal, setShowBannerEditModal] = useState(false);
    const [showGameEditModal, setShowGameEditModal] = useState(false);
  
    // Input states
    const [bannerTitle, setBannerTitle] = useState("");
    const [bannerImage, setBannerImage] = useState(null);
    const [gameName, setGameName] = useState("");
    const [gameImage, setGameImage] = useState(null);

    const [editbannerTitle, setEditBannerTitle] = useState("");
    const [editbannerImage, setEditBannerImage] = useState(null);
    const [editgameName, setEditGameName] = useState("");
    const [editgameImage, setEditGameImage] = useState(null);


  const { data: SettingsData, isLoading ,refetch} = useGetSettingQuery();
  const [deleteBanner] = useDeleteBannerMutation();
  const [deleteGame] = useDeleteGameMutation();
  const [addBanner] = useAddBannerMutation();
  const [addGame] = useAddGameMutation();
  const [editBanner] = useEditBannerMutation();
  const [editGame] = useEditGameMutation();










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

  const GamedeleteHandleClose = () => setGameDeleteShow(false);

  const gameDeleteHandleShow = (id) => {
    setGameIdToDelete(id);
    setGameDeleteShow(true);
  };

  const deleteBanners = async () => {
    try {
      const response = await deleteBanner(idToDelete);
      setDeleteShow(false);
      setIdToDelete("");
      if (response?.data) {
        toast.success(response?.data?.message, { autoClose: 1000 });
      } else {
        toast.error(response?.error?.data.error, { autoClose: 1000 });
        console.log("else part");
        console.log(response.error);
      }
    } catch (error) {
      console.error(error);
    }
  };


  const deleteGames = async () => {
    try {
      const response = await deleteGame(gameIdToDelete);
      setGameDeleteShow(false);
      setGameIdToDelete("");
      if (response?.data) {
        toast.success(response?.data?.message, { autoClose: 1000 });
      } else {
        toast.error(response?.error?.data.error, { autoClose: 1000 });
        console.log("else part");
        console.log(response.error);
      }
    } catch (error) {
      console.error(error);
    }
  };



  const handleAddBanner = () => {
    setShowBannerModal(true);
  };

  const handleAddGame = () => {
    setShowGameModal(true);
  };

  // const handleEditBanner = () => {
  //   setShowBannerEditModal(true);
  // };

  // const handleEditGame = () => {
  //   setShowGameEditModal(true);
  // };



  const handleAddBanners = async () => {
    setLoading(true);
    try {

      const formData = new FormData();
      formData.append('image', bannerImage);
      formData.append('title', bannerTitle);

      const response = await addBanner({ data: formData});

      if (response?.data) {
        toast.success(response?.data?.message, { autoClose: 1000 });
        setBannerImage('');
        setBannerTitle('');
    
      } else {
        toast.error(response?.error?.data.error, { autoClose: 1000 });
      }
    } catch (error) {
      console.error(error);
    }
    finally {
      setLoading(false);
    }
  };


  const handleAddGames = async () => {
    setLoading(true);
    try {

      const formData = new FormData();
      formData.append('image', gameImage);
      formData.append('name', gameName);

      const response = await addGame({ data: formData});

      if (response?.data) {
        toast.success(response?.data?.message, { autoClose: 1000 });
        setGameName('');
        setGameImage('');
    
      } else {
        toast.error(response?.error?.data.error, { autoClose: 1000 });
      }
    } catch (error) {
      console.error(error);
    }
    finally {
      setLoading(false);
    }
  };


  const handleFileAddBannerChange = (file) => {
    setBannerImage(file);
  };

  const handleFileAddGameChange = (file) => {
    setGameImage(file);
  };

  const handleFileEditBannerChange = (file) => {
    setEditBannerImage(file);
  };

  const handleFileEditGameChange = (file) => {
    setEditGameImage(file);
  };


  const handleEditBanner = (id) => {
    const editBanner = data.find((d) => d._id === id);
    if (editBanner) {
      setEditId(id);
      setEditBannerTitle(editBanner.title);
      setEditBannerImage(editBanner.image);
      setShowBannerEditModal(true);
    }
  };

  const handleEditBannerClose = () => {
    setShowBannerEditModal(false);
    setEditId(null);
    setEditBannerTitle("");
      setEditBannerImage(null);
  ;
  };



  
  const handleEditGame = (id) => {
    const editGames = gameData.find((d) => d._id === id);
    if (editGames) {
      setEditGameId(id);
      setEditGameName(editGames.name);
      setEditGameImage(editGames.image);
      setShowGameEditModal(true);
    }
  };

  const handleEditGameClose = () => {
    setShowGameEditModal(false);
    setEditGameId(null);
    setEditGameName("");
    setEditGameImage(null);
  ;
  };

  
  const handleEditBanners = async () => {
    if (!editbannerTitle ) {
      toast.error('Please fill all  fields', { autoClose: 1000 });
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('title', editbannerTitle);
      formData.append('image', editbannerImage);

      const response = await editBanner({
        id: editId,
        data: formData,
      });

      if (response.data) {
        toast.success(response.data.message, { autoClose: 1000 });
        setShowBannerEditModal(false);
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

  const handleEditGames= async () => {
    if (!editgameName) {
      toast.error('Please fill all  fields', { autoClose: 1000 });
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('name', editgameName);
      formData.append('image', editgameImage);

      const response = await editGame({
        id: editGameId,
        data: formData,
      });

      if (response.data) {
        toast.success(response.data.message, { autoClose: 1000 });
        setShowGameEditModal(false);
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
            <Button variant="warning" onClick={() => handleEditBanner(rowIdx)}>
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
            <Button variant="warning" onClick={() => handleEditGame(rowIdx)}>
              <FaEdit />
            </Button>
            <Button variant="danger" className="m-1" onClick={() => gameDeleteHandleShow(rowIdx)}>
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
                   ONCLICK={handleAddBanner}
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
                  ONCLICK={handleAddGame}
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

{/* Add Banner Modal */}
<Modal show={showBannerModal} onHide={() => setShowBannerModal(false)} centered>
            <Modal.Header closeButton>
              <Modal.Title>Add Banner</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Banner Title</Form.Label>
                  <Form.Control
                    type="text"
                    value={bannerTitle}
                    onChange={(e) => setBannerTitle(e.target.value)}
                    placeholder="Enter banner title"
                  />
                </Form.Group>
                <DragAndDropImageUpload
              labelText="Upload Image"
              accepts={{
                'image/*': ['.png', '.jpeg', '.jpg', '.svg', '.webp'],
              }}
              handleFileChange={(file) => {
                handleFileAddBannerChange(file);
              }}
            />
            <div>
              <small className="text-muted">
                Accepted file types: .jpg , .jpeg, .png, .svg, .webp{' '}
              </small>
            </div>
            <InputImage image={bannerImage} valueImage={bannerImage} />

              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowBannerModal(false)}>
                Close
              </Button>
              <Button style={{backgroundColor:"#083C7A"}} onClick={handleAddBanners}
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

          {/* Edit Banner Modal */}
<Modal show={showBannerEditModal} onHide={() => setShowBannerEditModal(false)} centered>
            <Modal.Header closeButton>
              <Modal.Title>Edit Banner</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Edit Banner Title</Form.Label>
                  <Form.Control
                    type="text"
                    value={editbannerTitle}
                    onChange={(e) => setEditBannerTitle(e.target.value)}
                    placeholder="Enter banner title"
                  />
                </Form.Group>
                <DragAndDropImageUpload
              labelText="Upload Image"
              accepts={{
                'image/*': ['.png', '.jpeg', '.jpg', '.svg', '.webp'],
              }}
              handleFileChange={(file) => {
                handleFileEditBannerChange(file);
              }}
            />
            <div>
              <small className="text-muted">
                Accepted file types: .jpg , .jpeg, .png, .svg, .webp{' '}
              </small>
            </div>
            <InputImage image={editbannerImage} valueImage={editbannerImage} />

              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleEditBannerClose}>
                Close
              </Button>
              <Button style={{backgroundColor:"#083C7A"}} onClick={handleEditBanners}
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
                     Update...
                   </>
                 ) : (
                   'Update'
                 )}
              </Button>
            </Modal.Footer>
          </Modal>

          {/* Add Game Modal */}
          <Modal show={showGameModal} onHide={() => setShowGameModal(false)} centered>
            <Modal.Header closeButton>
              <Modal.Title>Add Game</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Game Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={gameName}
                    onChange={(e) => setGameName(e.target.value)}
                    placeholder="Enter game title"
                  />
                </Form.Group>
                <DragAndDropImageUpload
              labelText="Upload Image"
              accepts={{
                'image/*': ['.png', '.jpeg', '.jpg', '.svg', '.webp'],
              }}
              handleFileChange={(file) => {
                handleFileAddGameChange(file);
              }}
            />
            <div>
              <small className="text-muted">
                Accepted file types: .jpg , .jpeg, .png, .svg, .webp{' '}
              </small>
            </div>
            <InputImage image={gameImage} valueImage={gameImage} />
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowGameModal(false)}>
                Close
              </Button>
              <Button style={{backgroundColor:"#083C7A"}} onClick={handleAddGames}
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
            {/* Edit Game Modal */}
            <Modal show={showGameEditModal} onHide={() => setShowGameEditModal(false)} centered>
            <Modal.Header closeButton>
              <Modal.Title>Edit Game</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Edit Game Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={editgameName}
                    onChange={(e) => setEditGameName(e.target.value)}
                    placeholder="Enter game title"
                  />
                </Form.Group>
                <DragAndDropImageUpload
              labelText="Upload Image"
              accepts={{
                'image/*': ['.png', '.jpeg', '.jpg', '.svg', '.webp'],
              }}
              handleFileChange={(file) => {
                handleFileEditGameChange(file);
              }}
            />
            <div>
              <small className="text-muted">
                Accepted file types: .jpg , .jpeg, .png, .svg, .webp{' '}
              </small>
            </div>
            <InputImage image={editgameImage} valueImage={editgameImage} />
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleEditGameClose}>
                Close
              </Button>
              <Button style={{backgroundColor:"#083C7A"}} onClick={handleEditGames}
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
                     Update...
                   </>
                 ) : (
                   'Update'
                 )}
              </Button>
            </Modal.Footer>
          </Modal>

          <DeleteModel
            DELETESTATE={deleteShow}
            ONCLICK={deleteHandleClose}
            YES={deleteBanners}
            DESCRIPTION="Confirm to Delete this Banner"
            DELETETITLE="Banner"
          />
         
         <DeleteModel
            DELETESTATE={gameDeleteShow}
            ONCLICK={GamedeleteHandleClose}
            YES={deleteGames}
            DESCRIPTION="Confirm to Delete this Game"
            DELETETITLE="Game"
          />
         


         
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Settings;
