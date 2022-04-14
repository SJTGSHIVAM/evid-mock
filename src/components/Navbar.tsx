import {
  toastError,
  toastSuccess,
} from 'utils';

export const Navbar = () => (
  <>
    <button
      onClick={() => {
        document.body.classList.add("theme_light");
      }}
    >
      light
    </button>
    <button
      onClick={() => {
        document.body.classList.remove("theme_light");
      }}
    >
      dark
    </button>
    <button
      onClick={() => {
        toastError();
        toastSuccess();
      }}
    >
      toast
    </button>
  </>
);
