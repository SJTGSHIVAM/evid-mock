import 'index.css';

import { UserProvider } from 'hooks/context/user/userContext';
import { VideoProvider } from 'hooks/context/videoContext';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import { makeServer } from './server';

makeServer();

const container = document.getElementById("app") as HTMLElement;
const root = createRoot(container);
root.render(
  <BrowserRouter>
    <VideoProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </VideoProvider>
  </BrowserRouter>
);
