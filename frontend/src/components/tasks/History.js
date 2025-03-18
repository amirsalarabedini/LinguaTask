 import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  CircularProgress,
  Alert,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { format } from 'date-fns';

const History = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get('/tasks/history');
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching task history:', error);
        setError(error.response?.data?.detail || 'Failed to load task history');
      } finally {
        setLoading(false);
      }
    };
    
    fetchHistory();
  }, []);

  const getTaskIcon = (taskType) => {
    switch(taskType) {
      case 'caption':
        return '💬';
      case 'summary':
        return '📝';
      case 'translation':
        return '🌐';
      default:
        return '📄';
    }
  };

  const getTaskTitle = (taskType) => {
    switch(taskType) {
      case 'caption':
        return 'Caption Generator';
      case 'summary':
        return 'Text Summarizer';
      case 'translation':
        return 'Translator';
      default:
        return 'Unknown Task';
    }
  };

  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), 'MMM d, yyyy h:mm a');
    } catch (error) {
      return dateString;
    }
  };

  const parseMetadata = (metadataString) => {
    try {
      return JSON.parse(metadataString || '{}');
    } catch (error) {
      return {};
    }
  };

  const renderMetadataDetails = (task) => {
    const metadata = parseMetadata(task.task_metadata);
    
    return (
      <Box sx={{ mt: 1 }}>
        {Object.entries(metadata).map(([key, value]) => (
          <Chip 
            key={key} 
            label={`${key}: ${value}`} 
            size="small" 
            variant="outlined" 
            sx={{ mr: 1, mb: 1 }} 
          />
        ))}
      </Box>
    );
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Task History
        </Typography>
        <Typography variant="body1" paragraph>
          View your previous language tasks and their results.
        </Typography>
        
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>
        ) : tasks.length === 0 ? (
          <Alert severity="info" sx={{ mt: 2 }}>You haven't completed any tasks yet.</Alert>
        ) : (
          <TableContainer component={Paper} sx={{ mt: 3 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Type</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Details</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tasks.map((task) => (
                  <TableRow key={task.id}>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="h6" sx={{ mr: 1 }}>
                          {getTaskIcon(task.task_type)}
                        </Typography>
                        <Typography variant="body2">
                          {getTaskTitle(task.task_type)}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{formatDate(task.created_at)}</TableCell>
                    <TableCell>
                      <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                          <Typography>
                            {task.input_text.length > 50 
                              ? `${task.input_text.substring(0, 50)}...` 
                              : task.input_text}
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography variant="subtitle2" gutterBottom>Input:</Typography>
                          <Paper variant="outlined" sx={{ p: 2, mb: 2, bgcolor: 'background.default' }}>
                            <Typography variant="body2">{task.input_text}</Typography>
                          </Paper>
                          
                          <Typography variant="subtitle2" gutterBottom>Output:</Typography>
                          <Paper variant="outlined" sx={{ p: 2, mb: 2, bgcolor: 'background.default' }}>
                            <Typography variant="body2">{task.output_text}</Typography>
                          </Paper>
                          
                          {task.task_metadata && (
                            <>
                              <Divider sx={{ my: 2 }} />
                              <Typography variant="subtitle2" gutterBottom>Metadata:</Typography>
                              {renderMetadataDetails(task)}
                            </>
                          )}
                        </AccordionDetails>
                      </Accordion>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </Container>
  );
};

export default History;