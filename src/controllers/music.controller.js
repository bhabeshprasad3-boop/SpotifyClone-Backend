const musicModel = require("../models/music.model");
const { uploadFile } = require("../services/storage.service");
const albumModel = require("../models/album.model");

// 1. Create Music
async function createMusic(req, res) {
  try {
    const { title } = req.body;
    const songFiles = req.files?.["song"];
    const thumbnailFiles = req.files?.["thumbnail"];

    if (!title || !songFiles || !thumbnailFiles) {
      return res.status(400).json({
        message: "Title, Song file, and Thumbnail are required",
      });
    }

    const songFile = songFiles[0];
    const thumbnailFile = thumbnailFiles[0];

    // Upload Song
    const songName = `song-${Date.now()}`;
    const songResult = await uploadFile(
      songFile.buffer.toString("base64"),
      songName
    );

    // Upload Thumbnail
    const thumbName = `thumb-${Date.now()}`;
    const thumbnailResult = await uploadFile(
      thumbnailFile.buffer.toString("base64"),
      thumbName
    );

    // Database Entry
    const music = await musicModel.create({
      title,
      uri: songResult.url,
      thumbnail: thumbnailResult.url,
      artist: req.user.id,
    });

    res.status(201).json({
      message: "Music created successfully",
      music: {
        id: music._id,
        title: music.title,
        uri: music.uri,
        thumbnail: music.thumbnail,
        artist: music.artist,
      },
    });
  } catch (error) {
    console.log("Error in createMusic:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

// 2. Create Album
async function createAlbum(req, res) {
  try {
    let { title, musicIds, description } = req.body;
    const file = req.file;

    if (!title || !description || !file) {
      return res
        .status(400)
        .json({ message: "Title, Description and Thumbnail are required" });
    }

    // Handle array input from FormData
    if (musicIds && !Array.isArray(musicIds)) {
      musicIds = [musicIds];
    }

    const safeName = `album-${Date.now()}`;
    const uploadResult = await uploadFile(
      file.buffer.toString("base64"),
      safeName
    );

    const album = await albumModel.create({
      title,
      description,
      thumbnail: uploadResult.url,
      artist: req.user.id,
      musics: musicIds, // Saved as 'musics'
    });

    res.status(201).json({
      message: "Album created successfully",
      id: album._id,
      title: album.title,
      musics: album.musics,
      artist: album.artist,
    });
  } catch (error) {
    console.log("Error in createAlbum:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

// 3. Get All Music (Added Try-Catch)
async function getAllMusic(req, res) {
  try {
    const musics = await musicModel
    .find()
    .limit(10)
    .populate("artist", "username email");

    res.status(200).json({
      message: "Music fetched successfully",
      musics: musics,
    });
  } catch (error) {
    console.log("Error fetching music:", error);
    res.status(500).json({ message: "Error fetching music" });
  }
}


async function getAllAlbum(req, res) {
  try {
   
    const albums = await albumModel
      .find().select("title artist")
      .populate("artist", "username email")
      .populate("musics"); 

    res.status(200).json({
      message: "Albums fetched successfully.",
      albums: albums
    });
  } catch (error) {
    console.log("Error fetching albums:", error);
    res.status(500).json({ message: "Error fetching albums" });
  }
}

async function getAlbumById(req, res) {
  try {
    
    const albumId = req.params.albumId;

    const album = await albumModel.findById(albumId)
      .populate("artist", "username email")
      .populate("musics");

    
    if (!album) {
      return res.status(404).json({ message: "Album not found" });
    }

    return res.status(200).json({
      message: "Album fetched successfully",
      album: album
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching album" });
  }
}


module.exports = { createMusic, createAlbum, getAllMusic, getAllAlbum,getAlbumById };

