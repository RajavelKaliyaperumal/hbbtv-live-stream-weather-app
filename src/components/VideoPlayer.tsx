// VideoPlayer.tsx
import React, { useEffect, useRef } from 'react';
import dashjs from 'dashjs';
import VideoPlayerProps from '../types/VideoPlayer';
import '../styles/VideoPlayer.css'

const VideoPlayer: React.FC<VideoPlayerProps> = ({ mpdUrl, drmLicenseUrl }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const playerRef = useRef<any>(null);

  useEffect(() => {
    if (videoRef.current) {
      const player = dashjs.MediaPlayer().create();
      playerRef.current = player;

      // Set the MPD URL (manifest file) for the player
      player.initialize(videoRef.current, mpdUrl, true);

      if(drmLicenseUrl){
        // Set up PlayReady DRM
        const protectionData = {
          "com.microsoft.playready": {
          serverURL: drmLicenseUrl, // License URL for PlayReady
          },
        };
        // Set protection system to 'playready' for PlayReady encryption
        //player.setProtectionSystem('playready');
        player.setProtectionData(protectionData);
      }else{
        // Handle PlayReady DRM
        if (navigator.requestMediaKeySystemAccess) {
          navigator
            .requestMediaKeySystemAccess("com.microsoft.playready", [
              {
                initDataTypes: ["cenc"],
                videoCapabilities: [{ contentType: "video/mp4; codecs=\"avc1.42E01E\"" }],
              },
            ])
            .then((keySystemAccess) => keySystemAccess.createMediaKeys())
            //.then((mediaKeys) => video.setMediaKeys(mediaKeys))
            .catch((error) => console.error("Failed to set DRM:", error));
        } else {
          console.error("HbbTV 2.0.1 DRM support is missing.");
        }
      }

      // Attach the player to the video element
      player.attachView(videoRef.current);

      // Handle errors
      player.on(dashjs.MediaPlayer.events.ERROR, (e: any) => {
        console.error("Error: ", e);
      });

      return () => {
        player.reset();
      };
    }
  }, [mpdUrl,drmLicenseUrl]);

  return (
    <div className='hbbtv_video_player'>
      <video  ref={videoRef} width="100%" height="100%" >
      </video>
    </div>
  );
};

export default VideoPlayer;
