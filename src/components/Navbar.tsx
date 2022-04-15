import {
  BsFillMoonStarsFill,
  BsSunFill,
} from 'react-icons/bs';
import { FcLikePlaceholder } from 'react-icons/fc';
import {
  toastError,
  toastSuccess,
} from 'utils';

export const Navbar = () => (
  <nav className="bg-gacol p-4 text-wcol">
    <button
      onClick={() => {
        document.body.classList.add("theme_light");
      }}
    >
      <BsSunFill />
    </button>
    <button
      onClick={() => {
        document.body.classList.remove("theme_light");
      }}
    >
      <FcLikePlaceholder />
    </button>
    <button
      onClick={() => {
        toastError();
        toastSuccess();
      }}
    >
      <BsFillMoonStarsFill />
    </button>
  </nav>
);
