const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const BedRequestError = require('../errors/BedRequestError');

const validatorUrl = (url) => {
  if (!validator.isURL(url)) {
    throw new BedRequestError('Невалидный URL');
  }
  return url;
};

const userIdValidator = Joi.string().required().hex().length(24);

const urlValidator = Joi.string().required().custom(validatorUrl);

const usernameValidator = Joi.string().min(2).max(30).required();

const userInfoValidator = Joi.string().min(2).max(30);

const passwordValidator = Joi.string().min(8).required();

const validationCreateUser = celebrate({
  body: Joi.object().keys({
    name: usernameValidator,
    about: userInfoValidator,
    avatar: urlValidator,
    email: Joi.string().required().email(),
    password: passwordValidator,
  }),
});

const validationLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: passwordValidator,
  }),
});

const validationUserId = celebrate({
  params: Joi.object().keys({
    userId: userIdValidator,
  }),
});

const validationPatchProfile = celebrate({
  body: Joi.object().keys({
    name: usernameValidator,
    about: userInfoValidator,
  }),
});

const validationPatchAvatar = celebrate({
  body: Joi.object().keys({
    avatar: urlValidator,
  }),
});

const validationCreateCard = celebrate({
  body: Joi.object().keys({
    name: usernameValidator,
    link: urlValidator,
  }),
});

const validationCardId = celebrate({
  params: Joi.object().keys({
    cardId: userIdValidator,
  }),
});

module.exports = {
  validationCreateUser,
  validationLogin,
  validationUserId,
  validationPatchProfile,
  validationPatchAvatar,
  validationCreateCard,
  validationCardId,
};
