const Joi = require("joi");

const submitFeedback = Joi.object({
    1: Joi.string().valid('bad', 'good', 'normal', 'perfect').required(),
    2: Joi.string().valid('bad', 'good', 'normal', 'perfect').required(),
    3: Joi.string().valid('bad', 'good', 'normal', 'perfect').required(),
    4: Joi.string().valid('bad', 'good', 'normal', 'perfect').required(),
    5: Joi.string().valid('ML', 'ALGORITHM', 'ROBOTICS', 'CRYPTOGRAPHY').required(),
    comment: Joi.string().min(1).max(1000),
});

module.exports = {
    submitFeedback,
};