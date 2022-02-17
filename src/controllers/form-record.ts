import { Prisma } from '@prisma/client'

import prisma from '@/utils/prisma'

type CreateFormRecordInput = {
  variables: Prisma.FormRecordCreateInput
}

export const createFormRecord = async ({
  variables,
}: CreateFormRecordInput) => {
  const formRecord = await prisma.formRecord.create({ data: { ...variables } })
  return formRecord
}

type UpdateFormRecordInput = {
  id: string
  variables: Prisma.FormRecordUpdateInput
}

export const updateFormRecord = async ({
  id,
  variables,
}: UpdateFormRecordInput) => {
  const formRecord = await prisma.formRecord.update({
    where: { id },
    data: { ...variables },
  })
  return formRecord
}

type DeleteFormRecordInput = {
  id: string
}

export const deleteFormRecord = async ({ id }: DeleteFormRecordInput) => {
  const formRecord = await prisma.formRecord.delete({ where: { id } })
  return formRecord
}

// get form records by form id, also support pagination
type GetFormRecordsInput = {
  formId: string
  page?: number
  perPage?: number
}

export const getFormRecords = async ({
  formId,
  page,
  perPage,
}: GetFormRecordsInput) => {
  const formRecords = await prisma.formRecord.findMany({
    where: { formId },
    skip: (page - 1) * perPage,
    take: perPage,
  })
  return formRecords
}
