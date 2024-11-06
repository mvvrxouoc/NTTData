
import { createRoot } from 'react-dom/client'
import './assets/styles/index.css'
import { BrowserRouter } from 'react-router-dom'
import { App } from './components/App'
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = document.getElementById('root');
const GOOGLE_CLIENT_ID = "499673786460-0i0u0ke85r2ll6hf818mln3v402996h2.apps.googleusercontent.com";

if (root){
  createRoot(root).render(
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </GoogleOAuthProvider>,
  )
};
