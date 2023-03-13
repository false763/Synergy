// import React, { useState, useEffect } from 'react';
// import { Container, Grid, Card, Typography } from '@mui/material';
// import Happy from './Happy.png';
// import { useSpring, animated } from 'react-spring';
// import "../styles.css"
// import { auth } from './firebase'; // import the AuthContext

// const ServiceRequestTable = () => {
//   const [isHovered, setIsHovered] = useState(false);
//   const [isDataPresent, setIsDataPresent] = useState(null);
//   const [dataFetched, setDataFetched] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   useEffect(() => {
//     // check if user is logged in
//     const unsubscribe = auth.onAuthStateChanged(user => {
//       setIsLoggedIn(!!user); // set isLoggedIn to true if user exists, false otherwise
//     });

//     return unsubscribe;
//   }, []);
//   useEffect(() => {
//     if (!dataFetched) {
//       const fetchData = async () => {
//         var requestOptions = {
//           method: 'GET',
//           redirect: 'follow',
//           headers: {"access-control-allow-origin" : "*",
//           "Content-type": "application/json; charset=UTF-8"},
//           mode: 'cors'
//         };
//         try {
//           const response = await fetch("https://synergybackend.el.r.appspot.com/getServiceReqlist", requestOptions);
//           const data = await response.json();
//           setIsDataPresent(data);
//           setDataFetched(true);
//           console.log("Data", data)
//         } catch (error) {
//           setIsDataPresent(error)
//           console.error('Error fetching data:', error);
//         }
//       };
   
      
//       fetchData();
//     }
//   }, [dataFetched]);

//   const hoverAnimation = useSpring({
//     transform: isHovered ? 'scale(1.05)' : 'scale(1)',
//   });

//   const LoginModal = () => {
//     return (
//       <div className="modal">
//         <div className="modal-content">
//           <h2>Please log in or sign up to view the content</h2>
//           <a href="/login">Login</a>
//               <a href="/signup">Signup</a>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <Container maxWidth="md">
//       {isLoggedIn ? (
//         <Grid container spacing={3}>
          // {[...Array(6)].map((_, i) => (
          //   <Grid item xs={4} key={i}>
          //     <animated.div
          //       onMouseEnter={() => setIsHovered(true)}
          //       onMouseLeave={() => setIsHovered(false)}
          //       style={hoverAnimation}
          //     >
          //       <Card>
          //         <Typography variant="h5" component="div">Special title treatment</Typography>
          //         <Typography variant="body1" component="div">
          //           With supporting text below as a natural lead-in to additional content.
          //         </Typography>
          //         <a className="text-primary">
          //           <img src={Happy} alt="Smile" width="24" height="24" />
          //         </a>
          //       </Card>
          //     </animated.div>
          //   </Grid>
          // ))}
//         </Grid>
//       ) : (
//         <LoginModal />
//       )}
//     </Container>
//   );
// };

// export default ServiceRequestTable;
// const messages = {
//     id: id,
//     Name: 'John',
//     chat: [
//       { sender: 'John', message: 'Hi, how are you?', timestamp: '2022-03-06T12:00:00Z', sent: true },
//       { sender: 'Sarah', message: "I'm doing well, thanks for asking!", timestamp: '2022-03-06T12:05:00Z', sent: false },
//       { sender: 'John', message: 'Glad to hear it!', timestamp: '2022-03-06T12:10:00Z', sent: true },
//       { sender: 'Sarah', message: 'How about you?', timestamp: '2022-03-06T12:15:00Z', sent: false },
//       { sender: 'John', message: "I'm good too, thanks!", timestamp: '2022-03-06T12:20:00Z', sent: true }
//     ]
//   };