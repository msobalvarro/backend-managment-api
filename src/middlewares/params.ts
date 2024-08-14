
import { Request } from 'express'
import { body, check, validationResult } from 'express-validator'
import { ErrorResultProps } from 'interfaces'

export const existErrors = (req: Request): ErrorResultProps => {
  const errors = validationResult(req)
  const existError = errors.array().length > 0

  return {
    error: existError,
    message: existError ? errors.array()[0].msg : null
  }
}

export const createUserValidation = [
  check('name', 'Name is required').notEmpty(),
  check('email', 'Email is required').notEmpty().isEmail(),
  check('password', 'Password is required').notEmpty(),
]

export const updateUserValidation = [
  check('_id', 'ID is required').notEmpty(),
  check('name', 'Name is required').notEmpty(),
  check('email', 'Email is required').notEmpty().isEmail(),
]

export const loginValidationProps = [
  check('password').notEmpty(),
  check('email').notEmpty().isEmail()
]

export const createClientValidationProps = [
  check('name', 'Name is required').notEmpty().isString(),
  check('email', 'Email is required').notEmpty().isEmail(),
  check('phoneNumber', 'Phone Number required').notEmpty().isString(),
  check('documentId', 'Document is required').notEmpty().isString(),
  check('type', 'Client Type Incorrect').isIn(['Company', 'Person']),
]

export const createActivityToDoProps = [
  check('description', 'Description is required').notEmpty().isString(),
]

export const createMultipleBrandsProps = [
  body().isArray().withMessage('data is not an array'),
  body('*.description')
    .isString().withMessage('description is not valid')
    .notEmpty().withMessage('description is not empty')
]

export const createBrandProps = [
  check('description', 'Description is required').isString().exists(),
]

export const createModelProps = [
  check('description', 'Description is required').isString().exists(),
]

export const createStatusProps = [
  check('description', 'Description is required').isString().isEmpty(),
]

export const assignModelToBrandProps = [
  check('modelId', 'Model Id is required').isMongoId(),
  check('brandId', 'Brand Id is required').isMongoId(),
]

export const createVehiculeProps = [
  check('modelId', 'Model Id is required').isMongoId(),
  check('brandId', 'Brand Id is required').isMongoId(),
  check('color', 'Color is required').isString(),
  check('plate', 'Plate is required').isString(),
  check('motorNumber', 'Motor number is required').isString(),
  check('chasisNumber', 'Chasis number is required').isString(),
  check('km', 'kilometers is required').isNumeric(),
  check('year', 'Year is required').isNumeric(),
  check('type', 'Vehicule type is incorrect').isIn(['auto', 'pickup', 'ban', 'truck', 'motorcycle']),
]

export const getVehiculeDetailProps = [
  check('_id', 'Id is required').isMongoId(),
]

export const createDiagnosticProps = [
  check('clientId', 'Client Id is required').isMongoId(),
  check('vehiculeId', 'vehicule Id is required').isMongoId(),
  check('unitStatus.onlyDiagnosis', 'Unit Status fields is incorrect').isBoolean(),
  check('unitStatus.improvisedSolution', 'Unit Status fields is incorrect').isBoolean(),
  check('unitStatus.definitiveSolution', 'Unit Status fields is incorrect').isBoolean(),
  check('unitStatus.transferSolution', 'Unit Status fields is incorrect').isBoolean(),
  check('previousCheck.description', 'Previous check description is incorrect').isArray(),
  check('checksDone.description', 'Checks done description prop is required').isArray(),
  check('checksDone.isComponent', 'Checks done component prop is required').isBoolean(),
  check('checksDone.isMecanism', 'Checks done mecanism prop is required').isBoolean(),
  check('checksDone.isKOEO', 'Checks done isKOEO prop is required').isBoolean(),
  check('checksDone.isKOER', 'Checks done isKOER prop is required').isBoolean(),
  check('checksDone.onRoad', 'Checks done onRoad prop is required').isBoolean(),
  check('recommendations.activities.*.description', 'Recommendations is required').isString(),
  check('activityType.isReactivate', 'Activity type reactivate prop is required').isBoolean(),
  check('activityType.isRestore', 'Activity type restore prop is required').isBoolean(),
  check('activityType.isPreventive', 'Activity type preventive prop is required').isBoolean(),
  check('activityType.isCorrective', 'Activity type corrective prop is required').isBoolean(),
]

export const getDiagnosticProps = [
  check('_id', 'Id is required').isMongoId(),
]

export const createEstimateProps = [
  check('clientId', 'Client Id is required').isMongoId(),
  check('vehiculeId', 'vehicule Id is required').isMongoId(),
  check('activitiesToDo.isService', 'Activity service prop is incorrect').isBoolean(),
  check('activitiesToDo.isMaintenance', 'Activity maintenance prop is incorrect').isBoolean(),
  check('activitiesToDo.isMinorTypeService', 'Activity type service prop is incorrect').isBoolean(),
  check('activitiesToDo.activities', 'Activity list prop is incorrect').isArray(),
  check('activitiesToDo.activities.*.description', 'Activity list description prop is incorrect').isString(),
  check('requiredParts', 'Require part list prop is incorrect').isArray(),
  check('requiredParts.*.description', 'Require part list description prop is incorrect').isString(),
  check('otherRequirements', 'Other requirements list prop is incorrect').isArray(),
  check('otherRequirements.*.description', 'Require part list description prop is incorrect').isString(),
  check('laborCost', 'Labor cost prop is incorrect').isNumeric(),
  check('partsCost', 'Part cost prop is incorrect').isNumeric(),
  check('inputCost', 'Input cost prop is incorrect').isNumeric(),
  check('total', 'Total cost prop is incorrect').isNumeric(),
]
