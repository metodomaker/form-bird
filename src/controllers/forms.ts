import type { Prisma } from '@prisma/client'

import prisma from '@/utils/prisma'

export type CreateFormInput = {
  userId: string
  variables: Prisma.FormCreateInput
}

export const createForm = async ({ userId, variables }: CreateFormInput) => {
  const form = await prisma.form.create({
    data: {
      ...variables,
      user: { connect: { id: userId } },
    },
  })
  return form
}

export type UpdateFormInput = {
  id: string
  variables: Prisma.FormUpdateInput
}

export const updateForm = async ({ id, variables }: UpdateFormInput) => {
  const form = await prisma.form.update({
    where: { id },
    data: { ...variables },
  })
  return form
}

export type DeleteFormInput = {
  id: string
}

export const deleteForm = async ({ id }: DeleteFormInput) => {
  const form = await prisma.form.delete({
    where: { id },
  })
  return form
}

export type GetFormInput = {
  id: string
}

export const getForm = async ({ id }: GetFormInput) => {
  const form = await prisma.form.findUnique({
    where: { id },
  })
  return form
}

// get form by user id, also support pagination and search by tag name
type GetFormsInput = {
  userId: string
  q?: string
  page?: number
  perPage?: number
}

export const getForms = async ({ userId, q, page, perPage }: GetFormsInput) => {
  const forms = await prisma.form.findMany({
    where: {
      user: { id: userId },
      name: {
        contains: q,
      },
    },
    skip: (page - 1) * perPage,
    take: perPage,
  })
  return forms
}
