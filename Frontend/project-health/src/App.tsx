import '../src/App.tsx';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Home } from './pages/Home/Home'

function App() {
  return(
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/projects-dashboard" replace />}  />

          <Route path="*" element={<Navigate to="/projects-dashboard" replace />}  />

          <Route path="/projects-dashboard" element={<Home />}  />
        </Routes>    
    </BrowserRouter>
);

}

export default App;
