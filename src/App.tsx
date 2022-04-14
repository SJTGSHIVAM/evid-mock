import 'react-toastify/dist/ReactToastify.css';

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
    <div className="text-dcol min-h-screen max-w-[100vw] grid grid-cols-[max-content_1fr] grid-rows-[max-content_1fr_max-content]">
      <header className="col-span-2">
        <Navbar />{" "}
      </header>
      <aside className="">
        <Sidebar />
      </aside>
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
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/q" element={<Mockman />} />
        </Routes>
      </main>

      <Footer className="col-span-2" />
    </div>
  );
}
