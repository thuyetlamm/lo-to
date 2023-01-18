import './App.scss';
import { Route, Routes } from 'react-router-dom';
import NumberPageList from '*/components/NumberPageList/NumberPageList';

function App() {
  return (
    <div className="main">
    <Routes>
      <Route path="/" element={<NumberPageList />} />

    </Routes>
    </div>
  );
}

export default App;
