import React, { useState, useEffect, useContext } from 'react';
import { Container, Grid, Typography, Button, Modal, Box } from '@mui/material';
import "../styles.css"
import { MyLoginContext } from '../App';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import CardComponent from './CardComponent';

const ServiceRequestTable = (props) => {

  const data = useContext(MyLoginContext);
  const { isLoggedIn } = data;
  const [myCollectionData, setMyCollectionData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(isLoggedIn ? false : true); // add a state for modal open/close


  useEffect(() => {
    const fetchData = async () => {
      const db = getFirestore();
      const querySnapshot = await getDocs(collection(db, 'Service'));
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMyCollectionData(data);
    }
    fetchData();
  }, []);
  console.log("myCollectionData", myCollectionData);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  let stages = ["Order Submitted", "Packaged", "Out for delivery"]
  let currentStage = "Order Submitted"
  return (
    <Container maxWidth="md">
      {isLoggedIn ? (
        <>
          {myCollectionData && myCollectionData.length > 0 ? <>
            <Grid container spacing={3} >
              {myCollectionData.map((item) => (
                <CardComponent id={item.id} ServiceDescription={item?.ServiceDescription} Tag={item?.Tag} ServiceSubject={item?.ServiceSubject} Sentiment={item?.Sentiment} />
              ))}
            </Grid> </> : <>
            <h4>Loading Service Requests...</h4>
          </>}
        </>) : (
        <Box display="flex" alignItems="center" justifyContent="center" height="100vh">
          <Modal
            open={isModalOpen}
            onClose={handleCloseModal}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
          >
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              height="100vh"
            >
              <div className="modal">
                <div className="modal-content">
                  <Typography variant="h5" id="modal-title">
                    Please log in or sign up to view the content
                  </Typography>
                  <Button href="/login" color="primary">
                    Login
                  </Button>
                  <Button href="/signup" color="secondary">
                    Signup
                  </Button>
                </div>
              </div>
            </Box>
          </Modal>
        </Box>
      )}
    </Container>
  );
};

export default ServiceRequestTable;
