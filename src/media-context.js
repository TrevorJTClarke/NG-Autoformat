/**
 * MediaContext
 * Methods for processing elements or strings relating to media, and returning valuable formatted data
 */
function MediaContext () {
    this.element = void 0;
    this.elIdx = 0;

    function MediaItem (){
        return {};
    }

    var setLocation = function(href) {
        var l = document.createElement("a");
        l.href = href;
        return l;
    };
    var getLocation = function ( href ) {
        var pathUrl = setLocation( href );
        var pathParts = pathUrl.hostname.split(".");
        return pathParts[pathParts.length - 2];// + "." + pathParts[pathParts.length - 1];
    };

    function parseUri (str) {
        var o   = parseUri.options,
            m   = o.parser[o.strictMode ? "strict" : "loose"].exec(str),
            uri = {},
            i   = 14;

        while (i--) uri[o.key[i]] = m[i] || "";

        uri[o.q.name] = {};
        uri[o.key[12]].replace(o.q.parser, function ($0, $1, $2) {
            if ($1) uri[o.q.name][$1] = $2;
        });

        return uri;
    }

    parseUri.options = {
        strictMode: false,
        key: ["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"],
        q:   {
            name:   "queryKey",
            parser: /(?:^|&)([^&=]*)=?([^&]*)/g
        },
        parser: {
            strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
            loose:  /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
        }
    };

    this.get = function( mediaData, idx, callback) {
        if(!mediaData){ throw new Error("No data specified!"); }
        this.mediaItem = new MediaItem();
        this.element = mediaData;
        this.elIdx = idx;

        // this method calls all the other small methods for finding and parsing. #yay! :)
        this.findMeta();

        // return with context data!!
        callback( this.mediaItem );
    };

    /**
     * parses the URL String and returns an object containing useful path items
     */
    this.getUri = function ( elem ){
        elem = elem || this.element;

        return parseUri( elem.src );
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

        if(_type === "DIV"){
            // TODO: setup setup for instagram background-image check
            _file = "quote";
            finalType = typeMap[_file] + "/" + _file;
        } else if(_type === "IMG"){
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
}