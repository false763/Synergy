import React, { useState, useEffect,useContext } from 'react';
import { Container, Grid, Typography, Button, Modal, Box } from '@mui/material';
import "../styles.css";
import { MyLoginContext } from '../App';
import { useNavigate } from 'react-router-dom';
import { getFirestore, collection, getDocs ,query,where} from 'firebase/firestore';
import CardComponent from './CardComponent';

const RoleBasedSrTable = () => {
  const data = useContext(MyLoginContext);
  console.log("DataFromMyLoginContext",data);
  const { isLoggedIn} = data;
  const [myCollectionData, setMyCollectionData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // add a state for modal open/close


  useEffect(() => {
    const fetchData = async () => {
      const db = getFirestore();
      
      // Get the user's roles from local storage
      const roles = JSON.parse(localStorage.getItem('userRoles')) || {};
      const rolesArray = Object.entries(roles).filter(([key, value]) => value).map(([key]) => key);
      console.log("roleArray",rolesArray);
      // Build the Firestore query based on the user's roles
      let queryRef = collection(db, 'Service');
      for (const role of rolesArray) {
        queryRef = query(queryRef, where('RolePreference', '==', role));
      }
      console.log("queryRef",queryRef);
      // Fetch the data
      const querySnapshot = await getDocs(queryRef);
      console.log("querySnapshot",querySnapshot);
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      console.log("data",data);
      
      // Update the state with the fetched data
      setMyCollectionData(data);
    }
    
    fetchData();
  }, []);
  


  console.log("myCollectionData", myCollectionData);
 

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  let stages = ["Order Submitted","Packaged","Out for delivery"]
  let currentStage = "Order Submitted"
  return (
    <Container maxWidth="md">
      
      {isLoggedIn ? (<>
        { myCollectionData && myCollectionData.length>0 ? <Grid container spacing={3} >
          {myCollectionData.map((item) => (
               <CardComponent id={item.id} ServiceDescription={item?.ServiceDescription} Tag={item?.Tag} ServiceSubject={item?.ServiceSubject} Sentiment={item?.Sentiment} />
          ))}

        </Grid>  : <> <h4>Loading Service Requests...</h4></>}</>
      ) : (
        <Box display="flex" alignItems="center" justifyContent="center" height="100vh">
          <Button variant="contained" onClick={handleOpenModal}>
            Please log in or sign up to view the content
          </Button>
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

export default RoleBasedSrTable;
