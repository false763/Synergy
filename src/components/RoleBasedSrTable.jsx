import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography, Button, Modal, Box } from '@mui/material';
import Happy from './Happy.png';
import { useSpring, animated } from 'react-spring';
import "../styles.css";
import HappyEmojiAnimate from './happy-emoji-animate.gif';
import { auth } from './firebase'; // import the AuthContext
import { useNavigate } from 'react-router-dom';
import { getFirestore, collection, getDocs ,query,where} from 'firebase/firestore';

import './OrderTransition.css'

const RoleBasedSrTable = () => {
  const navigate = useNavigate();
 
  const [myCollectionData, setMyCollectionData] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // add a state for modal open/close

  useEffect(() => {
    // check if user is logged in
    const unsubscribe = auth.onAuthStateChanged(user => {
      setIsLoggedIn(!!user); // set isLoggedIn to true if user exists, false otherwise
    });

    return unsubscribe;
  }, []);

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
      
      {isLoggedIn ? (
        <Grid container spacing={3} >
          {myCollectionData.map((item) => (
            <Grid item xs={4} key={item.id} onClick={() => navigate(`/service-request/${item.id}`)}>
             
                <div class="card-panel">
  <div class="card-header">
    Service Request #{item?.id}
   
  </div>
  
  <div class="card-body">
    <h5 class="card-title">Subject: {item?.ServiceSubject}</h5>
    {item?.ServiceDescription ? (
                    <Typography variant="body1" component="div">
                      <p>
                        Desc: {item?.ServiceDescription.slice(0, 40)}
                        {item?.ServiceDescription.length > 40 ? "..." : ""}
                      </p>
                    </Typography>
                  ) : <Typography variant="body1" component="div">
                    <p>
                      Service Description: Description Not present
                    </p>
                  </Typography>}
    <div class="tag tag-critical">Critical</div>
    <div class="sentiment-value sentiment-positive">{item?.Tag}</div>
    
  </div>
</div>
            
            </Grid>
          ))}

        </Grid>
      ) : (<></>
        // <Box display="flex" alignItems="center" justifyContent="center" height="100vh">
        //   <Button variant="contained" onClick={handleOpenModal}>
        //     Please log in or sign up to view the content
        //   </Button>
        //   <Modal
        //     open={isModalOpen}
        //     onClose={handleCloseModal}
        //     aria-labelledby="modal-title"
        //     aria-describedby="modal-description"
        //   >
        //     <Box
        //       display="flex"
        //       alignItems="center"
        //       justifyContent="center"
        //       height="100vh"
        //     >
        //       <div className="modal">
        //         <div className="modal-content">
        //           <Typography variant="h5" id="modal-title">
        //             Please log in or sign up to view the content
        //           </Typography>
        //           <Button href="/login" color="primary">
        //             Login
        //           </Button>
        //           <Button href="/signup" color="secondary">
        //             Signup
        //           </Button>
        //         </div>
        //       </div>
        //     </Box>
        //   </Modal>
        // </Box>
      )}
    </Container>
  );
};

export default RoleBasedSrTable;
