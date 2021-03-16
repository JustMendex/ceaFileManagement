const deleteFiles = require('./../delete');
const catchAsync = require('./../utils/catchAsync');
const consultation = require('./../models/consultationModel');
const commande = require('./../models/commandeModel');
const facture = require('./../models/factureModel');
const AppError = require('./../utils/appError');

exports.updateConsultation = catchAsync(async (req, res, next) => {
  const { id, numeroConsultation } = req.body;

  if (!numeroConsultation || !id) {
    return next(new AppError('missing search data', 400));
  }

  const consult = await consultation.findOne({ numeroConsultation });

  // if (check) {
  //   return next(new AppError('ce numéro de exist deja', 403));
  // }

  // const consult = await consultation.findByIdAndUpdate(id, {
  //   numeroConsultation
  // });

  //updating the toher collections
  await commande.updateMany(
    {
      numeroConsultation: consult.numeroConsultation
    },
    { numeroConsultation }
  );

  await facture.updateMany(
    {
      numeroConsultation: consult.numeroConsultation
    },
    { numeroConsultation }
  );

  //checking files to udpate them if necessary

  if (req.files['reglementConsultation'] !== undefined) {
    await consultation.updateOne(
      { _id: consult._id },
      { reglementConsultation: req.files['reglementConsultation'][0].filename }
    );
    deleteFiles(consult.reglementConsultation);
  }

  if (req.files['lettreConsultation'] !== undefined) {
    await consultation.updateOne(
      { _id: consult._id },
      { lettreConsultation: req.files['lettreConsultation'][0].filename }
    );
    deleteFiles(consult.lettreConsultation);
  }

  if (req.files['offresConcurrents'] !== undefined) {
    await consultation.updateOne(
      { _id: consult._id },
      { offresConcurrents: req.files['offresConcurrents'][0].filename }
    );
    if (consult.offresConcurrents !== '') {
      deleteFiles(consult.offresConcurrents);
    }
  }

  if (req.files['pvOuverture'] !== undefined) {
    await consultation.updateOne(
      { _id: consult._id },
      { pvOuverture: req.files['pvOuverture'][0].filename }
    );
    if (consult.pvOuverture !== '') {
      deleteFiles(consult.pvOuverture);
    }
  }

  res.status(200).json({
    status: 'success',
    message: 'all ok'
  });
});

exports.updateCommande = catchAsync(async (req, res, next) => {
  const { numeroCommande, numeroConsultation, id } = req.body;

  if (!numeroCommande || !numeroConsultation || !id) {
    return next(new AppError('missing search data', 400));
  }

  const com = await commande.findOne({ numeroCommande, numeroConsultation });

  // if (check) {
  //   return next(new AppError('ce numéro de exist deja', 403));
  // }

  // const com = await commande.findByIdAndUpdate(id, { numeroCommande });

  if (req.files['bonCommande'] !== undefined) {
    await commande.updateOne(
      { _id: com._id },
      { bonCommande: req.files['bonCommande'][0].filename }
    );
    deleteFiles(com.bonCommande);
  }

  if (req.files['pvReception'] !== undefined) {
    await commande.findByIdAndUpdate(
      { _id: com._id },
      { pvReception: req.files['pvReception'][0].filename }
    );

    if (com.pvReception !== '') {
      deleteFiles(com.pvReception);
    }
  }

  res.status(200).json({
    status: 'success',
    message: 'all ok'
  });
});

exports.updateFacture = catchAsync(async (req, res, next) => {
  const { numeroFacture, numeroConsultation, id } = req.body;

  if (!numeroFacture || !numeroConsultation || !id) {
    return next(new AppError('missing search data', 400));
  }

  const fac = await facture.findOne({ numeroFacture, numeroConsultation });

  // if (check) {
  //   return next(new AppError('ce numéro de exist deja', 403));
  // }

  // const fac = await facture.findByIdAndUpdate(id, { numeroFacture });

  if (req.files['facture'] !== undefined) {
    await facture.findByIdAndUpdate(
      { _id: fac._id },
      { facture: req.files['facture'][0].filename }
    );
    deleteFiles(fac.facture);
  }

  res.status(200).json({
    status: 'success',
    message: 'all ok'
  });
});
