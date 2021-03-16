const catchAsync = require('./../utils/catchAsync');
const consultation = require('./../models/consultationModel');
const commande = require('./../models/commandeModel');
const facture = require('./../models/factureModel');
const AppError = require('./../utils/appError');

const searchConsultation = async (req, res, next, consult) => {
  const com = await commande.find({
    numeroConsultation: consult[0].numeroConsultation
  });
  const fac = await facture.find({
    numeroConsultation: consult[0].numeroConsultation
  });

  res.status(200).json({
    status: 'success',
    message: 'all ok',
    consultation: consult,
    facture: fac,
    commande: com
  });
};

const searchCommande = async (req, res, next, com) => {
  const consult = await consultation.find({
    numeroConsultation: com[0].numeroConsultation
  });
  const fac = await facture.find({
    numeroConsultation: com[0].numeroConsultation
  });

  const comalt = await commande.find({
    numeroConsultation: com[0].numeroConsultation
  });

  res.status(200).json({
    status: 'success',
    message: 'all ok',
    consultation: consult,
    facture: fac,
    commande: comalt
  });
};
const searchFacture = async (req, res, next, fac) => {
  const consult = await consultation.find({
    numeroConsultation: fac[0].numeroConsultation
  });
  const com = await commande.find({
    numeroConsultation: fac[0].numeroConsultation
  });
  const facalt = await facture.find({
    numeroConsultation: consult[0].numeroConsultation
  });

  res.status(200).json({
    status: 'success',
    message: 'all ok',
    consultation: consult,
    facture: facalt,
    commande: com
  });
};

exports.search = catchAsync(async (req, res, next) => {
  const { searchData } = req.body;

  if (searchData === undefined || searchData === null) {
    return next(new AppError('missing search data', 400));
  }

  const consult = await consultation.find({ numeroConsultation: searchData });

  if (consult.length !== 0) {
    return searchConsultation(req, res, next, consult);
    //return this.searchConsultation(req, res, next);
  }

  const com = await commande.find({ numeroCommande: searchData });

  if (com.length !== 0) {
    return searchCommande(req, res, next, com);
    // return this.searchCommande(req, res, next);
  }

  const fac = await facture.find({ numeroFacture: searchData });

  if (fac.length !== 0) {
    //return this.searchFacture(req, res, next);

    return searchFacture(req, res, next, fac);
  } else {
    res.status(200).json({
      status: 'success',
      message: 'all ok',
      consultation: [],
      facture: [],
      commande: []
    });
  }
});

// exports.searchCommande = catchAsync(async (req, res, next) => {
//   const { searchData } = req.body;

//   const com = await commande.find({ numeroCommande });

//   //   if (com.length === 0) {
//   //     return next(new AppError('pas trouvé', 403));
//   //   }

//   const consult = await consultation.find({
//     numeroConsultation: com[0].numeroConsultation
//   });
//   const fac = await facture.find({
//     numeroConsultation: com[0].numeroConsultation
//   });

//   res.status(200).json({
//     status: 'success',
//     message: 'all ok',
//     consultation: consult,
//     facture: fac,
//     commande: com
//   });
// });

// exports.searchFacture = catchAsync(async (req, res, next) => {
//   const { searchData } = req.body;

//   const fac = await facture.find({ numeroFacture: searchData });

//   //   if (fac.length === 0) {
//   //     return next(new AppError('pas trouvé', 403));
//   //   }

//   const consult = await consultation.find({
//     numeroConsultation: fac[0].numeroConsultation
//   });
//   const com = await commande.find({
//     numeroConsultation: fac[0].numeroConsultation
//   });

//   res.status(200).json({
//     status: 'success',
//     message: 'all ok',
//     consultation: consult,
//     facture: fac,
//     commande: com
//   });
// });

// exports.searchConsultation = catchAsync(async (req, res, next) => {
//     const { searchData } = req.body;

//     const consult = await consultation.find({ numeroConsultation });

//     //   if (fac.length === 0) {
//     //     return next(new AppError('pas trouvé', 403));
//     //   }

//     const com = await commande.find({ numeroConsultation });
//     const fac = await facture.find({ numeroConsultation });

//     res.status(200).json({
//       status: 'success',
//       message: 'all ok',
//       consultation: consult,
//       facture: fac,
//       commande: com
//     });
//   });
