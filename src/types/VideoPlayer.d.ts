// Define types for the props
interface VideoPlayerProps {
  mpdUrl: string; // URL to the MPD file
  drmLicenseUrl: string,
  displayProgress : boolean,
  onError(errorMessage: string):void;
} 

export default VideoPlayerProps;