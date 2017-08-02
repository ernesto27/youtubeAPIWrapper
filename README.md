# youtubeAPIWrapper

A simple wrapper for the youtube api   https://developers.google.com/youtube/iframe_api_reference?hl=es-419

## DEMO
https://ernesto27.github.io/youtubeAPIWrapper/example.html


### Instalation
Include the js file

```html

<script src='src/youtubeAPI.js'></script>

```

### Usage
Initialize with an array of objects , using the same params as the youtube api

```javascript
  YoutubeAPI.create({
    items: [
      {
        elementId: 'player1',
        videoId: 'cNTaFArEObU',
        playerVars: { 'autoplay': 0, 'controls': 1, 'showinfo': 0, 'rel': 0 }
      }
    ]
  });
```

### Events

### onFirstTimePlayed
Fired once , when the video is played for the first time

### onPlaying
Fired when the video is playing

### onPaused
Fired when the video is on pause

### onEnded
Fired when the video is at the end

### onReady
Fired when the youtube api is loaded

### Getters
Access to a instance of a youtube api player.
```javascript
var player = YoutubeAPI.get('player1');
player.playVideo();
```



## Full example

```javascript
YoutubeAPI.create({
  items: [
    {
      elementId: 'player1',
      videoId: 'cNTaFArEObU',
      width: 400,
      height: 300,
      playerVars: { 'autoplay': 0, 'controls': 1, 'showinfo': 0, 'rel': 0 },
      onFirstTimePlayed: function(){
        console.log(' on first play video 1');
      },
      onPlaying: function(){
        console.log('on playing video 1');
      },
      onPaused: function(){
        console.log('on paused video 1');
      },
      onEnded: function(){
        console.log('On ended video 1');
      },
    },
    {
      width: 400,
      height: 300,
      elementId: 'player2',
      videoId: 'K0gryiltJo0',
      playerVars: { 'autoplay': 1, 'controls': 1, 'showinfo': 0, 'rel': 0 },
      onFirstTimePlayed: function(){
        console.log(' on first play video 2');
      },
      onPlaying: function(){
        console.log('on playing video 2');
      },
      onPaused: function(){
        console.log('on paused video 2');
      },
      onEnded: function(){
        console.log('On ended video 2');
      },
    }
  ],
  onReady: function(){
    console.log('On load youtube api');
  }
});
```
