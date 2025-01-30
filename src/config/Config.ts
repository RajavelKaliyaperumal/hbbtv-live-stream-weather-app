
//- SD Quality: https://demo-dashenc-live.zahs.tv/sd/playready.mpd
//- HD Quality: https://demo-dashenc-live.zahs.tv/hd/playready.mpd
//- Full HD Quality: https://demo-dashenc-live.zahs.tv/fullhd/playready.mpd

//For City selection Menu
const Cities: string[] = ["London", "Paris", "Berlin", "Rome", "Madrid"];

const OPENWEATHERMAP_API_KEY = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;

const WEATHER_API_RESPONSE_CACHE_DURATION = 10 * 60 * 1000; // 10 minutes in milliseconds

const WEATHER_API_ENDPOINT = `https://api.openweathermap.org/data/2.5/weather?q=<city>&appid=${OPENWEATHERMAP_API_KEY}&units=metric`

const WEATHER_API_RETRY_COUNT = 5;//

//For UI Menu
const ResolutionsMap: Record<string, string> = {
  "480p": "SD (480p)",
  "720p": "HD (720p)",
  "1080p": "Full HD (1080p)",
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

const AppConfig = {
    Cities,
    ResolutionQuality,
    VideoSources,
    ResolutionsMap,
    WEATHER_API_ENDPOINT,
    WEATHER_API_RESPONSE_CACHE_DURATION,
    WEATHER_API_RETRY_COUNT
};

export default AppConfig;