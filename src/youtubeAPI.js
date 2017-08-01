var YoutubeAPI = {

	params: [],
	items: [],
	players:[], 

	defaultSettings: {
		height: 200,
		width: 200,
		playerVars: { 'autoplay': 0, 'controls': 1, 'showinfo': 0, 'rel': 0 },
	},


	create: function(params){
		this.addLibrary();

		this.params = params;
		this.items = params.items;

		this.initPlayer();
	},


	addLibrary: function(){
		var tag = document.createElement('script');
		tag.src = "https://www.youtube.com/iframe_api";
		var firstScriptTag = document.getElementsByTagName('script')[0];
		firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
	},

	initPlayer: function(){
		var that = this;
		window.onYouTubeIframeAPIReady = function(){
			for( var index in that.items){
				var current = that.items[index];
				var settings = that.merge(that.defaultSettings, current);		
				settings.events = {
					'onStateChange': that.onPlayerStateChange
				}

				var player = new YT.Player(current.elementId , settings);
				that.players[current.elementId] = player;
			}

			that.params.onReady();
		}
	},


	merge: function(defaultSettings, newSettings){
		for(var key in newSettings){
			if (newSettings.hasOwnProperty(key)){
				defaultSettings[key] = newSettings[key];
				if(key == 'playerVars'){
					for( var index in newSettings[key]){
						defaultSettings[key][index] = newSettings[key][index];
					}
				}
			}
		}
		return defaultSettings;
	},

	onPlayerStateChange: function(event){
		for(var index in YoutubeAPI.items){
			var current = YoutubeAPI.items[index];
			// console.log(current)
			for(var key in current){
				if(key == 'onPlaying'){
					current.onPlaying();
				}
			}
		}

	},


	get: function(element){
		return this.players[element];
	}
}
