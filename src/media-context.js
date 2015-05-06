/**
 * MediaContext
 * Methods for processing elements or strings relating to media, and returning valuable formatted data
 */
function MediaContext () {
    this.element = void 0;
    this.elIdx = 0;

    /**
     * parses the URL String and returns an object containing useful path items
     */
    this.getUri = function ( href ){
        var l = document.createElement("a");
        l.href = href;
        return l;
    };

    /**
     * get media file extension
     */
    this.fileType = function ( src ){
        var ytRE = new RegExp("ytimg");
        // var t = /.+\.([^?]+)(\?|$)/; //old
        var t = /.+\.([^?]+)/;
        // check if is youtube thumb, if so, return video type
        if(ytRE.test(src)){
            return "youtube";
        }
        return src.match(t)[1];
    };

    /**
     * Pass in a dom element, get media type
     */
    this.getType = function ( elem ) {
        var _self = this;
        var _type = "", finalType, _file, _src;
        var providers = ["youtube","vimeo","spotify","soundcloud"];
        var typeMap = {
            quote: "link",
            img: "image",
            jpg: "image",
            jpeg: "image",
            png: "image", 
            gif: "image",
            webp: "image",
            youtube: "video",
            vimeo: "video",
            spotify: "audio",
            soundcloud: "audio"
        };

        elem = elem || this.element;
        _type = elem.nodeName;
        _src = elem.src;

        if(_type === "IMG"){
            _file = (elem.src) ? _self.fileType(elem.src) : "img";
            finalType = (_file !== "img") ? typeMap[_file] + "/" + _file : typeMap[_type];
        } else {
            var found;
            
            for (var i = providers.length - 1; i >= 0; i--) {
                var prI = providers[i];
                var pR = new RegExp( prI );
                
                found = pR.test( elem.src );
                
                if(found){
                    _file = _src.match( pR )[0];
                    break;
                }
            }
            
            finalType = (_file) ? typeMap[_file] + "/" + _file : typeMap[_type];
        }

        return (finalType) ? finalType.toLowerCase() : null;
    };

    /**
     * get the src and url correctly for media types other than image
     */
    this.getMediaSrcUrl = function ( data, type ){
        // setup correct src and url structure based on type
        // - video sources will be video ID
        var specialType = (type) ? type.split("/")[1] : type;
        var src, url;

        // setup formatting for each type
        switch (specialType){
            case "youtube":
                src = MediaFormat().getYoutubeID( data.src );
                url = MediaFormat().getYoutubeUrl( src );
                break;
            case "vimeo":
                src = MediaFormat().getVimeoID( data.src );
                url = MediaFormat().getVimeoUrl( src );
                break;
            case "spotify":
                src = MediaFormat().getSpotifyID( data.src );
                url = MediaFormat().getSpotifyUrl( src );
                break;
            case "soundcloud":
                src = MediaFormat().getSoundcloudID( data.src );
                url = MediaFormat().getSoundcloudUrl( src );
                break;
        }

        return {
            src: src,
            url: url
        };
    };
}