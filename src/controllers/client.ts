import { Request, Response } from 'express'
import { getAllClientById, getAllClients } from 'services/getClient'
import { Client } from 'interfaces'
import { createClient } from 'services/createClient'
import { existErrors } from 'middlewares/params'
import { CreateClientError } from 'errors'

export const getAllClientsController = async (__: Request, res: Response) => {
  try {
    const data = await getAllClients()
    res.send(data)
  } catch (error) {
    res.status(500).send(`${error}`)
  }
}

export const getClientById = async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id
    const data = await getAllClientById(id)
    res.send(data)
  } catch (error) {
    res.status(500).send(`${error}`)
  }
}

export const createClientController = async (req: Request, res: Response) => {
  try {
    const { error, message } = existErrors(req)
    if (error) {      
      throw new CreateClientError(`${message}`)
    }

    const dataParams: Client = req.body
    const dataCreated = await createClient(dataParams)
    res.send(dataCreated)
  } catch (error) {
    res.status(500).send(`${error}`)
  }
}