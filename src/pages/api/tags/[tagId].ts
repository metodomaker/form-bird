import type { NextApiRequest, NextApiResponse } from 'next'

import { ok, unauthorized } from '@/utils/response'
import { useUser } from '@/utils/middlewares'

import { updateTag, deleteTag } from '@/controllers/tags'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const user = await useUser(req, res)
  if (!user) return unauthorized(res)

  const { tagId } = req.query as Record<string, string>

  if (req.method === 'PUT') {
    const { variables } = req.body
    const tag = await updateTag({ id: parseInt(tagId), variables })
    return ok(res, tag)
  }
  if (req.method === 'DELETE') {
    const tag = await deleteTag({ id: parseInt(tagId) })
    return ok(res, tag)
  }
}
