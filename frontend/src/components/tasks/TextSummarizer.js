import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Alert,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';

const TextSummarizer = () => {
  const [inputText, setInputText] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [models, setModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState('gpt-4o-mini');
  const [selectedProvider, setSelectedProvider] = useState('openai_chat_completion');
  const [loadingModels, setLoadingModels] = useState(true);
  
  useEffect(() => {
    const fetchModels = async () => {
      try {
        const response = await axios.get('/models');
        const chatProviders = response.data.chatProviders || [];
        setModels(chatProviders);
      } catch (error) {
        console.error('Error fetching models:', error);
        setError('Failed to load available models');
      } finally {
        setLoadingModels(false);
      }
    };
    
    fetchModels();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setOutput('');
    
    if (!inputText) {
      setError('Please provide text to summarize');
      return;
    }
    
    if (!selectedModel || !selectedProvider) {
      setError('Please select a model');
      return;
    }
    
    setLoading(true);
    
    try {
      const response = await axios.post('/tasks/summary', {
        input_text: inputText,
        model_name: selectedModel,
        provider: selectedProvider
      });
      
      setOutput(response.data.output_text);
    } catch (error) {
      console.error('Error summarizing text:', error);
      setError(error.response?.data?.detail || 'Failed to summarize text. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Text Summarizer
        </Typography>
        <Typography variant="body1" paragraph>
          Create concise summaries of long texts. Paste your text below to get started.
        </Typography>
        
        <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              margin="normal"
              required
              fullWidth
              id="inputText"
              label="Text to Summarize"
              name="inputText"
              multiline
              rows={8}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            <FormControl fullWidth margin="normal" required>
              <InputLabel id="model-label">Language Model</InputLabel>
              <Select
                labelId="model-label"
                id="model"
                value={`${selectedProvider}|${selectedModel}`}
                label="Language Model"
                onChange={(e) => {
                  const [provider, model] = e.target.value.split('|');
                  setSelectedProvider(provider);
                  setSelectedModel(model);
                }}
                disabled={loadingModels}
              >
                {loadingModels ? (
                  <MenuItem value="loading">Loading models...</MenuItem>
                ) : (
                  models.map((model) => (
                    <MenuItem key={`${model.name}|${model.model}`} value={`${model.name}|${model.model}`}>
                      {model.model} ({model.name})
                    </MenuItem>
                  ))
                )}
              </Select>
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading || loadingModels}
            >
              {loading ? 'Summarizing...' : 'Summarize Text'}
            </Button>
            {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
          </Box>
        </Paper>
        
        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <CircularProgress />
          </Box>
        )}
        
        {output && (
          <Paper elevation={3} sx={{ p: 4 }}>
            <Typography variant="h6" gutterBottom>
              Summary:
            </Typography>
            <Box sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
              <Typography variant="body1">{output}</Typography>
            </Box>
          </Paper>
        )}
      </Box>
    </Container>
  );
};

export default TextSummarizer;