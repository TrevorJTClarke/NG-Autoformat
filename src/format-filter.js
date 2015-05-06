/**
 * autoFormat
 * @author: Trevor Clarke
 * Filter for Links, youtube, hashtags, and more!
 */
App.filter('autoFormat', function () {
   //URLs starting with http://, https://, or ftp://
   var linkHTTP = /(\b(https?|ftp):\/\/[\-A-Z0-9+&@#\/%?=~_|!:,.;]*[\-A-Z0-9+&@#\/%=~_|])/im;

   //URLs starting with "www."
   var linkWWW = new RegExp(/(^|[^\/])(www\.[\S]+(\b|$))/im);

   //Change email addresses to mailto:: links.
   var linkMAIL = /(\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,6})/im;

   //Image links .jpg, .png, .bmp
   var imageHTTP = /^https?:\/\/[\-A-Z0-9+&@#\/%?=~_|!:,.;]*\.(?:jpg|jpeg|bmp|png)$/gim;
   var image_regex = new RegExp(/\.(jpg|JPG|jpeg|JPEG|bmp|BMP|png|PNG)/);
   var imageWWW = new RegExp(linkWWW.source + image_regex.source + "$");

   function trim (str) {
      return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
   }

   /**
    * JavaScript function to match (and return) the video Id 
    * of any valid Youtube Url, given as input string.
    * @author: Stephan Schmitz <eyecatchup@gmail.com>
    * @url: http://stackoverflow.com/a/10315969/624466
    */
   function youtubeVideoID(url) {
      var p = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
      return (url.match(p)) ? RegExp.$1 : false;
   }

   function replaceHashtags(str) {
      return str
         .replace(/(^|\s)#(\w+)/g, '$1<a class="bbhtag" href="http://www.tumblr.com/tagged/$2">$2</a>');
   }

   function replaceFontStyles(str) {
      return str
         // -strikethrough-
         .replace(/-([A-Za-z](.*[A-Za-z]+)?)-/, '<del>$1</del>')
         // *bold*
         .replace(/(^|\D)\*(.+)\*($|\D)/, '$1<b>$2</b>$3')
         // _italics_
         .replace(/_(\S+(.*\S+)?)_/, '<i>$1</i>');
   }

   function formatHTTP(linkStr) {
      return linkStr.replace(linkHTTP, '<a href="$1" target="_blank">$1</a>');
   }

   function formatWWW(linkStr) {
      return linkStr.replace(linkWWW, '$1<a href="http://$2" target="_blank">$2</a>');
   }

   function formatMAIL(mailStr) {
      return mailStr
         .replace(linkMAIL, '<a href="mailto:$1">$1</a>');
   }

   function splitFirst(str, regex) {
      var result = regex.exec(str);
      return {
         beginning: str.substring(0, result.index),
         match: result[0],
         end: str.substring(result.index + result[0].length, str.length),
      };
   }

   function formatMessage(str) {
      var result;
      // If there is a link:
      if (linkHTTP.test(str)) {
         result = splitFirst(str, linkHTTP);
         return formatMessage(result.beginning) +
                formatHTTP(result.match) +
                formatMessage(result.end);
      } else if (linkWWW.test(str)) {
         result = splitFirst(str, linkWWW);
         return formatMessage(result.beginning) +
                formatWWW(result.match) +
                formatMessage(result.end);
      } else if (linkMAIL.test(str)) {
         result = splitFirst(str, linkMAIL);
         return formatMessage(result.beginning) +
                formatMAIL(result.match) +
                formatMessage(result.end);
      } else {
         // replace hashtags with clickable links
         str = replaceHashtags(str);
         // Bold/Emphasis/Etc.
         str = replaceFontStyles(str);
         return str;
      }
   }

   return function(str) {
      if (!str) return str;
      // Trim whitespace off beginning and end of message.
      str = trim(str);

      // Load a thumbnail if it's just a youtube url.
      var videoID = youtubeVideoID(str);
      if (videoID) {
         return '<a target="_blank" href="http://youtube.com/watch?v=' + videoID + '">' +
                      '<img src="http://img.youtube.com/vi/' + videoID + '/mqdefault.jpg"></img>' +
                '</a>';
      // Load the image if it's just a just an image url.
      } else if (str.match(imageWWW) !== null) {
         return '<img class="msgImage" src=http://' + str + '></img>';
      } else if (str.match(imageHTTP) !== null) {
         return '<img class="msgImage" src=' + str + '></img>';
      } else {
         return formatMessage(str);
      }
   };
});