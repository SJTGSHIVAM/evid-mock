import React from 'react';

import {
  AiOutlineHistory,
  AiTwotoneFire,
} from 'react-icons/ai';
import { CgPlayList } from 'react-icons/cg';
import { FcLike } from 'react-icons/fc';
import { IoHome } from 'react-icons/io5';
import { MdOutlineWatchLater } from 'react-icons/md';

const Sidebar = () => {
  return (
    <div className="bg-gacol  sticky top-0 h-full  max-h-screen w-max  shadow-lg">
      <div className="sticky top-0 overflow-scroll">
        <SidebarIcon text="Home" icon={<IoHome />} />
        <SidebarIcon text="Treanding" icon={<AiTwotoneFire />} />
        <SidebarIcon text="History" icon={<AiOutlineHistory />} />
        <SidebarIcon text="Playlist" icon={<CgPlayList />} />
        <SidebarIcon text="Watch Later" icon={<MdOutlineWatchLater />} />
        <SidebarIcon text="Liked Videos" icon={<FcLike />} />
        <SidebarIcon text="Watch History" icon={<AiOutlineHistory />} />
      </div>
    </div>
  );
};

const SidebarIcon = ({
  icon,
  text = "tooltip 💡",
}: {
  icon: React.ReactChild;
  text?: string;
}) => (
  <div className="sidebar-icon group m-2">
    <span className="text-pcol text-xl">{icon}</span>
    <span className="sidebar-tooltip bg-lcol hidden border border-dcol m-2 p-1 group-hover:block group-hover:fixed">
      {text}
    </span>
  </div>
);

export { Sidebar };
