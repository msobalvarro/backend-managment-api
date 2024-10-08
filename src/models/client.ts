import { Schema, Types, model } from 'mongoose'
import { Client } from '../interfaces'

const clientSchema = new Schema<Client>(
  {
    name: String,
    type: {
      type: String,
      enum: ['company', 'person'],
      default: 'person',
    },
    email: String,
    phoneNumber: String,
    documentId: String,
    vehicules: [{
      type: Types.ObjectId,
      ref: 'vehicule'
    }],
    workshop: { type: Types.ObjectId, ref: 'workshop' },
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

export const ClientModel = model('client', clientSchema)