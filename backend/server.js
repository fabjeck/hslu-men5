import http from 'http';
import app from './app';

const port = process.env.API_PORT;

const server = http.createServer(app);

server.listen(port);
