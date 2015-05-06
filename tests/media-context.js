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

    // describe("mediaContext ", function() {

    //     it("Can Parse URL", function() {
    //         var finalUrl    = "https://www.youtube.com/watch?v=m5yCOSHeYn4";
    //         var testId      = mF.getYoutubeID( data.youtube );
    //         var testUrl     = mF.getYoutubeUrl( testId );
    //         expect( testUrl ).toBeDefined();
    //         expect( testUrl ).toEqual( finalUrl );
    //     });
    // });

});