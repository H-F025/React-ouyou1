import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import './index.css';
import { UserList } from './Components/UserList.tsx';
import UserDetail from './Components/UserDetail.tsx';

function Redirect() {
  const navigate = useNavigate();

  useEffect(() => {
    const navEntries = performance.getEntriesByType('navigation');
    const isReload = navEntries.some((entry) => 'type' in entry && entry.type === 'reload');

    if (isReload) {
      navigate('/', { replace: true });
    }
  }, []);

  return null;
}

function App() {
  return (
    <BrowserRouter>
      <Redirect />
      <div className="app-container">
        <Routes>
          <Route path="/" element={<UserList />} />
          <Route path="/users/:id" element={<UserDetail />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
