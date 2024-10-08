import { Schema, Types, model } from 'mongoose'
import { DistanceTraveledPropierties, Vehicule, VehiculeBrands, VehiculeModel } from '../interfaces'

const vehiculeSchema = new Schema<Vehicule>(
  {
    color: {
      type: String,
      required: true,
    },
    motorNumber: {
      type: String,
      unique: true,
      required: true,
    },
    chasisNumber: {
      type: String,
      unique: true,
      required: true,
    },
    km: {
      type: Number,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    plate: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ['auto', 'pickup', 'ban', 'truck', 'motorcycle'],
      default: 'auto',
      required: true,
    },
    model: {
      type: Schema.Types.ObjectId,
      ref: 'vehiculeModel',
      required: true,
    },
    brand: {
      type: Schema.Types.ObjectId,
      ref: 'vehiculeBrand',
      required: true,
    },
    workshop: { type: Types.ObjectId, ref: 'workshop' },
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

const vehiculeBrandSchema = new Schema<VehiculeBrands>(
  {
    description: {
      type: String,
      unique: true,
    },
    models: [{
      type: Types.ObjectId,
      ref: 'vehiculeModel',
    }]
  },
  {
    timestamps: false,
    versionKey: false,
  }
)


const vehiculeModelSchema = new Schema<VehiculeModel>(
  {
    description: {
      type: String
    },
  },
  {
    timestamps: false,
    versionKey: false,
  }
)

const distanceTraveled = new Schema<DistanceTraveledPropierties>(
  {
    distance: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      enum: ['km', 'miles'],
      default: 'km',
      required: true,
    },
  },
  {
    timestamps: false,
    versionKey: false,
  }
)

export const vehiculeModel = model('vehicule', vehiculeSchema)
export const vehiculeBrandModel = model('vehiculeBrand', vehiculeBrandSchema)
export const vehiculeDistanceModel = model('vehiculeDistance', distanceTraveled)
export const vehiculeCustomModel = model('vehiculeModel', vehiculeModelSchema)