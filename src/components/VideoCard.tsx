import { Video } from 'interfaces';
import { FcLikePlaceholder } from 'react-icons/fc';
import { IoIosEye } from 'react-icons/io';
import { Link } from 'react-router-dom';

export const VideoCard = ({ video }: { video: Video }) => {
  const { id, img, title, avatar, creator, views, likes } = video;
  return (
    <div className="border-2 border-gacol p-1 xs:p-2 m-2 xs:m-4 w-max rounded-md">
      <Link to={`/video/${id}`}>
        <div className="w-44 h-44 flex flex-col justify-between xs:h-52 xs:w-56 md:h-56 md:w-80 ">
          <img
            src={img}
            alt="video image"
            className=" h-20 xs:h-28 md:h-36 w-full "
          />
          <div className="flex flex-col m-1">
            <p className=" text-sm self-start">
              {title.length > 30 ? `${title.slice(0, 30)}...` : title}
            </p>
            <div className="flex gap-2 md:gap-3 self-end">
              <span className="flex flex-row items-center gap-0.5 text-sm ml-auto">
                <IoIosEye />
                {views}
              </span>
              <span className="flex flex-row items-center gap-0.5 text-sm">
                <FcLikePlaceholder />
                {likes}
              </span>
            </div>
            <span className="flex flex-row items-center gap-1 ">
              <img src={avatar} alt="" className="h-5 xs:h-6 rounded-2xl" />
              <p className="text-xs">
                {creator.length > 20 ? `${creator.slice(0, 20)}...` : creator}
              </p>
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};
