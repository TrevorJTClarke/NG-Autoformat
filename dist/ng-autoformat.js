/**
 * autoFormat
 * @author: Trevor Clarke
 * Filter for Links, youtube, hashtags, and more!
 */
// App.filter('autoFormat', function () {
//    //URLs starting with http://, https://, or ftp://
//    var linkHTTP = /(\b(https?|ftp):\/\/[\-A-Z0-9+&@#\/%?=~_|!:,.;]*[\-A-Z0-9+&@#\/%=~_|])/im;

//    //URLs starting with "www."
//    var linkWWW = new RegExp(/(^|[^\/])(www\.[\S]+(\b|$))/im);

//    //Change email addresses to mailto:: links.
//    var linkMAIL = /(\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,6})/im;

//    //Image links .jpg, .png, .bmp
//    var imageHTTP = /^https?:\/\/[\-A-Z0-9+&@#\/%?=~_|!:,.;]*\.(?:jpg|jpeg|bmp|png)$/gim;
//    var image_regex = new RegExp(/\.(jpg|JPG|jpeg|JPEG|bmp|BMP|png|PNG)/);
//    var imageWWW = new RegExp(linkWWW.source + image_regex.source + "$");

//    function trim (str) {
//       return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
//    }

//    /**
//     * JavaScript function to match (and return) the video Id 
//     * of any valid Youtube Url, given as input string.
//     * @author: Stephan Schmitz <eyecatchup@gmail.com>
//     * @url: http://stackoverflow.com/a/10315969/624466
//     */
//    function youtubeVideoID(url) {
//       var p = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
//       return (url.match(p)) ? RegExp.$1 : false;
//    }

//    function replaceHashtags(str) {
//       return str
//          .replace(/(^|\s)#(\w+)/g, '$1<a class="bbhtag" href="http://www.tumblr.com/tagged/$2">$2</a>');
//    }

//    function replaceFontStyles(str) {
//       return str
//          // -strikethrough-
//          .replace(/-([A-Za-z](.*[A-Za-z]+)?)-/, '<del>$1</del>')
//          // *bold*
//          .replace(/(^|\D)\*(.+)\*($|\D)/, '$1<b>$2</b>$3')
//          // _italics_
//          .replace(/_(\S+(.*\S+)?)_/, '<i>$1</i>');
//    }

//    function formatHTTP(linkStr) {
//       return linkStr.replace(linkHTTP, '<a href="$1" target="_blank">$1</a>');
//    }

//    function formatWWW(linkStr) {
//       return linkStr.replace(linkWWW, '$1<a href="http://$2" target="_blank">$2</a>');
//    }

//    function formatMAIL(mailStr) {
//       return mailStr
//          .replace(linkMAIL, '<a href="mailto:$1">$1</a>');
//    }

//    function splitFirst(str, regex) {
//       var result = regex.exec(str);
//       return {
//          beginning: str.substring(0, result.index),
//          match: result[0],
//          end: str.substring(result.index + result[0].length, str.length),
//       };
//    }

//    function formatMessage(str) {
//       var result;
//       // If there is a link:
//       if (linkHTTP.test(str)) {
//          result = splitFirst(str, linkHTTP);
//          return formatMessage(result.beginning) +
//                 formatHTTP(result.match) +
//                 formatMessage(result.end);
//       } else if (linkWWW.test(str)) {
//          result = splitFirst(str, linkWWW);
//          return formatMessage(result.beginning) +
//                 formatWWW(result.match) +
//                 formatMessage(result.end);
//       } else if (linkMAIL.test(str)) {
//          result = splitFirst(str, linkMAIL);
//          return formatMessage(result.beginning) +
//                 formatMAIL(result.match) +
//                 formatMessage(result.end);
//       } else {
//          // replace hashtags with clickable links
//          str = replaceHashtags(str);
//          // Bold/Emphasis/Etc.
//          str = replaceFontStyles(str);
//          return str;
//       }
//    }

//    return function(str) {
//       if (!str) return str;
//       // Trim whitespace off beginning and end of message.
//       str = trim(str);

//       // Load a thumbnail if it's just a youtube url.
//       var videoID = youtubeVideoID(str);
//       if (videoID) {
//          return '<a target="_blank" href="http://youtube.com/watch?v=' + videoID + '">' +
//                       '<img src="http://img.youtube.com/vi/' + videoID + '/mqdefault.jpg"></img>' +
//                 '</a>';
//       // Load the image if it's just a just an image url.
//       } else if (str.match(imageWWW) !== null) {
//          return '<img class="msgImage" src=http://' + str + '></img>';
//       } else if (str.match(imageHTTP) !== null) {
//          return '<img class="msgImage" src=' + str + '></img>';
//       } else {
//          return formatMessage(str);
//       }
//    };
// });

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
/**
 * MediaFormat
 * format and return only needed pieces of media from their public sources
 */
function MediaFormat (){
    // http://www.youtube.com/embed/m5yCOSHeYn4
    var ytRegEx = /^(?:https?:\/\/)?(?:i\.|www\.|img\.)?(?:youtu\.be\/|youtube\.com\/|ytimg\.com\/)(?:embed\/|v\/|vi\/|vi_webp\/|watch\?v=|watch\?.+&v=)((\w|-){11})(?:\S+)?$/;
    // https://player.vimeo.com/video/50489180
    var vmRegEx = /https?:\/\/(?:player\.)(?:vimeo\.com\/video\/)((\w|-){8})/;
    // https://embed.spotify.com/?uri=spotify:track:78z8O6X1dESVSwUPAAPdme
    var spRegEx = /https?:\/\/(?:embed\.)(?:spotify\.com\/)\?uri=spotify:track:((\w|-){22})/;
    // https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/29395900&amp;color=ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false
    var scRegEx = /https?:\/\/(?:w\.)(?:soundcloud\.com\/player\/)\?url=https\%3A\/\/api.soundcloud.com\/tracks\/((\w|-){8})/;

    function getIDfromRegEx ( src, regExpy ){
        return (src.match(regExpy)) ? RegExp.$1 : null;
    }

    return {
        // returns only the ID
        getYoutubeID: function ( src ){
            return getIDfromRegEx( src, ytRegEx);
        },
        // returns main link
        getYoutubeUrl: function ( ID ){
            return "https://www.youtube.com/watch?v=" + ID;
        },
        // returns only the ID
        getVimeoID: function ( src ){
            return getIDfromRegEx( src, vmRegEx);
        },
        // returns main link
        getVimeoUrl: function ( ID ){
            return "http://vimeo.com/" + ID;
        },
        // returns only the ID
        getSpotifyID: function ( src ){
            return getIDfromRegEx( src, spRegEx);
        },
        // returns main link
        getSpotifyUrl: function ( ID ){
            return "http://open.spotify.com/track/" + ID;
        },
        // returns only the ID
        getSoundcloudID: function ( src ){
            return getIDfromRegEx( src, scRegEx);
        },
        // returns main link
        // NOTE: this one really sucks since soundcloud doesnt have good API without js library
        getSoundcloudUrl: function ( ID ){
            return "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/" + ID; //only way to link to the track currently
        }
    };
}