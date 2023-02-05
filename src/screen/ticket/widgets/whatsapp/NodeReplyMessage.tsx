import { DownloadOutlined, PictureAsPdfOutlined } from '@mui/icons-material';
import { Box, IconButton, Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';
import React from 'react';

type Props = {
  message: any;
};

const NodeReplyMessage = ({ message }: Props) => {
  return (
    <>
      <Box
        my={1}
        maxWidth="70%"
        p={1}
        bgcolor="#d8fdd3"
        borderRadius="7.5px 7.5px 0px 7.5px"
      >
        <Typography variant="caption" color="green" fontSize="small">
          System Generated Message
        </Typography>
        <Stack>
          {message.headerType !== 'None' &&
            (message.headerType === 'Image' ? (
              <Box>
                <img
                  style={{ borderRadius: '3.25px' }}
                  src={message.headerLink}
                  alt={message.diseaseId}
                />
              </Box>
            ) : message.headerType === 'Video' ? (
              <Box>
                <video
                  poster="http://87.234.222.77/images/video-fallback.jpg"
                  style={{ borderRadius: '3.25px' }}
                  src={message.headerLink}
                  controls
                  controlsList="nofullscreen nodownload noremoteplayback noplaybackrate foobar"
                />
              </Box>
            ) : message.headerType === 'Document' ? (
              <Box>
                <Stack direction="row" justifyContent="space-between">
                  <Box>
                    <PictureAsPdfOutlined />
                    <Typography variant="caption" color="GrayText">
                      PDF Name
                    </Typography>
                  </Box>
                  <IconButton>
                    <DownloadOutlined />
                  </IconButton>
                </Stack>
              </Box>
            ) : null)}
          <Typography my={0.5}>{message.body}</Typography>
          <Box display="flex" justifyContent="flex-end">
            <Typography variant="caption" fontSize="0.7rem" color="GrayText">
              {dayjs(message.createdAt).format('DD MMM YYYY hh:mm A')}
            </Typography>
          </Box>
        </Stack>
      </Box>
      <Stack mt={1} direction="row" spacing={1}>
        {message.replyButton1 && (
          <Box
            color="primary.main"
            p={1}
            bgcolor="#d8fdd3"
            borderRadius="7.5px "
          >
            {message.replyButton1}
          </Box>
        )}
        {message.replyButton2 && (
          <Box
            color="primary.main"
            p={1}
            bgcolor="#d8fdd3"
            borderRadius="7.5px"
          >
            {message.replyButton2}
          </Box>
        )}
        {message.replyButton3 && (
          <Box
            color="primary.main"
            p={1}
            bgcolor="#d8fdd3"
            borderRadius="7.5px"
          >
            {message.replyButton3}
          </Box>
        )}
      </Stack>
    </>
  );
};

export default NodeReplyMessage;
