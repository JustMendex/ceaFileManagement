const express = require('express');
const searchController = require('../controllers/searchController');

const router = express.Router();

router.post('/searchConsultation', everythingController.searchConsultation);
router.post('/searchCommande', everythingController.searchCommande);
router.post('/searchFacture', everythingController.searchFacture);

module.exports = router;
