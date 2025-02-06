import React, {useState, useCallback, useReducer, useEffect} from 'react';
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
import { reducer, initialState, State, Action, ActionTypes } from "../components/reducer";
import RCKeySet from '../rcinteraction/RCKeySet';

const exitBrowser =()=>{
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
  const [state, dispatch] = useReducer<React.Reducer<State, Action>>(reducer, initialState);
  const { isHbbTvSupported, showApp, exitApp, setKeyset } = useHbbTV();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [city, setCity] = useState<string>(AppConfig.WEATHER_DEFAULT_CITY);
  const [resolution, setResolution] = useState<string>(AppConfig.VIDEO_DEFAULT_QUALITY);
  const query = useQuery();
  useEffect(()=>{
    if(isHbbTvSupported){
      //Makes the application visible.
      showApp();
      // Enable remote keys and listen for back/exit key
      setKeyset(RCKeySet.getRelevantButtonsMask({navigation : true}));
    }else{
      console.log("isHbbTvSupported", isHbbTvSupported);
    }
  },[]);

  const onWeatherSelect = useCallback(():void=>{
      dispatch({type : ActionTypes.SHOW_WEATHERMENU});
    },[]);

  const onWeatherClose = useCallback(():void=>{
    dispatch({type : ActionTypes.HIDE_WEATHER});
    dispatch({type : ActionTypes.SHOW_PLAYERPROGRESS});
  },[]);

  const onWeatherMenuItemSelect = useCallback((selectedItem:string):void=>{
    dispatch({type : ActionTypes.HIDE_WEATHERMENU});
    dispatch({type : ActionTypes.HIDE_PLAYERPROGRESS});
    dispatch({type : ActionTypes.SHOW_WEATHER});
    setCity(selectedItem);
  },[]);

  const onPlayerMenuItemSelect = useCallback((selectedItem:string):void=>{
    setResolution(selectedItem);
    dispatch({type : ActionTypes.HIDE_PLAYERMENU});
    dispatch({type : ActionTypes.SHOW_PLAYERPROGRESS});
  },[]);

  const onPlayerMenuClose= useCallback(():void=>{
    dispatch({type : ActionTypes.HIDE_PLAYERMENU});
    dispatch({type : ActionTypes.SHOW_PLAYERPROGRESS});
  },[]);

  const onPlaybackError = useCallback((errorMessage: string):void=>{
    setErrorMessage(errorMessage);
  },[]);

  useKeyHandler({
    componentName: "HbbTvApp",
    onEnter: () => {
      setErrorMessage("");
      if(state.displayPlayerProgress){
        dispatch({ type: ActionTypes.SHOW_PLAYERMENU});
      }else if(!state.displayWeather){
        dispatch({type : ActionTypes.SHOW_PLAYERPROGRESS});
      }
    },
    onArrowUp: () => {
      setErrorMessage("");
      if(!state.displayPlayerMenu){
        dispatch({type: ActionTypes.SHOW_WEATHER});
        dispatch({type : ActionTypes.HIDE_PLAYERPROGRESS});
      }
    },
    onArrowLeft:()=>{
      setErrorMessage("");
      dispatch({type : ActionTypes.HIDE_PLAYERMENU});
    },
    onArrowRight:()=>{
      setErrorMessage("");
      dispatch({type : ActionTypes.HIDE_PLAYERMENU});
    },
    onBack:()=>{
      console.log("HbbTvApp Exit");
      if(isHbbTvSupported){
        exitApp();
      }else{
        exitBrowser();
      }
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
     { !state.displayWeatherMenu && <Weather active={state.displayWeather}  city={city} onSelect={onWeatherSelect} onClose={onWeatherClose}/> }
     { state.displayWeatherMenu && <MenuList selectedItem={city} onSelect={onWeatherMenuItemSelect}  items={AppConfig.Cities}  onClose={()=>{}}/> }
     { state.displayPlayerProgress && <PlayerProgress resolution={resolution} active={!state.displayPlayerMenu && !state.displayWeather}/> }
     { state.displayPlayerMenu && <PlayerMenuList  onClose={onPlayerMenuClose} selectedItem={resolution} onSelect={onPlayerMenuItemSelect}  items={AppConfig.ResolutionQuality}/> }
     <VideoPlayer  mpdUrl={mpdUrl} drmLicenseUrl={drmLicenseUrl} displayProgress={state.displayPlayerProgress} onError={onPlaybackError} />
     </ErrorBoundary>
     </SafeArea>
  );
}

export default HbbTvApp;