import { Send } from '@mui/icons-material';
import { Box, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';
import { database } from '../../../utils/firebase';
import { collection, DocumentData, onSnapshot } from 'firebase/firestore';

type Props = {};

const MessagingWidget = (props: Props) => {
  const TextInput = {
    border: 0,
    width: '100%',
    padding: '1rem',
    ' &:hover, &:focus ': {
      outline: 'none'
    }
  };

  const collectionRef = collection(
    database,
    'ticket',
    '63bbba656cf5f7cd69ef6de3',
    'messages'
  );

  const [messages, setMessages] = useState<DocumentData[]>([]);
  const [sendMessage, setSendMessage] = useState('');

  const handleSendMessage = async () => {};

  onSnapshot(collectionRef, (snapshot) => {
    const message: DocumentData[] = [];
    snapshot.forEach((doc) => {
      message.push(doc.data());
    });
    setMessages(message);
  });

  return (
    <Stack direction="column" bgcolor="white">
      <Box height="80%" bgcolor="white" borderRadius={2}>
        {/* Message Section  */}
        <Box
          sx={{
            overflowY: 'scroll',
            '&::-webkit-scrollbar ': {
              display: 'none'
            }
          }}
        >
          {messages
            ? messages.map((item) =>
                item.type === 'received' ? (
                  <Box display="flex" justifyContent="flex-start">
                    <Box
                      sx={{
                        borderRadius: `-webkit-border-radius: 20px;
                    -webkit-border-bottom-left-radius: 0;
                    -moz-border-radius: 20px;
                    -moz-border-radius-bottomleft: 0;
                    border-radius: 20px;
                    border-bottom-left-radius: 0;`
                      }}
                      m={1}
                      bgcolor="#f1f5f7"
                    >
                      <Typography>{item.text}</Typography>
                    </Box>
                  </Box>
                ) : (
                  <Box display="flex" justifyContent="flex-end">
                    <Box
                      sx={{
                        borderRadius: `-webkit-border-radius: 20px;
                    -webkit-border-bottom-right-radius: 0;
                    -moz-border-radius: 20px;
                    -moz-border-radius-bottomright: 0;
                    border-radius: 20px;
                    border-bottom-right-radius: 0;`
                      }}
                      bgcolor="#317AE2"
                    >
                      <Typography color="white">{item.text}</Typography>
                    </Box>
                  </Box>
                )
              )
            : 'Loading'}

          {/* Type Sent */}
        </Box>
      </Box>
      <Box
        borderTop={2.5}
        borderColor="#317AE2"
        bottom={0}
        bgcolor="white"
        height="20%"
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
