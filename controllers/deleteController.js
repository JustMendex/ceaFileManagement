const deleteFiles = require('./../delete');
const catchAsync = require('./../utils/catchAsync');
const consultation = require('./../models/consultationModel');
const commande = require('./../models/commandeModel');
const facture = require('./../models/factureModel');
const AppError = require('./../utils/appError');

exports.deleteConsultation = catchAsync(async (req, res, next) => {
  const { numeroConsultation } = req.body;
  if (!numeroConsultation) {
    return next(new AppError('missing search data', 400));
  }

  const consult = await consultation.findOneAndRemove({ numeroConsultation });

  deleteFiles(consult.lettreConsultation);
  deleteFiles(consult.reglementConsultation);
  if (consult.offresConcurrents !== '') {
    deleteFiles(consult.offresConcurrents);
  }
  if (consult.pvOuverture !== '') {
    deleteFiles(consult.pvOuverture);
  }

  const com = await commande.find({ numeroConsultation });

  com.map(document => {
    deleteFiles(document.bonCommande);
    if (document.pvReception !== '') {
      deleteFiles(document.pvReception);
    }
  });

  await commande.deleteMany({ numeroConsultation });

  const fac = await facture.find({ numeroConsultation });
  fac.map(document => {
    deleteFiles(document.facture);
  });

  await facture.deleteMany({ numeroConsultation });

  res.status(200).json({
    status: 'success',
    message: 'all ok'
  });
});

exports.deleteCommande = catchAsync(async (req, res, next) => {
  const { numeroCommande } = req.body;

  if (!numeroCommande) {
    return next(new AppError('missing search data', 400));
  }

  const com = await commande.findOneAndRemove({ numeroCommande });

  deleteFiles(com.bonCommande);
  if (com.pvReception !== '') {
    deleteFiles(com.pvReception);
  }

  res.status(200).json({
    status: 'success',
    message: 'all ok'
  });
});

exports.deleteFacture = catchAsync(async (req, res, next) => {
  const { numeroFacture } = req.body;
  if (!numeroFacture) {
    return next(new AppError('missing search data', 400));
  }

  const fac = await facture.findOneAndRemove({ numeroFacture });
  deleteFiles(fac.facture);

  res.status(200).json({
    status: 'success',
    message: 'all ok'
  });
});
