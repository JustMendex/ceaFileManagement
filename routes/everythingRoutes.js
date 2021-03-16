const express = require('express');
const insertController = require('../controllers/insertController');
const searchController = require('../controllers/searchController');
const deleteController = require('../controllers/deleteController');
const updateController = require('../controllers/updateController');

const router = express.Router();

//insert routes
router.post('/insertConsultation', insertController.insertConsultation);
router.post('/insertCommande', insertController.insertCommande);
router.post('/insertFacture', insertController.insertFacture);

//search routes
router.post('/search', searchController.search);
// router.post('/searchConsultation', searchController.searchConsultation);
// router.post('/searchCommande', searchController.searchCommande);
// router.post('/searchFacture', searchController.searchFacture);

//delete routes
router.delete('/deleteConsultation', deleteController.deleteConsultation);
router.delete('/deleteCommande', deleteController.deleteCommande);
router.delete('/deleteFacture', deleteController.deleteFacture);

//update routes
router.patch('/updateConsultation', updateController.updateConsultation);
router.patch('/updateCommande', updateController.updateCommande);
router.patch('/updateFacture', updateController.updateFacture);

module.exports = router;
