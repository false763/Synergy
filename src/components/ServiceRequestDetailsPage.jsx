import React, { useState, useEffect,useContext } from 'react';
import ChatBubble from './ChatBubble';
import { useParams } from 'react-router-dom';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { MyLoginContext } from '../App';

const ServiceRequestDetailsPage = () => {
  const { id } = useParams();
  const [myRecordData, setMyRecordData] = useState(null);
  const data = useContext(MyLoginContext);
  console.log("DataFromMyLoginContext",data);
  const { isLoggedIn} = data;
  useEffect(() => {
    const fetchRecord = async () => {
      const db = getFirestore();
      const docRef = doc(db, 'Service', id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setMyRecordData({ id: docSnap.id, ...docSnap.data() });
      } else {
        console.log('No such document!');
      }
    };

    fetchRecord();
  }, [id]);

  console.log('myRecordData', myRecordData?.Message);

  return (
    <>
      {isLoggedIn ?  
      (<>{myRecordData ? (
        myRecordData.Message.length > 0 ? (
          <><div className='service-detail-page-tab'>
           
          <div className='tab-left'>
            <div>
              <span><b>{myRecordData.serviceRequestID} : {myRecordData.ServiceSubject}</b></span>
              {
                myRecordData.Sentiment < 0 && <span className='bubble sentiment-negative'><b>at risk</b></span>
              }
            </div>
            <p>{myRecordData.ServiceDescription}</p>
          
            <hr></hr>
            <br></br>
            <div>
              <span className='bubble tag-primary'><b>{myRecordData.RolePreference}</b></span>
              <span className='bubble tag-primary'><b>{myRecordData.Category}</b></span>
              <span className='bubble tag-primary'><b>{myRecordData.Tag}</b></span>
            </div>
          </div>

          {
            myRecordData.Sentiment < 0 && <div className="circular-score sentiment-negative">
            <div className="score">{myRecordData.Sentiment}</div>
          </div>
          }

          {
            myRecordData.Sentiment === 0 && <div className="circular-score sentiment-neutral">
            <div className="score">{myRecordData.Sentiment}</div>
          </div>
          }

          {
            myRecordData.Sentiment > 0 && <div className="circular-score sentiment-positive">
            <div className="score">{myRecordData.Sentiment}</div>
          </div>
          }
         

          </div>
          <br></br>
          <ChatBubble messages={myRecordData.Message} /></>
        ) : (
          <p>No data found</p>
        )
      ) : (
        <p>Loading data...</p>
      )}</>) : <>Please Login to see the data</>}
      {/* <GetUserRoles/> */}
    </>
  );
};

export default ServiceRequestDetailsPage;
