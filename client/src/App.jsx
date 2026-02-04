import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ArtProvider } from './context/ArtContext.jsx';
import MainLayout from './layout/MainLayout';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import './index.css';

export default function App() {
  return (
    <BrowserRouter>
      <ArtProvider>
        <MainLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/gallery" element={<Gallery />} />
          </Routes>
        </MainLayout>
      </ArtProvider>
    </BrowserRouter>
  );
}
