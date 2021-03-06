import type { NextApiRequest, NextApiResponse } from 'next'

import { ok, notAllow, unauthorized } from '@/utils/response'
import { useUser } from '@/utils/middlewares'

import { createForm, getForms } from '@/controllers/forms'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const user = await useUser(req, res)
  if (!user) return unauthorized(res)

  if (req.method === 'POST') {
    const { variables } = JSON.parse(req.body)
    variables.schema = JSON.parse(variables.schema)
    const form = await createForm({ variables })
    return ok(res, form)
  }
  if (req.method === 'GET') {
    const { q, page, perPage } = req.query as Record<string, string | undefined>
    const forms = await getForms({
      q,
      page: page ? parseInt(page) : 1,
      perPage: perPage ? parseInt(perPage) : 10,
    })
    return ok(res, forms)
  }
  return notAllow(res)
}
