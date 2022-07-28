const express = require('express');
const mainController = require("../controllers/mainController");

const router = express.Router();

/* GET home page. */
router.get('/', mainController.vistaHome);

module.exports = router;