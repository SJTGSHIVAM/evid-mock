import {
  useEffect,
  useState,
} from 'react';

import { VideoContainer } from 'components';
import { VideoCard } from 'components/VideoCard';
import { useLogin } from 'hooks/context/user/userContext';
import { useVideoList } from 'hooks/context/videoContext';
import { Playlist } from 'interfaces';
import { useParams } from 'react-router-dom';

export const PlaylistPage = () => {
  const { videoList } = useVideoList();
  const { playlistId } = useParams();
  const [currentPlaylist, setCurrentPlaylist] = useState<Playlist>();

  const { loginUser, userDispatch, isAuth } = useLogin();
  useEffect(() => {
    const foundPlaylist = loginUser.playlists.find(
      (playlist) => playlist.id === playlistId
    );
    if (foundPlaylist) {
      setCurrentPlaylist({ ...foundPlaylist });
    }
  }, [videoList]);

  return (
    <div>
      <VideoContainer>
        {playlistId && currentPlaylist
          ? currentPlaylist.videoList.length > 0
            ? currentPlaylist.videoList.map((video) => (
                <VideoCard video={video} key={video.id} />
              ))
            : "No Video in this Play list"
          : "This playlist do not exist"}
      </VideoContainer>
    </div>
  );
};
