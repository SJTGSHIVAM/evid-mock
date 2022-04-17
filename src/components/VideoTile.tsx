import React from 'react';

import { useLogin } from 'hooks/context/user/userContext';
import { Video } from 'interfaces';

export const VideoTile = ({
  video,
  children,
}: {
  video: Video;
  children?: React.ReactNode;
}) => {
  const { loginUser, userDispatch } = useLogin();

  return (
    <div
      className="h-12 xs:h-14 flex flex-row border-2 rounded-md w-48 xs:w-64"
      key={video.id}
    >
      <img src={video.img} alt="" className="h-full w-12 xs:w-14 " />
      <div className="flex flex-col justify-center p-1">
        <p>
          {video.title === video.title.toUpperCase()
            ? video.title.slice(0, 20)
            : video.title.slice(0, 15)}
          ..
        </p>
        <p className="text-sm hidden xs:inline">
          {" "}
          {video.creator.length > 20
            ? `${video.creator.slice(0, 20)}...`
            : video.creator}
        </p>
      </div>
      {children}
    </div>
  );
};
