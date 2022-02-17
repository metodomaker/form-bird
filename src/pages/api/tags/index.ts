import type { NextApiRequest, NextApiResponse } from 'next'

import { ok, unauthorized } from '@/utils/response'
import { useUser } from '@/utils/middlewares'

import { createTag, getTags } from '@/controllers/tags'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const user = await useUser(req, res)
  if (!user) return unauthorized(res)

  if (req.method === 'POST') {
    const { variables } = req.body
    const tag = await createTag({ variables })
    return ok(res, { tag })
  }
  if (req.method === 'GET') {
    const { page, perPage } = req.query as Record<string, string | undefined>
    const tags = await getTags({
      page: page ? parseInt(page) : 1,
      perPage: perPage ? parseInt(perPage) : 10,
    })
    return ok(res, { tags })
  }
}
