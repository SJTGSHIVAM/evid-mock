// @ts-ignore
import Mockman from 'mockman-js';
import {
  Route,
  Routes,
} from 'react-router-dom';

export default function App() {
  return (
    <Routes>
      <Route path="/q" element={<Mockman />} />
    </Routes>
  );
}
