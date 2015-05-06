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