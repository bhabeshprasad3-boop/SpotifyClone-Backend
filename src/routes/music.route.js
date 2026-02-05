const express = require('express');
const router = express.Router();
const multer = require('multer'); 
const musicController = require("../controllers/music.controller");
const authMiddleware = require('../middleware/auth.middleware')

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


router.post('/upload', authMiddleware.authArtist,upload.fields([{name:'song',maxCount:1},{name: 'thumbnail',maxCount:1}]), musicController.createMusic);


router.post('/album',authMiddleware.authArtist,upload.single('thumbnail'),musicController.createAlbum)


router.get('/',authMiddleware.authUser, musicController.getAllMusic)
router.get('/albums' ,authMiddleware.authUser, musicController.getAllAlbum)

router.get('/albums/:id',authMiddleware.authUser,musicController.getAlbumById)

module.exports = router;