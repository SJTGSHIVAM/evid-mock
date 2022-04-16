import React from 'react';

import {
  AiOutlineHistory,
  AiTwotoneFire,
} from 'react-icons/ai';
import { CgPlayList } from 'react-icons/cg';
import { FcLike } from 'react-icons/fc';
import { IoHome } from 'react-icons/io5';
import { MdOutlineWatchLater } from 'react-icons/md';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="bg-gacol  sticky top-0 h-full  max-h-screen w-max ">
      <div className="sticky top-0 overflow-auto">
        <SidebarIcon to="/" text="Home" icon={<IoHome />} />
        <SidebarIcon
          to="/treanding"
          text="Treanding"
          icon={<AiTwotoneFire />}
        />
        <SidebarIcon to="playlists" text="Playlists" icon={<CgPlayList />} />
        <SidebarIcon
          to="watchlater"
          text="Watch Later"
          icon={<MdOutlineWatchLater />}
        />
        <SidebarIcon to="liked" text="Liked Videos" icon={<FcLike />} />
        <SidebarIcon
          to="history"
          text="Watch History"
          icon={<AiOutlineHistory />}
        />
      </div>
    </div>
  );
};

const SidebarIcon = ({
  icon,
  to,
  text = "tooltip 💡",
}: {
  icon: React.ReactChild;
  to: string;
  text?: string;
}) => (
  <Link to={to}>
    <div className="sidebar-icon cursor-pointer group m-2">
      <span className="text-pcol text-xl">{icon}</span>
      <span className="sidebar-tooltip bg-lcol hidden border border-dcol m-2 p-1 group-hover:block group-hover:fixed">
        {text}
      </span>
    </div>
  </Link>
);

export { Sidebar };
