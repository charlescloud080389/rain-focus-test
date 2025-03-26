import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EventsTablePage from './pages/EventsTablePage';
import EventFormPage from './pages/EventFormPage';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route index element={<EventsTablePage />} />
          <Route path="new-event" element={<EventFormPage />} />
          <Route path="update-event/:id" element={<EventFormPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;