import { ArtProvider } from './context/ArtContext.jsx';
import MainLayout from './layout/MainLayout';
import Home from './pages/Home';
import './index.css';

export default function App() {
  return (
    <ArtProvider>
      <MainLayout>
        <Home />
      </MainLayout>
    </ArtProvider>
  );
}
