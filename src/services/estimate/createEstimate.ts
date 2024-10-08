import mongoose, { Types } from 'mongoose'
import { CreateEstimatedError } from 'errors'
import { EstimateParamsPropierties, EstimatePropierties } from 'interfaces'
import { getClientByIdService } from 'services/client/getClient'
import { getVehiculeByIdService } from 'services/vehicule/getVehicule'
import { EstimateModel, ItemWithCostEstimatedFieldModel } from 'models/estimate'
import { vehiculeDistanceModel } from 'models/vehicule'
import { ActivitiesGroupModel } from 'models/groups'
import { WorkshopModel } from 'models/workshop'

export const createEstimateService = async (estimate: EstimateParamsPropierties, workshopId: Types.ObjectId): Promise<EstimatePropierties> => {
  const session = await mongoose.startSession()
  session.startTransaction()
  try {
    const vehicule = await getVehiculeByIdService(estimate.vehiculeId)
    if (!vehicule) {
      throw new CreateEstimatedError('Vehicule not found')
    }

    const client = await getClientByIdService(estimate.clientId)
    if (!client) {
      throw new CreateEstimatedError('Client not found')
    }
    
    const workshop = await WorkshopModel.findById(workshopId)
    if (!workshop) { 
      throw new CreateEstimatedError('Workshop not found')
    }

    const activitiesToDo = await estimate.activitiesToDo.map(a => new ItemWithCostEstimatedFieldModel(a))
    const requiredParts = await estimate.requiredParts.map(a => new ItemWithCostEstimatedFieldModel(a))
    const otherRequirements = await estimate.otherRequirements.map(a => new ItemWithCostEstimatedFieldModel(a))
    const externalActivities = await estimate.externalActivities.map(a => new ItemWithCostEstimatedFieldModel(a))
    const traveled = new vehiculeDistanceModel(estimate.traveled)
    const activitiesGroup = await ActivitiesGroupModel.findById(estimate.activitiesGroupId)
    const { inputCost, laborCost, partsCost, total, externalCost, activitiesGroupCost } = estimate

    const estimateCreated = new EstimateModel({
      activitiesToDo,
      client,
      inputCost,
      laborCost,
      otherRequirements,
      requiredParts,
      partsCost,
      externalCost,
      total,
      vehicule,
      externalActivities,
      traveled,
      activitiesGroup,
      activitiesGroupCost,
      workshop
    })

    activitiesToDo.map(e => e.save({ session }))
    requiredParts.map(e => e.save({ session }))
    otherRequirements.map(e => e.save({ session }))
    externalActivities.map(e => e.save({ session }))
    traveled.save({ session })
    estimateCreated.save({ session })

    await session.commitTransaction()
    return estimateCreated
  } catch (error) {
    await session.abortTransaction()
    throw new CreateEstimatedError(String(error))
  } finally {
    session.endSession()
  }
}
