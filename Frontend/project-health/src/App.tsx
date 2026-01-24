import '../src/App.tsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home/Home'

function App() {
  return(
    <BrowserRouter>
        <Routes>
          <Route path="/projects-dashboard" element={<Home />} />
        </Routes>    
    </BrowserRouter>
);

}

export default App;
