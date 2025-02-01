import React, {useState, useCallback} from 'react';
import SafeArea from './SafeArea';
import VideoPlayer from './VideoPlayer';
import Weather from './Weather';
import MenuList from './Menu';
import PlayerProgress from './PlayerProgress';
import PlayerMenuList from './PlayerMenu';
import { useKeyHandler } from '../hooks/userKeyHandler';
import useHbbTV from '../hooks/useHbbTv';
import AppConfig from '../config/Config';
import ErrorBoundary from './ErrorBoundary';
import ErrorModal from "./ErrorModal";
import useQuery from '../hooks/useQuery';

const exitApp =()=>{
  try {
      if (typeof window.close === "function") {
          window.close(); // Try closing the app
      } else {
          window.history.back(); // Navigate back in history
      }
  } catch (e) {
      console.log("Exit failed: ", e);
  }
}
function HbbTvApp() {
  const [isMenuActive, setMenuActive] = useState(false);
  const [isPlayerMenuActive, setPlayerMenuActive] = useState(false);
  const [isWeatherActive, setWeatherActive] = useState(false);
  const [isPlayerProgressActive, setPlayerProgressActive] = useState(false);
  const { isHbbTV, isAppRunning } = useHbbTV();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [city, setCity] = useState<string>('London');
  const [resolution, setResolution] = useState<string>('480p');
  const query = useQuery();

  console.log("isHbbTV", isHbbTV);
  console.log("isAppRunning", isAppRunning);

  const onWeatherSelect = useCallback(():void=>{
      setMenuActive(true);
    },[]);

  const onWeatherClose = useCallback(():void=>{
    setWeatherActive(false);
    setPlayerProgressActive(true);
  },[]);

  const onMenuItemSelect = useCallback((selectedItem:string):void=>{
    setMenuActive(false);
    setPlayerProgressActive(false);
    setWeatherActive(true);
    setCity(selectedItem);
  },[]);

  const onPlayerMenuItemSelect = useCallback((selectedItem:string):void=>{
    setResolution(selectedItem);
    setPlayerMenuActive(false);
    setPlayerProgressActive(true);
  },[]);

  const onPlayerMenuClose= useCallback(():void=>{
    setPlayerMenuActive(false);
    setPlayerProgressActive(true);
  },[]);

  const onPlaybackError = useCallback((errorMessage: string):void=>{
    setErrorMessage(errorMessage);
  },[]);

  useKeyHandler({
    onEnter: () => {
      setErrorMessage("");
      if(isPlayerProgressActive){
        setPlayerMenuActive(true);
      }else if(!isWeatherActive){
        setPlayerProgressActive(true);
      }
    },
    onArrowUp: () => {
      setErrorMessage("");
      if(!isPlayerMenuActive){
        setWeatherActive(true);
        setPlayerProgressActive(false);
      }
    },
    onArrowLeft:()=>{
      setErrorMessage("");
      setMenuActive(false);
    },
    onArrowRight:()=>{
      setErrorMessage("");
      setMenuActive(false);
    },
    onBack:()=>{
      console.log("HbbTvApp Exit");
      exitApp();
    }
  });

  const source = query.get('source');
  let videoSources = AppConfig.VideoSources;
  if(source && source === "hbbtv"){
    videoSources = AppConfig.VideoSourcesFromHbbTv;
  }
  let {mpdUrl, drmLicenseUrl} = videoSources[resolution] || {};
  console.log("HbbTvApp",mpdUrl, drmLicenseUrl);

  return (
     <SafeArea>
      <ErrorBoundary>
     { errorMessage && <ErrorModal message={errorMessage} />}
     { !isMenuActive && <Weather active={isWeatherActive}  city={city} onSelect={onWeatherSelect} onClose={onWeatherClose}/> }
     { isMenuActive && <MenuList selectedItem={city} onSelect={onMenuItemSelect}  items={AppConfig.Cities}  onClose={()=>{}}/> }
     { isPlayerProgressActive && <PlayerProgress resolution={resolution} active={!isPlayerMenuActive && !isWeatherActive}/> }
     { isPlayerMenuActive && <PlayerMenuList  onClose={onPlayerMenuClose} selectedItem={resolution} onSelect={onPlayerMenuItemSelect}  items={AppConfig.ResolutionQuality}/> }
     { true && <VideoPlayer  mpdUrl={mpdUrl} drmLicenseUrl={drmLicenseUrl} displayProgress={isPlayerProgressActive} onError={onPlaybackError} /> }
     </ErrorBoundary>
     </SafeArea>
  );
}

export default HbbTvApp;