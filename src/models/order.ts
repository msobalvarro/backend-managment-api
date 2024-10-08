import { Schema, Types, model } from 'mongoose'
import {
  AcivitiesProperties,
  AttentionsProperties,
  OrderServicePropierties,
  PreliminaryManagementProperties,
  ServicesTypesToDoOrderProperties
} from 'interfaces'


const atentionType = new Schema<AttentionsProperties>(
  {
    isExpress: Boolean,
    isHome: Boolean,
    isLocal: Boolean,
    isRescue: Boolean,
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

const preliminarManagment = new Schema<PreliminaryManagementProperties>(
  {
    isDiagnosed: Boolean,
    isKOEO: Boolean,
    isKOER: Boolean,
    isProven: Boolean,
    onRoad: Boolean,
    parked: Boolean,
  },
  {
    timestamps: true,
    versionKey: false,
  },
)

const serviceType = new Schema<ServicesTypesToDoOrderProperties>(
  {
    isElectrict: Boolean,
    isElectroMecanic: Boolean,
    isElectronic: Boolean,
    isExternal: Boolean,
    isMecanic: Boolean,
    isMultiple: Boolean,
  },
  {
    timestamps: true,
    versionKey: false,
  },
)

const typesActivitiesToDo = new Schema<AcivitiesProperties>(
  {
    isCorrective: Boolean,
    isMaintenance: Boolean,
    isMinorMantenance: Boolean,
    isMajorMantenance: Boolean,
    isPredictive: Boolean,
    isPreventive: Boolean,
    isService: Boolean,
  },
  {
    timestamps: true,
    versionKey: false,
  },
)

const orderService = new Schema<OrderServicePropierties>(
  {
    attentionType: { type: Types.ObjectId, ref: 'atentionsTypes' },
    estimateProps: { type: Types.ObjectId, ref: 'estimatedCosts' },
    preliminarManagment: { type: Types.ObjectId, ref: 'preliminarManagmentOrder' },
    serviceType: { type: Types.ObjectId, ref: 'serviceType' },
    typesActivitiesToDo: { type: Types.ObjectId, ref: 'typesActivitiesToDo' },
    additionalTask: [{ type: Types.ObjectId, ref: 'itemWithCostEstimatedField' }],
    traveled: { type: Types.ObjectId, ref: 'vehiculeDistance' },
    resume: String,
    findings: [String],
    observations: [String],
    workshop: { type: Types.ObjectId, ref: 'workshop' },
    estimationDate: Date,
    status: {
      type: String,
      enum: ['pending', 'process', 'finished', 'canceled'],
      default: 'process',
      required: true
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

export const AtentionsTypesModel = model('atentionsTypes', atentionType)
export const PreliminarManagmentModel = model('preliminarManagmentOrder', preliminarManagment)
export const TypesActivitiesToDoModel = model('typesActivitiesToDo', typesActivitiesToDo)
export const ServiceTypeOrderModel = model('serviceType', serviceType)
export const OrderServiceModel = model('orderService', orderService)