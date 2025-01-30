import React, {useState} from 'react';
import './App.css';
import HbbTvApp from './components/HbbTvApp';

function App() {
 
  return (
    <div className="App">
      <HbbTvApp/>
    </div>
  );
}

export default App;


//https://refapp.hbbtv.org/videos/00_llama_h264_v9/cenc/manifest_prcenc_1080p.mpd
//drm=playready https://test.playready.microsoft.com/service/rightsmanager.asmx?cfg=(kid:header,sl:2000,persist:false,contentkey:EjQSNBI0EjQSNBI0EjQSNg==)
// <VideoPlayer mpdUrl='https://demo-dashenc-live.zahs.tv/sd/playready.mpd' drmLicenseUrl=''/>
//-->
//     <OipfVideoPlayer/>
//<Weather/>