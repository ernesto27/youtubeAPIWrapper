var YoutubeAPI = {

	items: [],

	create: function(params){
		this.addLibrary();

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
				console.log(current)
				var player;						
				player = new YT.Player(current.elementId , {
					videoId: current.videoId,
					playerVars: { 'autoplay': 0, 'controls': 1, 'showinfo': 0, 'rel': 0 },
				});
			}

			
		}
	}
}
