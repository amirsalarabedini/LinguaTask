import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Grid, Card, CardContent, CardActions, Button, Box } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import SummarizeIcon from '@mui/icons-material/Summarize';
import TranslateIcon from '@mui/icons-material/Translate';

const Dashboard = () => {
  const tasks = [
    {
      id: 1,
      title: 'Caption Generator',
      description: 'Generate creative captions for your social media posts',
      icon: <ChatIcon fontSize="large" color="primary" />,
      path: '/tasks/caption'
    },
    {
      id: 2,
      title: 'Text Summarizer',
      description: 'Create concise summaries of long texts',
      icon: <SummarizeIcon fontSize="large" color="primary" />,
      path: '/tasks/summary'
    },
    {
      id: 3,
      title: 'Translator',
      description: 'Translate text between different languages',
      icon: <TranslateIcon fontSize="large" color="primary" />,
      path: '/tasks/translation'
    }
  ];

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome to LinguaTask
        </Typography>
        <Typography variant="body1" paragraph>
          Select a language task below to get started:
        </Typography>
        
        <Grid container spacing={4} sx={{ mt: 2 }}>
          {tasks.map((task) => (
            <Grid item xs={12} sm={6} md={4} key={task.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                    {task.icon}
                  </Box>
                  <Typography gutterBottom variant="h5" component="h2" align="center">
                    {task.title}
                  </Typography>
                  <Typography align="center">
                    {task.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button 
                    fullWidth 
                    variant="contained" 
                    component={Link} 
                    to={task.path}
                  >
                    Start Task
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default Dashboard;