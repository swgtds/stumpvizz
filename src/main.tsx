import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './styles/base.css'
import './styles/animations.css'
import './styles/components.css'

createRoot(document.getElementById("root")!).render(<App />);