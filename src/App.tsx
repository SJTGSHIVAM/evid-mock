import {
  Footer,
  Navbar,
  Sidebar,
} from 'components';
// @ts-ignore
import Mockman from 'mockman-js';
import { Home } from 'pages';
import {
  Route,
  Routes,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

export default function App() {
  return (
    <>
      <header className="">
        <Navbar />{" "}
      </header>
      <main className="">
        <ToastContainer
          position="top-left"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        <Sidebar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/q" element={<Mockman />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
