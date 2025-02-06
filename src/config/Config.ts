
//- SD Quality: https://demo-dashenc-live.zahs.tv/sd/playready.mpd
//- HD Quality: https://demo-dashenc-live.zahs.tv/hd/playready.mpd
//- Full HD Quality: https://demo-dashenc-live.zahs.tv/fullhd/playready.mpd

//For City selection Menu
const Cities: string[] = ["London", "Paris", "Berlin", "Rome", "Madrid"];

const OPENWEATHERMAP_API_KEY = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;

const WEATHER_API_RESPONSE_CACHE_DURATION = 10 * 60 * 1000; // 10 minutes in milliseconds

const WEATHER_API_ENDPOINT = `https://api.openweathermap.org/data/2.5/weather?q=<city>&appid=${OPENWEATHERMAP_API_KEY}&units=metric`;

const WEATHER_ICON_ENDPOINT = `https://openweathermap.org/img/wn/<icon>@4x.png`;

const WEATHER_API_RETRY_COUNT = 5;

const WEATHER_DEFAULT_CITY = "London";

const VIDEO_DEFAULT_QUALITY = "480p";

//For UI Menu
const ResolutionsMap: Record<string, string> = {
  "480p": "SD", //(480p)
  "720p": "HD", //(720p)
  "1080p": "Full HD",//(1080p)
};

const ResolutionQuality: string[] = Object.keys(ResolutionsMap);

interface VideoRecord {
  mpdUrl : string 
  drmLicenseUrl : string 
}

const VideoSources: Record<string, VideoRecord> = {
    "480p": {
      mpdUrl : "https://demo-dashenc-live.zahs.tv/sd/playready.mpd",
      drmLicenseUrl: "",
    },
    "720p": {
      mpdUrl : "https://demo-dashenc-live.zahs.tv/hd/playready.mpd",
      drmLicenseUrl: "",
    },
    "1080p": {
      mpdUrl : "https://demo-dashenc-live.zahs.tv/fullhd/playready.mpd",
      drmLicenseUrl: "",
    },
  };


  const VideoSourcesFromHbbTv: Record<string, VideoRecord> = {
    
    "480p": {
      //"2.1 AVC 1080p",
      // DASH PlayReady 1
      mpdUrl : "https://refapp.hbbtv.org/videos/00_llama_h264_v9/cenc/manifest_prcenc_1080p.mpd",
      drmLicenseUrl: "https://test.playready.microsoft.com/service/rightsmanager.asmx?cfg=(kid:header,sl:2000,persist:false,contentkey:EjQSNBI0EjQSNBI0EjQSNg==)",
    },
    "720p": {
      //"2.1.1 AVC 1080p, LaUrl in mpd"
      // DASH PlayReady 1
      mpdUrl : "https://refapp.hbbtv.org/videos/00_llama_h264_v9/cenc/manifest_prcenc_1080p_1a_laurl.mpd",
      drmLicenseUrl: "",
    },
    "1080p": {
      //"2.11 AVC 1080p SL3000",
      mpdUrl : "https://refapp.hbbtv.org/videos/spring_h264_v9/cenc/manifest_prcenc_1080p.mpd",
      drmLicenseUrl: "https://test.playready.microsoft.com/service/rightsmanager.asmx?cfg=(kid:43215678-1234-1234-1234-123412341237,sl:3000,persist:false,contentkey:EjQSNBI0EjQSNBI0EjQSNw==),(kid:43215678-1234-1234-1234-123412341236,sl:2000,persist:false,contentkey:EjQSNBI0EjQSNBI0EjQSNg==)",
    },
  };



const AppConfig = {
    Cities,
    ResolutionQuality,
    VideoSources,
    VideoSourcesFromHbbTv,
    ResolutionsMap,
    WEATHER_API_ENDPOINT,
    WEATHER_API_RESPONSE_CACHE_DURATION,
    WEATHER_API_RETRY_COUNT,
    WEATHER_ICON_ENDPOINT,
    WEATHER_DEFAULT_CITY,
    VIDEO_DEFAULT_QUALITY
};

export default AppConfig;