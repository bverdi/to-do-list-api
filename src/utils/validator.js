var Validator = require('jsonschema').Validator;
const responseHelper = require('../helpers/response.error.helper');


const _buildResponseErrorMessage = (errors) =>{
  // eslint-disable-next-line no-unused-vars
  let responseMessage;
  for (let i = 0; i < errors.length; i++) {
    const error = errors[i];
    
    if(error.property == 'instance'){
      responseMessage += error.message.replace(/"/g,'');
    }else{
      error.property = error.property.replace('instance.', '');
      responseMessage += `${error.property} ${error.message.replace(/"/g,'')}`;
    }
    if (i < errors.length - 1){
      responseMessage += ' || ';
    }
  }
  return responseHelper.returnError('400_bad_request_body', 404);
};

const _validate = (schema, jsonObject) => {
  const validatorInstance   = new Validator();
  const validatorResult     = validatorInstance.validate(jsonObject, schema);

  if (validatorResult.errors.length > 0) {
    _buildResponseErrorMessage(validatorResult.errors);
  }

  return validatorResult.instance;
};

const validateBody = (schema, body) => {
  return _validate(schema, JSON.parse(body));
};

module.exports = {
  validateBody,
};