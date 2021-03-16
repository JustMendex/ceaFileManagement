const catchAsync = require('./../utils/catchAsync');
const consultation = require('./../models/consultationModel');
const commande = require('./../models/commandeModel');
const facture = require('./../models/factureModel');
const AppError = require('./../utils/appError');

exports.insertConsultation = catchAsync(async (req, res, next) => {
  const { numeroConsultation } = req.body;

  if (
    !numeroConsultation ||
    req.files['reglementConsultation'] === undefined ||
    req.files['lettreConsultation'] === undefined
  ) {
    return next(new AppError('missing info', 400));
  }

  const consult = await consultation.findOne({ numeroConsultation });

  if (consult) {
    return next(new AppError('ce numéro de consultation existe déjà', 403));
  }

  await consultation.create({
    numeroConsultation,
    reglementConsultation: req.files['reglementConsultation'][0].filename,
    lettreConsultation: req.files['lettreConsultation'][0].filename,
    offresConcurrents:
      req.files['offresConcurrents'] !== undefined
        ? req.files['offresConcurrents'][0].filename
        : '',
    pvOuverture:
      req.files['pvOuverture'] !== undefined
        ? req.files['pvOuverture'][0].filename
        : ''
  });

  return res.status(200).json({
    status: 'success',
    message: 'all ok',
    numeroConsultation
  });
});

exports.insertCommande = catchAsync(async (req, res, next) => {
  const { numeroCommande, numeroConsultation } = req.body;

  if (
    !numeroConsultation ||
    !numeroCommande ||
    req.files['bonCommande'] === undefined
  ) {
    return next(new AppError('missing info', 400));
  }

  const com = await commande.findOne({ numeroCommande });

  if (com) {
    return next(new AppError('ce numéro de Commande existe déjà', 403));
  }

  await commande.create({
    numeroCommande,
    numeroConsultation,
    bonCommande: req.files['bonCommande'][0].filename,
    pvReception:
      req.files['pvReception'] !== undefined
        ? req.files['pvReception'][0].filename
        : ''
  });

  res.status(200).json({
    status: 'success',
    message: 'all ok',
    numeroConsultation
  });
});

exports.insertFacture = catchAsync(async (req, res, next) => {
  const { numeroFacture, numeroConsultation } = req.body;

  if (
    !numeroConsultation ||
    !numeroFacture ||
    req.files['facture'] === undefined
  ) {
    return next(new AppError('missing info', 400));
  }

  const fac = await facture.findOne({ numeroFacture });

  if (fac) {
    return next(new AppError('ce numéro de facture existe déjà', 403));
  }

  await facture.create({
    numeroFacture,
    numeroConsultation,
    facture: req.files['facture'][0].filename
  });

  res.status(200).json({
    status: 'success',
    message: 'all ok',
    numeroConsultation
  });
});
