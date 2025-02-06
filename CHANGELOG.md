# Changelog
v1.0.5
- Prevents Unnecessary Re-registration of Keyhandler Listeners
- Simplified the component state by using reducer

v1.0.4 (2025-02-01)
- Optimized the React Compontents
- Playback Error Handling
- Query param support to load the hbbtv reference content

v1.0.3 (2025-01-31)
- Exception handling

v1.0.2 (2025-01-31)
- Prevent default browser behavior to keep control in the HbbTV app
- Proper keyset handling with the HbbTV keyset API
- BackKey handing to exit app 
- Added ErrorModel to display playback error

v1.0.1 (2025-01-31)
- Integrated the Dash js to playback the DRM content
- Implemented HTML5 Videoplayer with Dash
- Added Loading Spinner and Video Progress Bar
- Added ErrorBoundary to catch runtime exception
- UI Improvement of Player Menu
- Fixed Weather API Retry Issue

v1.0.0 (2025-01-30)
- Initial Working Version
- Added createApplicationManagerObject
- Implemented hooks for Weather, KeyHandler and HbbTv Object
- Designed components for Weather, City Selection and Player
- Remote-control navigable menu is implemented
- Integrated the OpenWeatherMap API 
- Weather data is fetched and displayed.
- Weather API responses are cached for 10 minutes to reduce network requests. 
- Implemented a retry strategy with Fibonacci backoff 

