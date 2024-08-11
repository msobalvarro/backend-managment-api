import { Types } from 'mongoose'

export interface User {
  __id?: Types.ObjectId;
  uuid?: string;
  email: string;
  password?: string;
}

export enum ErrosList {
  CONNECTION_ERROR = 'CONNECTION_ERROR',
  PARAMS_VALIDATION_ERROR = 'PARAMS_VALIDATION_ERROR',
  CREATE_USER_ERROR = 'CREATE_USER_ERROR',
  IMPORT_MODULE_ERROR = 'IMPORT_MODULE_ERROR',
}

export interface GenerateErrorProps {
  message: string;
  type: ErrosList;
}

export interface ErrorResultProps {
  error: boolean
  message?: string
}
