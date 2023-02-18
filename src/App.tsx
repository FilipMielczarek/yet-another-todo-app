import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Authentication, Homepage, NotFound } from 'pages';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Authentication />} />
        <Route path='home' element={<Homepage />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
