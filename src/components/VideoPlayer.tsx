// VideoPlayer.tsx
import React, { useEffect, useRef, useState } from "react";
import dashjs from "dashjs";
import VideoPlayerProps from "../types/VideoPlayer";
import { useKeyHandler } from '../hooks/userKeyHandler';
import "../styles/VideoPlayer.css";
import Spinner from "./Spinner";

const VideoPlayer: React.FC<VideoPlayerProps> = ({ mpdUrl, drmLicenseUrl, displayProgress }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const playerRef = useRef<dashjs.MediaPlayerClass | null>(null);
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  useKeyHandler({
        onEnter: () => {
          if(videoRef.current){
            videoRef.current.play();
          }
        },
  });
  useEffect(() => {
    if (videoRef.current) {

      navigator.requestMediaKeySystemAccess("com.microsoft.playready", [{
          initDataTypes: ["cenc"],
          videoCapabilities: [{ contentType: "video/mp4; codecs=\"avc1.42E01E\"" }]
      }]).then(() => {
          console.log("PlayReady is supported.");
      }).catch(error => {
          console.error("PlayReady is not supported:", error);
      });

      if (playerRef.current) {
        playerRef.current.reset();
        setProgress(0);
      }

      const player = dashjs.MediaPlayer().create();

      playerRef.current = player;

      // Set the MPD URL (manifest file) for the player
      player.initialize(videoRef.current, mpdUrl, true);

      const video = videoRef.current;

      // Enable automatic DRM handling from MPD file
      let protectionData = { "com.microsoft.playready": {}};

      if (drmLicenseUrl) {
        // Set up PlayReady DRM
        protectionData = {
          "com.microsoft.playready": {
            serverURL: drmLicenseUrl, // License URL for PlayReady
          },
        };
      }

      if (!video.mediaKeys) {
        player.setProtectionData(protectionData);
        // Attach the player to the video element
        player.attachView(videoRef.current);

      } else {
        console.log("MediaKeys already set, skipping DRM setup.");
      }

      // Ensure MediaKeys are set only once
      player.on(dashjs.MediaPlayer.events.KEY_SYSTEM_SELECTED, () => {
        console.log("DRM system selected.");
      });

      player.on(dashjs.MediaPlayer.events.KEY_SESSION_CREATED, () => {
        console.log("DRM session created.");
      });

      player.on(dashjs.MediaPlayer.events.ERROR, (e) => {
        console.error("DASH.js error:", e);
      });

      // Handle errors
      player.on(dashjs.MediaPlayer.events.ERROR, (e: any) => {
        console.error("Error: ", e);
      });

      //Auto Play
      const handlePlay = async () => {
        try {
          await video.play();
          console.log("Video started playing.");
        } catch (err) {
          console.warn("Autoplay blocked. Waiting for user interaction.");
        }
      };

      // Autoplay attempt
      handlePlay();

      // Event Handlers
      const eventHandlers = {
        play: () => {
          console.log("Video started playing.")
          setIsLoading(false);
        },
        pause: () => {
          console.log("Video paused.")
        },
        ended: () => console.log("Video ended."),
        timeupdate: () => setProgress((video.currentTime / video.duration) * 100),
        seeking: () => {
          console.log("Video seeking...");
          setIsLoading(true);
        },
        seeked: () => {
          console.log("Video seeked.");
          setIsLoading(false);
        },
        waiting: () => {
          console.log("Video buffering...");
          setIsLoading(true);
        },
        loadedmetadata: () => console.log("Metadata loaded."),
        canplay: () =>{
          console.log("Video can play.");
          setIsLoading(false);
        } ,
        canplaythrough: () => {
          console.log("Video can play through.");
          setIsLoading(false);
        },
      };

      Object.entries(eventHandlers).forEach(([event, handler]) => {
        video.addEventListener(event, handler);
      });

      return () => {
        if (playerRef.current) {
          playerRef.current.reset();
          setProgress(0);
        }
        Object.entries(eventHandlers).forEach(([event, handler]) => {
          video.removeEventListener(event, handler);
        });
      };
    }
  }, [mpdUrl, drmLicenseUrl]);

  return (
    <div className="hbbtv_video_player">
      { isLoading && <div className="hbbtv_video_loading"> <Spinner/></div>}
      <video ref={videoRef} style={{ width: "100%" }}></video>
      { displayProgress && <div className="hbbtv_player_wrapper">
        <div className="hbbtv_player_info">
          <div style={{ width: `${progress}%`, background: "#007bff", height: "10px" }}></div>
        </div>
      </div>}
    </div>
  );
};

export default VideoPlayer;
