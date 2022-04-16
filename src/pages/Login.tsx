import { useState } from 'react';

import { useLogin } from 'hooks/context/user/userContext';
import { userLoginModule } from 'hooks/context/user/userContextModule';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { BiLockOpen } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const [username, setUsername] = useState("sjtgshivam");
  const [password, setPassword] = useState("acheDin");
  const { userDispatch } = useLogin();
  const navigate = useNavigate();
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
            value={username}
            onChange={(e) => setUsername(e.currentTarget.value)}
          />
        </label>
        <label className="flex flex-col w-36 sm:w-44">
          <div className="flex flex-row items-center gap-1">
            <BiLockOpen />
            Password
          </div>

          <input
            type="password"
            className=" w-full bg-lcol border-2 border-gacol rounded-md outline-none px-1 "
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
        </label>
        <button
          className=" w-36 my-2 border-2 border-gacol rounded-2xl bg-pcol sm:w-44"
          onClick={async () => {
            const isLoginSuccess = await userLoginModule(userDispatch, {
              username,
              password,
            });
            if (isLoginSuccess) navigate("/");
            else {
              setPassword("");
              setUsername("");
            }
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
};
