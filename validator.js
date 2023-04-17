const joi=require('@hapi/joi');

const registrationValidate=(data)=>{
 const registrationSchema = joi.object({
   username:joi.string().min(3).required(),
   email:joi.string().email().min(8).max(100).required(),
   password:joi.string().min(6).required()
    })
 return   registrationSchema.validate(data);
}
const loginValidate=(data)=>{
 const loginSchema = joi.object({
   email:joi.string().email().min(8).max(100).required(),
   password:joi.string().min(6).max(100).required()
    })
 return   loginSchema.validate(data);
}

module.exports={registrationValidate,loginValidate};
// module.exports.registrationValidate=registrationValidate;
// module.exports.loginValidate=loginValidate;