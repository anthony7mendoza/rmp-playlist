# rmp-playlist

rmp-playlist is an open-source implementation of playlist layout for [Radiant Media Player](https://www.radiantmediaplayer.com). 

## Features
- Display multiple videos with Radiant Media Player advanced playback features (HTML5 & Flash)
- Mobile-ready and responsive playlist layout
- Customizable with CSS and JavaScript
- Video ads support

## Usage
Download package in the release tab. See index.html for a working example with Radiant Media Player free features. 
A more advanced example with HLS and video ads (paid features) can be found at index-hls-ads.html.

Include playlist CSS file in your `<head>`:
```html
<link rel="stylesheet" type="text/css" href="css/rmp-playlist.min.css">
```
Include Radiant Media Player latest release:
```html
<script src="https://cdn.radiantmediatechs.com/rmp/v3/latest/js/rmp.min.js"></script>
```
Include playlist JavaScript file:
```html
<script src="js/rmp-playlist.min.js"></script>
```
Add HTML elements to hold the player and playlist layout to where you want it in your HTML page:
```html
<!-- include a wrapper div for the playlist with rmp-pl as a class -->
<div class="rmp-pl">
  <!-- set player with id -->
  <div id="rmpPlayer"></div>
</div>
```
Then we set our playlist settings and items. Once done init it.
```html
<script>
    // Then we set our playlist settings and items. Once done init it.
    // These settings will be applied each time the playlist is updated with a new item.
    var playerSettings = {
      delayToFade: 3000,
      width: 800,
      height: 450,
      skin: 's1',
      nav: true,
      sharing: true
    };
    // Define an array of video to be included in the playlist
    var playlistItems = [];
    // Each item of the array is an object with the following information
    // poster:String, bitrates:Object, adTagUrl:String (optional)
    // plThumbnailLoc:String (URL to thumbnail for each playlist item)
    // plTilte:String (title for each playlist item)
    // plDesc:String (description for each playlist item)
    playlistItems[0] = {
      poster: 'https://www.radiantmediaplayer.com/images/bbb-poster.jpg',
      bitrates: {
        mp4: [
          'https://www.radiantmediaplayer.com/media/bbb-360p.mp4',
          'https://www.radiantmediaplayer.com/media/bbb-540p.mp4'
        ]
      },
      plThumbnailLoc: 'https://www.radiantmediaplayer.com/images/bbb-poster.jpg',
      plTilte: 'Item 1 title',
      plDesc: 'Description for playlist item 1'
    };
    playlistItems[1] = {
      poster: 'https://www.radiantmediaplayer.com/images/fashionshow.jpg',
      bitrates: {
        mp4: [
          'https://www.radiantmediaplayer.com/media/defile-on-2.mp4'
        ]
      },
      plThumbnailLoc: 'https://www.radiantmediaplayer.com/images/fashionshow.jpg',
      plTilte: 'Item 2 title',
      plDesc: 'Description for playlist item 2'
    };
    playlistItems[2] = {
      poster: 'https://www.radiantmediaplayer.com/images/poster-rmp-showcase.jpg',
      bitrates: {
        mp4: [
          'https://www.radiantmediaplayer.com/media/ed-360p.mp4'
        ]
      },
      plThumbnailLoc: 'https://www.radiantmediaplayer.com/images/poster-rmp-showcase.jpg',
      plTilte: 'Item 3 title',
      plDesc: 'Description for playlist item 3'
    };
    playlistItems[3] = {
      poster: 'https://www.radiantmediaplayer.com/images/bbb-poster.jpg',
      bitrates: {
        mp4: [
          'https://www.radiantmediaplayer.com/media/bbb-360p.mp4'
        ]
      },
      plThumbnailLoc: 'https://www.radiantmediaplayer.com/images/bbb-poster.jpg',
      plTilte: 'Item 4 title',
      plDesc: 'Description for playlist item 4'
    };
    playlistItems[4] = {
      poster: 'https://www.radiantmediaplayer.com/images/poster-rmp-showcase.jpg',
      bitrates: {
        mp4: [
          'https://www.radiantmediaplayer.com/media/defile-on-2.mp4'
        ]
      },
      plThumbnailLoc: 'https://www.radiantmediaplayer.com/images/poster-rmp-showcase.jpg',
      plTilte: 'Item 5 title',
      plDesc: 'Description for playlist item 5',

    };
    playlistItems[5] = {
      poster: 'https://www.radiantmediaplayer.com/images/ed-poster.jpg',
      bitrates: {
        mp4: [
          'https://www.radiantmediaplayer.com/media/ed-360p.mp4'
        ]
      },
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
