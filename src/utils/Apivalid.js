import validator from  'validator'
export const isemailvalid= (email)=>validator.isEmail(email);
export const ispasswordvaild = (password)=> validator.isStrongPassword(password)

