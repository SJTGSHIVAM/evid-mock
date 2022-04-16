import 'react-toastify/dist/ReactToastify.css';

import {
  Footer,
  Navbar,
  Sidebar,
} from 'components';
import { LoggedOutRoute } from 'components/LoggedOutRoute';
import { ProtectedRoute } from 'components/ProtectedRoute';
// @ts-ignore
import Mockman from 'mockman-js';
import {
  History,
  Home,
  Liked,
  Login,
  Playlists,
  SingleVideo,
  Trending,
  WatchLater,
} from 'pages';
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
          <Route path="/video/:videoId" element={<SingleVideo />} />
          <Route path="user" element={<LoggedOutRoute />}>
            <Route path="login" element={<Login />} />
          </Route>
          <Route path="trending" element={<Trending />} />
          <Route path="user" element={<ProtectedRoute />}>
            <Route path="liked" element={<Liked />} />
            <Route path="history" element={<History />} />
            <Route path="watchlater" element={<WatchLater />} />
            <Route path="playlists" element={<Playlists />} />
          </Route>

          <Route path="/q" element={<Mockman />} />
        </Routes>
      </main>

      <Footer className="col-span-2" />
    </div>
  );
}
