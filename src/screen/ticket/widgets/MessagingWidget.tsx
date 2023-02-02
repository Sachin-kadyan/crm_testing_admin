import { Send } from '@mui/icons-material';
import { Box, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';
import { database } from '../../../utils/firebase';
import { collection, DocumentData, onSnapshot } from 'firebase/firestore';
import { useParams } from 'react-router-dom';

type Props = {};

const MessagingWidget = (props: Props) => {
  const { ticketID } = useParams();

  const TextInput = {
    border: 0,
    width: '100%',
    outline: 0,
    padding: '1rem',
    ' &:hover, &:focus ': {
      outline: 'none'
    }
  };

  if (ticketID) {
    const collectionRef = collection(database, 'ticket', ticketID, 'messages');
    onSnapshot(collectionRef, (snapshot) => {
      const message: DocumentData[] = [];
      snapshot.forEach((doc) => {
        message.push(doc.data());
      });
      setMessages(message);
    });
  }

  const [messages, setMessages] = useState<DocumentData[]>([]);
  const [sendMessage, setSendMessage] = useState('');

  const handleSendMessage = async () => {};

  return (
    <Stack
      direction="column"
      height="95%"
      position="relative"
      bgcolor="white"
      p={1}
    >
      <Box
        sx={{
          overflowY: 'scroll',
          '&::-webkit-scrollbar ': {
            display: 'none'
          }
        }}
        height="90%"
      >
        Hllo
      </Box>

      <Box
        borderTop={2.5}
        borderColor="#317AE2"
        bottom={0}
        bgcolor="white"
        height="10%"
      >
        <Stack p={1} direction="row" spacing={2} alignItems="center">
          <input
            onChange={(e) => setSendMessage(e.target.value)}
            placeholder="Enter Message"
            style={TextInput}
          />
          <Box display="flex" onClick={handleSendMessage}>
            <Typography color="gray">Reply</Typography>
            <Send htmlColor="gray" />
          </Box>
        </Stack>
      </Box>
    </Stack>
  );
};

export default MessagingWidget;
