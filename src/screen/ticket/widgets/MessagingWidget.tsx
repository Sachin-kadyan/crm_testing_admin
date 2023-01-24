import { AttachFile, Reply, Send } from '@mui/icons-material';
import { Box, Stack, Typography } from '@mui/material';
import React, { Suspense, useEffect, useState } from 'react';
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

  const handleSendMessage = () => {};

  useEffect(() => {
    const unsub = onSnapshot(collectionRef, (snapshot) => {
      const message: DocumentData[] = [];
      snapshot.forEach((doc) => {
        message.push(doc.data());
      });
      setMessages(message);
    });
    return () => unsub();
  }, [collectionRef]);

  return (
    <Stack direction="column" spacing={2}>
      <Box mx={1} p={2} bgcolor="white" borderRadius={2}>
        <Box
          borderBottom={0.5}
          borderColor="#F0F0F0"
          display="flex"
          justifyContent="space-between"
        >
          <Typography variant="h6" fontWeight={500}>
            Communication
          </Typography>
        </Box>
        {/* Message Section  */}
        <Box
          height="58vh"
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
                      maxWidth="60%"
                      m={1}
                      bgcolor="#f1f5f7"
                      p={2}
                    >
                      <Typography>{item.text}</Typography>
                    </Box>
                  </Box>
                ) : (
                  <Box display="flex" justifyContent="flex-end">
                    <Box
                      maxWidth="60%"
                      sx={{
                        borderRadius: `-webkit-border-radius: 20px;
                    -webkit-border-bottom-right-radius: 0;
                    -moz-border-radius: 20px;
                    -moz-border-radius-bottomright: 0;
                    border-radius: 20px;
                    border-bottom-right-radius: 0;`
                      }}
                      m={1}
                      bgcolor="#317AE2"
                      p={2}
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
        position="absolute"
        bottom={0}
        bgcolor="white"
        width="100%"
        height="10vh"
        mt={3}
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
