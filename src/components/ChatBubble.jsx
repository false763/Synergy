import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import chatIcon from './chatIcon.png';
import HappyEmojiAnimate from './happy-emoji-animate.gif';
import AngryEmojiAnimate from './angry-emoji-animate.gif';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: theme.spacing(1),
    maxWidth: '96%',
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
  },
  avatar: {
    width: theme.spacing(5),
    height: theme.spacing(5),
    marginRight: theme.spacing(1),
  },
  sent: {
    backgroundColor: '#4cb53f',
    color: theme.palette.common.white,
    alignSelf: 'flex-end',
  },
  received: {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
    alignSelf: 'flex-start',
  },
  sentimentIcon: {
    width: '20px',
    height: '20px',
    marginLeft: '5px',
  },
  

}));

const ChatMessage = ({ message, sentimentData, sent }) => {
  const classes = useStyles();
  const avatar = <Avatar src={chatIcon} className={classes.avatar} />;
  const sentimentIcon = sentimentData > 0 ? HappyEmojiAnimate : AngryEmojiAnimate;
  const sentimentText = sentimentData > 0 ? "Happy" : "Sad";
  return (
    <Grid container direction="row" alignItems="center">
      <Grid item>{sent && avatar}</Grid>
      <Grid item xs={12} sm={8}>
        <Paper className={`${classes.paper} ${sent ? classes.sent : classes.received}`}>
          <Grid container direction="column">
            <Grid item>
              <Typography variant="body1">{message}</Typography>
            </Grid>
            {sentimentData !== undefined && (
              <div style={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="caption" color="textSecondary">Sentiment of message: {sentimentText}</Typography>
              <img src={sentimentIcon} alt="Sentiment" className={classes.sentimentIcon} />
            </div>
            
            )}
          </Grid>
        </Paper>
      </Grid>
      <Grid item>{!sent && avatar}</Grid>
    </Grid>
  );
};

const ChatBubble = ({ messages }) => {
  const classes = useStyles();
  return (
    <Grid container direction="column" justify="flex-start" alignItems="flex-start">
      {messages &&
        messages.map((message, i) => (
          <ChatMessage
            key={i}
            message={message?.MessageContent}
            sentimentData={message?.sentimentScore}
            sent={i % 2 === 0}
          />
        ))}
    </Grid>
  );
};

export default ChatBubble;
