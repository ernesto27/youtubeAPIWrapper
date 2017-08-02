var YoutubeAPI = {

	params: [],
	items: [],
	players:[],

	/**
	 * Initialize all things
	 * @param  {Array} params
	 */
	create: function(params){
		this.params = params;
		this.items = params.items;
		this.addLibrary();
		this.initPlayer();
	},

	/**
	 * Create and script tag and load the youtube api library
	 */
	addLibrary: function(){
		var tag = document.createElement('script');
		tag.src = "https://www.youtube.com/iframe_api";
		var firstScriptTag = document.getElementsByTagName('script')[0];
		firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
	},

	/**
	 * Create the video objects
	 */
	initPlayer: function(){
		var that = this;
		window.onYouTubeIframeAPIReady = function(){
			for( var index in that.items){
				var current = that.items[index];
				var settings = current;
				settings.events = {
					'onStateChange': that.onPlayerStateChange
				}

				var player = new YT.Player(current.elementId , settings);
				that.players[current.elementId] = player;
			}
			that.params.onReady();
		}
	},

	/**
	 * Event that fired when status of video change
	 * @param {object} event
	 */
	onPlayerStateChange: function(event){
		var currentId = event.target.a.id;
		var items = YoutubeAPI.items;

		for( var index in items){
			for(var key in items[index]){
				if(key == 'elementId' && items[index][key] == currentId){

					if (event.data == YT.PlayerState.PLAYING){
						if(!items[index].isAlreadyPlayed && items[index].onFirstTimePlayed){
							items[index].onFirstTimePlayed();
							items[index].isAlreadyPlayed = true;
						}

						if(items[index].onPlaying){
							items[index].onPlaying();
						}
					}

					if(event.data == YT.PlayerState.PAUSED){
						if(items[index].onPaused){
							items[index].onPaused();
						}
					}

					if(event.data == YT.PlayerState.ENDED){
						if(items[index].onEnded){
							items[index].onEnded();
						}
					}
					break;
				}
			}
		}
	},

	/**
	 * Obtain the instance of a player video
	 * @param {string} element
	 * @return {object}
	 */
	get: function(element){
		return this.players[element];
	}
}
