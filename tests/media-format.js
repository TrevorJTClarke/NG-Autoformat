describe("mediaFormat Module", function() {
    var mF = new MediaFormat();

    // Stock test data:
    var data = {
        youtube: "https://www.youtube.com/embed/m5yCOSHeYn4",
        vimeo: "https://player.vimeo.com/video/50489180",
        spotify: "https://embed.spotify.com/?uri=spotify:track:78z8O6X1dESVSwUPAAPdme",
        soundcloud: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/29395900&amp;color=ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false"
    };

    it("mediaFormat Module Exists", function() {
        expect(mF).toBeDefined();
    });

    describe("mediaFormat Youtube Support", function() {

        it("Can Parse Youtube ID", function() {
            var finalId = "m5yCOSHeYn4";
            var testId = mF.getYoutubeID( data.youtube );
            expect( testId ).toBeDefined();
            expect( testId ).toEqual( finalId );
        });

        it("Can Parse Youtube URL", function() {
            var finalUrl    = "https://www.youtube.com/watch?v=m5yCOSHeYn4";
            var testId      = mF.getYoutubeID( data.youtube );
            var testUrl     = mF.getYoutubeUrl( testId );
            expect( testUrl ).toBeDefined();
            expect( testUrl ).toEqual( finalUrl );
        });
    });

    describe("mediaFormat Vimeo Support", function() {

        it("Can Parse Vimeo ID", function() {
            var finalId = "50489180";
            var testId = mF.getVimeoID( data.vimeo );
            expect( testId ).toBeDefined();
            expect( testId ).toEqual( finalId );
        });

        it("Can Parse Vimeo URL", function() {
            var finalUrl    = "http://vimeo.com/50489180";
            var testId      = mF.getVimeoID( data.vimeo );
            var testUrl     = mF.getVimeoUrl( testId );
            expect( testUrl ).toBeDefined();
            expect( testUrl ).toEqual( finalUrl );
        });
    });

    describe("mediaFormat Spotify Support", function() {

        it("Can Parse Spotify ID", function() {
            var finalId = "78z8O6X1dESVSwUPAAPdme";
            var testId = mF.getSpotifyID( data.spotify );
            expect( testId ).toBeDefined();
            expect( testId ).toEqual( finalId );
        });

        it("Can Parse Spotify URL", function() {
            var finalUrl    = "http://open.spotify.com/track/78z8O6X1dESVSwUPAAPdme";
            var testId      = mF.getSpotifyID( data.spotify );
            var testUrl     = mF.getSpotifyUrl( testId );
            expect( testUrl ).toBeDefined();
            expect( testUrl ).toEqual( finalUrl );
        });
    });

    describe("mediaFormat Soundcloud Support", function() {

        it("Can Parse Soundcloud ID", function() {
            var finalId = "29395900";
            var testId = mF.getSoundcloudID( data.soundcloud );
            expect( testId ).toBeDefined();
            expect( testId ).toEqual( finalId );
        });

        it("Can Parse Soundcloud URL", function() {
            var finalUrl    = "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/29395900";
            var testId      = mF.getSoundcloudID( data.soundcloud );
            var testUrl     = mF.getSoundcloudUrl( testId );
            expect( testUrl ).toBeDefined();
            expect( testUrl ).toEqual( finalUrl );
        });
    });

});