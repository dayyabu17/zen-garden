import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { ArtProvider } from './context/ArtContext.jsx';
import MainLayout from './layout/MainLayout';
import PageTransition from './layout/PageTransition';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import './index.css';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageTransition>
              <Home />
            </PageTransition>
          }
        />
        <Route
          path="/gallery"
          element={
            <PageTransition>
              <Gallery />
            </PageTransition>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ArtProvider>
        <MainLayout>
          <AnimatedRoutes />
        </MainLayout>
      </ArtProvider>
    </BrowserRouter>
  );
}
