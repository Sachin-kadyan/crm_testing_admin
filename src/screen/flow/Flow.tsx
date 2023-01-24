import { Add, ArrowRight, Cancel, Upload } from '@mui/icons-material';
import {
  Alert,
  Box,
  Button,
  IconButton,
  Modal,
  Stack,
  Typography
} from '@mui/material';
import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { createNodeReplyHandler } from '../../api/flow/flowHandler';
import { iNodeRepliesFlow } from '../../types/store/node';
import { CSVFileParser } from '../../utils/csvFileParser';
import TableRow from './widgets/NodeRepliesTable';

type Props = {};

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  borderRadius: '1rem',
  borderWidth: 0,
  p: 4
};

const Flow = (props: Props) => {
  const [invalidCount, setInvalidCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState({
    type: 'success',
    message: ''
  });
  const [filename, setFileName] = useState<File | undefined | null>();
  const [fileData, setFileData] = useState<iNodeRepliesFlow[]>([]);
  const [isGoToNodeConnector, setIsGoToNodeConnector] =
    useState<boolean>(false);

  const navigate = useNavigate();

  const handleopenModal = () => {
    setIsModalOpen(true);
  };

  const handleFileUpload = async () => {
    if (!filename) {
      setMessage('Please Select a File to upload');
    } else {
      setMessage('Please Wait Parsing CSV file');
      const data = await CSVFileParser(filename);
      setFileData(data);
      setIsModalOpen(false);
    }
  };

  const handleUploadFlowToServer = async () => {
    const shouldGoToConnector = await createNodeReplyHandler(fileData);
    setErrorMessage({
      ...errorMessage,
      message: 'Node Replies Added To Server Successfully '
    });
    setIsGoToNodeConnector(shouldGoToConnector);
  };

  return (
    <Box minHeight="90vh">
      <Outlet />
    </Box>
  );
};

export default Flow;
