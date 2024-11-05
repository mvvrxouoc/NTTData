
import { createRoot } from 'react-dom/client'
import './assets/styles/index.css'
import { BrowserRouter } from 'react-router-dom'
import { App } from './components/App'
//import "@material/web/all.js"

const root = document.getElementById('root');

if (root){
  createRoot(root).render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  )
};
