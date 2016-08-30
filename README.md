# rmp-playlist

rmp-playlist is an open-source implementation of playlist layout for [Radiant Media Player](https://www.radiantmediaplayer.com). 

## Features
- Display multiple videos with Radiant Media Player advanced playback features (HTML5 & Flash)
- Mobile-ready and responsive playlist layout
- Customizable with CSS and JavaScript
- Video ads support

## Usage
Download package in the release tab. See index.html for a working example
Include playlist CSS file in your `<head>`:
```html
<link rel="stylesheet" type="text/css" href="css/rmp-playlist.min.css">
```
Include Radiant Media Player latest release:
```html
<script src="//cdn.radiantmediatechs.com/rmp/v3/latest/js/rmp.min.js"></script>
```
Include playlist JavaScript file in your:
```html
<script src="js/rmp-playlist.min.js"></script>
```
Add HTML elements to hold the player and playlist layout:
```html
<!-- include a wrapper div for the playlist with rmp-pl as a class -->
<div class="rmp-pl">
  <!-- set player with id -->
  <div id="rmpPlayer"></div>
</div>
```
Set our playlist settings, items. Once done init it.
```html
<script>
    // We set our playlist settings and init it
    // These settings will be applied each time the player is updated.
    var playerSettings = {
      // a license key is only required if using Radiant Media Player paid features
      licenseKey: 'your-license-key',
      delayToFade: 3000,
      width: 800,
      height: 450,
      skin: 's1',
      ads: true,
      nav: true,
      sharing: true
    };
    // Define an array of video to be included in the playlist
    var playlistItems = [];
    // Each item of the array is an object
    playlistItems[0] = {
      poster: 'https://www.radiantmediaplayer.com/images/bbb-poster.jpg',
      bitrates: {
        hls: 'https://streamingrmp-1479.kxcdn.com/vod/smil:bbb.smil/playlist.m3u8'
      },
      adTagUrl: 'https://pubads.g.doubleclick.net/gampad/ads?sz=640x480&iu=/124319096/external/single_ad_samples&ciu_szs=300x250&impl=s&gdfp_req=1&env=vp&output=vast&unviewed_position_start=1&cust_params=deployment%3Ddevsite%26sample_ct%3Dlinear&correlator=',
      plThumbnailLoc: 'https://www.radiantmediaplayer.com/images/bbb-poster.jpg',
      plTilte: 'Item 1 title',
      plDesc: 'Description for playlist item 1'
    };
    playlistItems[1] = {
      poster: 'https://www.radiantmediaplayer.com/images/fashionshow.jpg',
      bitrates: {
        hls: 'https://streamingrmp-1479.kxcdn.com/vod/mp4:defile-on-2.mp4/playlist.m3u8'
      },
      adTagUrl: 'https://pubads.g.doubleclick.net/gampad/ads?sz=640x480&iu=/124319096/external/single_ad_samples&ciu_szs=300x250&impl=s&gdfp_req=1&env=vp&output=vast&unviewed_position_start=1&cust_params=deployment%3Ddevsite%26sample_ct%3Dskippablelinear&correlator=',
      plThumbnailLoc: 'https://www.radiantmediaplayer.com/images/fashionshow.jpg',
      plTilte: 'Item 2 title',
      plDesc: 'Description for playlist item 2'
    };
    playlistItems[2] = {
      poster: 'https://www.radiantmediaplayer.com/images/poster-rmp-showcase.jpg',
      bitrates: {
        hls: 'https://streamingrmp-1479.kxcdn.com/vod/mp4:ed-360p.mp4/playlist.m3u8'
      },
      adTagUrl: 'https://pubads.g.doubleclick.net/gampad/ads?sz=640x480&iu=/124319096/external/single_ad_samples&ciu_szs=300x250&impl=s&gdfp_req=1&env=vp&output=vast&unviewed_position_start=1&cust_params=deployment%3Ddevsite%26sample_ct%3Dredirectlinear&correlator=',
      plThumbnailLoc: 'https://www.radiantmediaplayer.com/images/poster-rmp-showcase.jpg',
      plTilte: 'Item 3 title',
      plDesc: 'Description for playlist item 3'
    };
    playlistItems[3] = {
      poster: 'https://www.radiantmediaplayer.com/images/bbb-poster.jpg',
      bitrates: {
        hls: 'https://streamingrmp-1479.kxcdn.com/vod/smil:bbb.smil/playlist.m3u8'
      },
      adTagUrl: 'https://pubads.g.doubleclick.net/gampad/ads?sz=480x70&iu=/124319096/external/single_ad_samples&ciu_szs=300x250&impl=s&gdfp_req=1&env=vp&output=vast&unviewed_position_start=1&cust_params=deployment%3Ddevsite%26sample_ct%3Dnonlinear&correlator=',
      plThumbnailLoc: 'https://www.radiantmediaplayer.com/images/bbb-poster.jpg',
      plTilte: 'Item 4 title',
      plDesc: 'Description for playlist item 4'
    };
    playlistItems[4] = {
      poster: 'https://www.radiantmediaplayer.com/images/poster-rmp-showcase.jpg',
      bitrates: {
        hls: 'https://streamingrmp-1479.kxcdn.com/vod/mp4:defile-on-2.mp4/playlist.m3u8'
      },
      adTagUrl: 'https://pubads.g.doubleclick.net/gampad/ads?sz=640x480&iu=/124319096/external/single_ad_samples&ciu_szs=300x250&impl=s&gdfp_req=1&env=vp&output=vast&unviewed_position_start=1&cust_params=deployment%3Ddevsite%26sample_ct%3Dlinear&correlator=',
      plThumbnailLoc: 'https://www.radiantmediaplayer.com/images/poster-rmp-showcase.jpg',
      plTilte: 'Item 5 title',
      plDesc: 'Description for playlist item 5',

    };
    playlistItems[5] = {
      poster: 'https://www.radiantmediaplayer.com/images/ed-poster.jpg',
      bitrates: {
        hls: 'https://streamingrmp-1479.kxcdn.com/vod/mp4:ed-360p.mp4/playlist.m3u8'
      },
      adTagUrl: 'https://pubads.g.doubleclick.net/gampad/ads?sz=640x480&iu=/124319096/external/single_ad_samples&ciu_szs=300x250&impl=s&gdfp_req=1&env=vp&output=vast&unviewed_position_start=1&cust_params=deployment%3Ddevsite%26sample_ct%3Dredirectlinear&correlator=',
      plThumbnailLoc: 'https://www.radiantmediaplayer.com/images/ed-poster.jpg',
      plTilte: 'Item 6 title',
      plDesc: 'Description for playlist item 6',
    };
    // Just to add some more items
    playlistItems[6] = playlistItems[0];
    playlistItems[7] = playlistItems[1];
    // push global player settings to playlistItems
    for (var i = 0, len = playlistItems.length; i < len; i++) {
      for (var prop in playerSettings) {
        playlistItems[i][prop] = playerSettings[prop];
      }
    }
    // Player id
    var element = 'rmpPlayer';
    // Create playlist instance and init
    var rmpPlaylist = new RadiantPlaylist(element, playlistItems);
    rmpPlaylist.init();
  </script>
```
## Example
An example of the implementation can be viewed here: [https://www.radiantmediaplayer.com/playlist.html](https://www.radiantmediaplayer.com/playlist.html)

## Issues
Issues should be submitted in this GitHub page. We will do our best to review them.

## License
rmp-playlist is released under MIT

Radiant Media Player has its own license which can be found here: [https://www.radiantmediaplayer.com/terms-of-service.html](https://www.radiantmediaplayer.com/terms-of-service.html)