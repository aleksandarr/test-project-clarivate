
import { ListStateProvider } from './state/ListStateProvider';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import ListPage from './pages/ListPage';


function App() {
  return (
    <Router>
      <ListStateProvider>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/list" element={<ListPage />} />
        </Routes>
      </ListStateProvider>
    </Router>
  );
}

export default App;
