import { Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import "../styles.css"

const CardComponent = (props) => {
  const navigate = useNavigate();

  const getSentimentClassNameAndTag = () => {
    if (props.Sentiment < 0) {
      return { className: 'card-panel card-panel-critical', tag: 'Critical' };
    } else {
      return { className: 'card-panel card-panel-positive', tag: 'Positive' };
    }
  };

  const { className, tag } = getSentimentClassNameAndTag();

  return (
    <Grid item xs={4} key={props.id} onClick={() => navigate(`/service-request/${props.id}`)}>
      <div className={className}>
        <div className="card-header">
          Service Request #{props.id}, {props.Sentiment}
        </div>
        <div className="card-body">
          <h5 className="card-title">Subject: {props.ServiceSubject}</h5>
          {props.ServiceDescription ? (
            <Typography variant="body1" component="div">
              <p>
                Desc: {props.ServiceDescription.slice(0, 40)}
                {props.ServiceDescription.length > 40 ? '...' : ''}
              </p>
            </Typography>
          ) : (
            <Typography variant="body1" component="div">
              <p>Service Description: Description Not present</p>
            </Typography>
          )}
          <div className={`tag tag-${tag.toLowerCase()}`}>{tag}</div>
          <div className={`sentiment-value sentiment-${tag.toLowerCase()}`}>{props.Tag}</div>
        </div>
      </div>
    </Grid>
  );
}

export default CardComponent;
