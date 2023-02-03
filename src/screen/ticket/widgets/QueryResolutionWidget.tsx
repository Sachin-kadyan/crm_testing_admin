import { Box, Stack, Typography } from '@mui/material';

import React, { useEffect, useState } from 'react';
import useUserStore from '../../../store/userStore';
import { ReactComponent as NoResultFoundSVG } from '../../../assets/images/no-result-found.svg';
import {
  collection,
  onSnapshot,
  DocumentData,
  query,
  where,
  orderBy
} from 'firebase/firestore';
import { database } from '../../../utils/firebase';
import CreateQueryModal from './CreateQueryModal';
import QueryFetched from './QueryFetched';
import QueryRoom from './QueryRoom';
import { useParams } from 'react-router-dom';

type Props = {};

const QueryResolutionWidget = (props: Props) => {
  const [fetchedQueries, setFetchedQueries] = useState<DocumentData[]>();
  const [roomId, setRoomId] = useState(null);
  const [roomName, setRoomName] = useState('');

  const { ticketID } = useParams();

  const { user } = useUserStore();

  useEffect(() => {
    setRoomId(null);
    const collectionRef = collection(database, 'queries');
    const q = query(
      collectionRef,
      orderBy('createdAt', 'desc'),
      where('agentId', '==', user?._id),
      where('ticketId', '==', ticketID)
    );
    const unsub = onSnapshot(q, (snapshot) => {
      const queries: DocumentData[] = [];
      snapshot.forEach((doc) => {
        queries.push({ ...doc.data(), id: doc.id });
      });
      setFetchedQueries(queries);
    });
    return () => unsub();
  }, [ticketID]);

  return (
    <Box p={1} height="95%" bgcolor="white">
      {!roomId && (
        <Stack position="relative" height="100%">
          <Box height="90%">
            {fetchedQueries ? (
              fetchedQueries.length > 0 ? (
                fetchedQueries?.map((item: any, index: number) => {
                  return (
                    <QueryFetched
                      onClick={() => {
                        setRoomId(item.id);
                        setRoomName(item.subject);
                      }}
                      id={item.id}
                      subject={item.subject}
                      departmentId={item.departmentId}
                      createdAt={item.createdAt}
                    />
                  );
                })
              ) : (
                <Stack
                  height="90%"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <NoResultFoundSVG />
                  <Typography color="gray" variant="caption" mt={1}>
                    No Queries available.
                  </Typography>
                </Stack>
              )
            ) : (
              <Typography>Loading... </Typography>
            )}
          </Box>
          <CreateQueryModal />
        </Stack>
      )}
      {roomId && (
        <QueryRoom
          onRoomClose={() => {
            setRoomId(null);
            setRoomName('');
          }}
          roomId={roomId}
          roomName={roomName}
        />
      )}
    </Box>
  );
};

export default QueryResolutionWidget;
