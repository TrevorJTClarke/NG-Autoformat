describe("mediaContext Module", function() {
    var mC = new MediaContext();

    it("mediaContext Module Exists", function() {
        expect(mC).toBeDefined();
    });

    // A few examples, to test if the A element really created a mimic of window.location object
    describe("mediaContext getUri Method", function () {
        var _a;

        beforeEach(function(){
            _a = mC.getUri("https://blog.somecoolurl.com/path/to/blog-post-about-anything?sort=featured&filter=date");
        });
        
        it("Can return uri protocol", function() {
            expect(_a).toBeDefined();
            expect(_a.protocol).toEqual("https:");
        });

        it("Can return uri hostname", function() {
            expect(_a.hostname).toEqual("blog.somecoolurl.com");
        });

        it("Can return uri path", function() {
            expect(_a.pathname).toEqual("/path/to/blog-post-about-anything");
        });

        it("Can return uri search params", function() {
            expect(_a.search).toEqual("?sort=featured&filter=date");
        });
    });

    // Looks for file extentions
    describe("mediaContext fileType Method", function() {

        it("Can return .jpg file type", function() {
            var fileUrl     = "http://img.youtube.com/vi/m5yCOSHeYn4/default.jpg";
            var fileType    = "jpg";
            var finalType   = mC.fileType( fileUrl );
            expect( finalType ).toBeDefined();
            expect( finalType ).toEqual( fileType );
        });

        it("Can return .png file type", function() {
            var fileUrl     = "http://cdn.grumpycats.com/wp-content/uploads/2012/09/GC-Gravatar-copy.png";
            var fileType    = "png";
            var finalType   = mC.fileType( fileUrl );
            expect( finalType ).toBeDefined();
            expect( finalType ).toEqual( fileType );
        });

        it("Can return .gif file type", function() {
            var fileUrl     = "http://media.giphy.com/media/ZYi2Lc03nrryw/giphy.gif";
            var fileType    = "gif";
            var finalType   = mC.fileType( fileUrl );
            expect( finalType ).toBeDefined();
            expect( finalType ).toEqual( fileType );
        });
    });

    // returns the media type based on the element
    describe("mediaContext getType Method", function() {
        var _img = document.createElement("img");
        var _iframe = document.createElement("iframe");

        it("Can return image type jpg", function() {
            var img = _img;
                img.setAttribute('src', 'http://img.youtube.com/vi/m5yCOSHeYn4/default.jpg');
            var testType = mC.getType( img );
            expect( testType ).toBeDefined();
            expect( testType ).toEqual("image/jpg");
            expect( testType ).not.toEqual("image/png");
        });

        it("Can return image type png", function() {
            var img = _img;
                img.setAttribute('src', 'http://cdn.grumpycats.com/wp-content/uploads/2012/09/GC-Gravatar-copy.png');
            var testType = mC.getType( img );
            expect( testType ).toBeDefined();
            expect( testType ).toEqual("image/png");
            expect( testType ).not.toEqual("image/jpg");
        });

        it("Can return video type youtube", function() {
            var iframe = _iframe;
                iframe.setAttribute('src', 'https://www.youtube.com/embed/m5yCOSHeYn4');
            var testType = mC.getType( iframe );
            expect( testType ).toBeDefined();
            expect( testType ).toEqual("video/youtube");
            expect( testType ).not.toEqual("video/vimeo");
        });

        it("Can return video type vimeo", function() {
            var iframe = _iframe;
                iframe.setAttribute('src', 'https://player.vimeo.com/video/50489180');
            var testType = mC.getType( iframe );
            expect( testType ).toBeDefined();
            expect( testType ).toEqual("video/vimeo");
            expect( testType ).not.toEqual("video/youtube");
        });
    });

    // returns the useful media data based on the element and type found
    describe("mediaContext getMediaSrcUrl Method", function() {
        var _iframe = document.createElement("iframe");

        it("Can return youtube video data", function() {
            var ytUrl = "https://www.youtube.com/embed/m5yCOSHeYn4";
            var iframe = _iframe;
                iframe.setAttribute('src', ytUrl);
            var data = {
                src: ytUrl
            };
            var testType = mC.getType( iframe );
            var testData = mC.getMediaSrcUrl( data, testType );

            expect( testType ).toBeDefined();
            expect( testType ).toEqual("video/youtube");
            expect( testType ).not.toEqual("video/vimeo");

            expect( testData ).toBeDefined();
            expect( testData.url ).toBeDefined();
            expect( testData.src ).toBeDefined();
            expect( testData.url ).toEqual("https://www.youtube.com/watch?v=m5yCOSHeYn4");
            expect( testData.src ).toEqual("m5yCOSHeYn4");
        });

        it("Can return vimeo video data", function() {
            var vmUrl = "https://player.vimeo.com/video/50489180";
            var iframe = _iframe;
                iframe.setAttribute('src', vmUrl);
            var data = {
                src: vmUrl
            };
            var testType = mC.getType( iframe );
            var testData = mC.getMediaSrcUrl( data, testType );

            expect( testType ).toBeDefined();
            expect( testType ).toEqual("video/vimeo");
            expect( testType ).not.toEqual("video/youtube");

            expect( testData ).toBeDefined();
            expect( testData.url ).toBeDefined();
            expect( testData.src ).toBeDefined();
            expect( testData.url ).toEqual("http://vimeo.com/50489180");
            expect( testData.src ).toEqual("50489180");
        });
    });

});