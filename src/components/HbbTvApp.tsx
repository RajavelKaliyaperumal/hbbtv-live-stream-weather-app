import React, {useState} from 'react';
import SafeArea from './SafeArea';
import VideoPlayer from './VideoPlayer';
import Weather from './Weather';
import MenuList from './Menu';
import PlayerProgress from './PlayerProgress';
import PlayerMenuList from './PlayerMenu';
import { useKeyHandler } from '../hooks/userKeyHandler';
import useHbbTV from '../hooks/useHbbTv';
import AppConfig from '../config/Config';

function HbbTvApp() {
  const [isMenuActive, setMenuActive] = useState(false);
  const [isPlayerMenuActive, setPlayerMenuActive] = useState(false);
  const [isWeatherActive, setWeatherActive] = useState(false);
  const [isPlayerProgressActive, setPlayerProgressActive] = useState(false);
  const { isHbbTV, isAppRunning } = useHbbTV();
  console.log("isHbbTV", isHbbTV);
  console.log("isAppRunning", isAppRunning);

  const [city, setCity] = useState<string>('London');
  const [resolution, setResolution] = useState<string>('480p');

  const onWeatherSelect = (selectedItem:string):void=>{
    setMenuActive(true);
  }
 const onWeatherClose = ():void=>{
  setWeatherActive(false);
  setPlayerProgressActive(true);
 }

  const onMenuItemSelect = (selectedItem:string):void=>{
    setMenuActive(false);
    setPlayerProgressActive(false);
    setWeatherActive(true);
    setCity(selectedItem);

  }
  const onPlayerMenuItemSelect = (selectedItem:string):void=>{
    setResolution(selectedItem);
    setPlayerMenuActive(false);
    setPlayerProgressActive(true);
  }

  const onPlayerMenuClose= ():void=>{
    setPlayerMenuActive(false);
    setPlayerProgressActive(true);
  }

  useKeyHandler({
    onEnter: () => {
      if(isPlayerProgressActive){
        setPlayerMenuActive(true);
      }else if(!isWeatherActive){
        setPlayerProgressActive(true);
      }
    },
    onArrowUp: () => {
      if(!isPlayerMenuActive){
        setWeatherActive(true);
        setPlayerProgressActive(false);
      }
    },
    onArrowLeft:()=>{
      setMenuActive(false);
    },
    onArrowRight:()=>{
      setMenuActive(false);
    }
  });

  let {mpdUrl, drmLicenseUrl} = AppConfig.VideoSources[resolution] || {};

  return (
    <div className="App">
     <SafeArea>
     { !isMenuActive && <Weather active={isWeatherActive}  city={city} onSelect={onWeatherSelect} onClose={onWeatherClose}/> }
     { isMenuActive && <MenuList selectedItem={city} onSelect={onMenuItemSelect}  items={AppConfig.Cities}  onClose={()=>{}}/> }
     { isPlayerProgressActive && <PlayerProgress resolution={resolution} active={!isPlayerMenuActive && !isWeatherActive}/> }
     { isPlayerMenuActive && <PlayerMenuList  onClose={onPlayerMenuClose} selectedItem={resolution} onSelect={onPlayerMenuItemSelect}  items={AppConfig.ResolutionQuality}/> }
     { false && <VideoPlayer mpdUrl={mpdUrl} drmLicenseUrl={drmLicenseUrl} /> }
     </SafeArea>
    </div>
  );
}

export default HbbTvApp;