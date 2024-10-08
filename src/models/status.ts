import { Schema, model } from 'mongoose'
import { Status } from '../interfaces'

const statusSchema = new Schema<Status>(
  {
    description: String
  },
  {
    timestamps: false,
    versionKey: false,
  }
)

// global status
export const StatusModel = model('status', statusSchema)
