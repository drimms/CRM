import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Organizations from './pages/Organizations';
import Employees from './pages/Employees';
import { OrganizationProvider } from './context/OrganizationContext';
import Container from '@mui/material/Container';


function App() {
  return (
    <OrganizationProvider>
      <Router>
        <Container>
          <Routes>
            <Route path="/" element={<Organizations />} />
            <Route path="/employees/:orgId" element={<Employees />} />
          </Routes>
        </Container>
      </Router>
    </OrganizationProvider>
  );
}

export default App;
