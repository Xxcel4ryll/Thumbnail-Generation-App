const ffmpeg = require("ffmpeg");
const Path = require("path");
const Fs = require("fs");

class Thumbnailgenerator {
  static generateThumbnails(req, res) {
    const inputFile = `http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4`;
    const Storage = Path.join(Path.dirname(__dirname), "thumbnail_store");

    let process = new ffmpeg(inputFile);
    process
      .then(
        function (video) {
          video.fnExtractFrameToJPG(
            Storage,
            {
              frame_rate: 1,
              number: 5, // Total Number of Thumbnails to be generated
            },
            function (error, files) {
              if (!error) res.send("Frames: " + files);
            }
          );
        },
        function (err) {
          console.log(err.message);
          res.send("Error: " + err);
        }
      )
      .catch((err) => {
        console.log(err.message);
        res.send(err.message);
      });
  }
}

module.exports = Thumbnailgenerator;
