import type { Prisma } from '@prisma/client'

import prisma from '@/utils/prisma'

type CreateTagInput = {
  variables: Prisma.TagCreateInput
}

export const createTag = async ({ variables }: CreateTagInput) => {
  const tag = await prisma.tag.create({ data: { ...variables } })
  return tag
}

type UpdateTagInput = {
  id: number
  variables: Prisma.TagUpdateInput
}

export const updateTag = async ({ id, variables }: UpdateTagInput) => {
  const tag = await prisma.tag.update({
    where: { id },
    data: { ...variables },
  })
  return tag
}

type DeleteTagInput = {
  id: number
}

export const deleteTag = async ({ id }: DeleteTagInput) => {
  const tag = await prisma.tag.delete({ where: { id } })
  return tag
}

type GetTagInput = {
  id: number
}

export const getTag = async ({ id }: GetTagInput) => {
  const tag = await prisma.tag.findUnique({ where: { id } })
  return tag
}

type GetTagsInput = {
  q?: string
  page?: number
  perPage?: number
}

export const getTags = async ({ q, page, perPage }: GetTagsInput) => {
  const tags = await prisma.tag.findMany({
    where: { name: q },
    skip: (page - 1) * perPage,
    take: perPage,
  })
  return tags
}
