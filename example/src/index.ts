import api from './api';

// Start the server
const server = api.start(() => {
  console.log('Server started at http://localhost:5000');
});

// Handle server errors
server.on('error', (error: string) => {
  console.error(error);
});
