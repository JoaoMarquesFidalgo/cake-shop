import { typesOfValue } from 'src/enum/typesValues'
import { zoneError, generalError } from '@utils/errorMessage'
import { Request, Response } from 'express'
import { ZoneModel, Zone } from '@models/Zone'
import { zoneSuccess } from '@utils/successMessage'
import { handlePostPromise, handleGetPromise, handleDeletePromise, handleGetOnePromise, handleUpdatePromise } from '@utils/handlePromise'
import { verifyObjectId } from '@utils/verifyObjectId'
import { sanitizeValidateValue } from '@utils/sanitizeValues'

function addZone (req: Request, res: Response): void {
  handlePostPromise(createZoneAsync, req, res, zoneSuccess['4000'], zoneError['4000'], Zone)
}

async function createZoneAsync (zone: Zone): Promise<Zone> {
  if (!zone.name) {
    throw zoneError['4006']
  }
  if (!verifyZoneFields(zone)) {
    throw generalError['801']
  }

  const { _id: id } = await ZoneModel.create(zone)
  return await ZoneModel.findById(id).exec()
}

function getZones (req: Request, res: Response) {
  handleGetPromise(getZonesAsync, res, zoneSuccess['4001'], zoneError['4001'], Zone)
}

async function getZonesAsync (): Promise<Zone[]> {
  return await ZoneModel.find().exec()
}

function deleteZone (req: Request, res: Response) {
  handleDeletePromise(req.params.id, deleteZoneAsync, res, zoneSuccess['4002'], zoneError['4002'], Zone)
}

async function deleteZoneAsync (id: string): Promise<Zone> {
  if (!verifyObjectId(id)) {
    throw generalError['800']
  }

  const deleted = await ZoneModel.findOneAndDelete({ _id: id }).exec()
  if (!deleted) {
    throw zoneError['4002']
  }
  return deleted
}

function getOneZone (req: Request, res: Response) {
  handleGetOnePromise(req.params.id, getOneZoneAsync, res, zoneSuccess['4003'], zoneError['4003'], Zone)
}

async function getOneZoneAsync (id: string): Promise<Zone> {
  if (!verifyObjectId(id)) {
    throw generalError['800']
  }

  const getOneZone = await ZoneModel.findById(id).exec()
  if (!getOneZone) {
    throw zoneError['4003']
  }
  return getOneZone
}

function updateOneZone (req: Request, res: Response) {
  handleUpdatePromise(req.params.id, updateOneZoneTypeAsync, req, res, zoneSuccess['4004'], zoneError['4004'], Zone)
}

async function updateOneZoneTypeAsync (id: string, zone: Zone): Promise<Zone> {
  if (!verifyObjectId(id)) {
    throw generalError['800']
  }
  if (Object.keys(zone).length === 0) {
    throw zoneError['4005']
  }
  if (!zone.name) {
    throw zoneError['4006']
  }
  if (!verifyZoneFields(zone)) {
    throw generalError['801']
  }

  const getOneZone = await ZoneModel.findByIdAndUpdate(id, zone, { new: true }).exec()
  if (!getOneZone) {
    throw zoneError['4004']
  }
  return getOneZone
}

function verifyZoneFields (zone: Zone): boolean {
  const validJSON = sanitizeValidateValue(typesOfValue.JSON, JSON.stringify(zone))
  if (!validJSON) return false
  const validName = sanitizeValidateValue(typesOfValue.WORD, zone.name)
  if (!validName) return false
  return true
}

export { addZone, getZones, deleteZone, getOneZone, updateOneZone }