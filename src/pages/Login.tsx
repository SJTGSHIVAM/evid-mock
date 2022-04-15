import { AiOutlineUserAdd } from 'react-icons/ai';
import { BiLockOpen } from 'react-icons/bi';

export const Login = () => {
  return (
    <div className="grid place-content-center h-full">
      <div className="flex flex-col items-center justify-center gap-2 m-4 w-44 h-48 sm:w-60 sm:h-60 border-2 border-gacol rounded-xl">
        <label className="flex flex-col w-36 sm:w-44">
          <div className="flex flex-row items-center gap-1">
            <AiOutlineUserAdd />
            Username
          </div>
          <input
            type="text"
            className=" w-full bg-lcol border-2 border-gacol rounded-md outline-none px-1"
            placeholder="Username"
          />
        </label>
        <label className="flex flex-col w-36 sm:w-44">
          <div className="flex flex-row items-center gap-1">
            <BiLockOpen />
            Password
          </div>

          <input
            type="text"
            className=" w-full bg-lcol border-2 border-gacol rounded-md outline-none px-1 "
            placeholder="Password"
          />
        </label>
        <button className=" w-36 my-2 border-2 border-gacol rounded-2xl bg-pcol sm:w-44">
          Login
        </button>
      </div>
    </div>
  );
};
