import { Box, Chip, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  createNotesHandler,
  getAllNotesHandler
} from '../../../api/ticket/ticketHandler';
import useTicketStore from '../../../store/ticketStore';
import { ReactComponent as NoResultFoundSVG } from '../../../assets/images/no-result-found.svg';
import dayjs from 'dayjs';
import { iNote } from '../../../types/store/ticket';
import { Send } from '@mui/icons-material';

type Props = {};

const NotesWidget = (props: Props) => {
  const TextInput = {
    border: 0,
    width: '100%',
    padding: '1rem',
    ' &:hover, &:focus ': {
      outline: 'none'
    }
  };
  const { ticketID } = useParams();

  const handleAddNewNote = async () => {
    const data: iNote = {
      text: note,
      ticket: ticketID!
    };
    createNotesHandler(data);
  };

  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchNotes = async () => {
      await getAllNotesHandler(ticketID as string);
      setLoading(false);
    };
    fetchNotes();
  }, [ticketID]);

  const { notes } = useTicketStore();

  return (
    <Box
      bgcolor="white"
      p={1}
      sx={{
        overflowY: 'scroll',
        '&::-webkit-scrollbar ': {
          display: 'none'
        }
      }}
    >
      {loading ? (
        <>Loading... </>
      ) : notes.length > 0 ? (
        <Box height="90%">
          {notes.map((note: iNote, index) => {
            return (
              <Box key={note._id}>
                <Stack
                  my={1}
                  borderRadius={1}
                  bgcolor="#F1F5F7"
                  p={1}
                  direction="column"
                  spacing={1}
                >
                  <Typography>{note.text}</Typography>
                  <Chip
                    sx={{ width: '25%' }}
                    size="small"
                    label={dayjs(note.createdAt).format('DD MMM YYYY hh:mm A')}
                  />
                </Stack>
              </Box>
            );
          })}
        </Box>
      ) : (
        <Stack
          height="100%"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <NoResultFoundSVG />
          <Typography color="gray" variant="caption" mt={1}>
            No notes available.
          </Typography>
        </Stack>
      )}

      <Box borderTop={2.5} borderColor="#317AE2" bgcolor="white" height="10%">
        <Stack p={1} direction="row" spacing={1} alignItems="center">
          <input
            onChange={(e) => setNote(e.target.value)}
            placeholder="Enter New Note"
            style={TextInput}
          />
          <Box
            sx={{ cursor: 'pointer' }}
            display="flex"
            onClick={handleAddNewNote}
          >
            <Typography color="gray">Add Note</Typography>
            <Send htmlColor="gray" />
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};
export default NotesWidget;
