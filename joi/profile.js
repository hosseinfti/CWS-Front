const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const editProfile = Joi.object({
  firstName: Joi.string().min(1).max(50),
  lastName: Joi.string().min(1).max(50),
  age: Joi.number().min(1).max(150),
  address: Joi.string().min(1).max(1000),
  employmentStatus: Joi.string().min(1).max(1000), // TODO: ask for enum
  workExperience: Joi.string().min(1).max(1000),
  universityOfStudy: Joi.string().min(1).max(1000), // TODO: ASK FOR ENUM
  lastEducationalCertificate: Joi.string().min(1).max(1000), // TODO: ASK FOR ENUM
  technicalSkills: Joi.string().min(1).max(1000), // TODO: ASK FOR ENUM
  softwareSkills: Joi.string().min(1).max(1000), // TODO: ASK FOR ENUM
  languages: Joi.string().min(1).max(1000), // TODO: ASK FOR ENUM
  experienceAttendingCompetitions: Joi.string().min(1).max(1000),
  // skills: Joi.array()
  //   .items(
  //     Joi.string().valid("s1", "s2", "s3", "s4", "s5")
  //   )
  //   .unique((a, b) => a === b),
});

module.exports = {
  editProfile,
};
