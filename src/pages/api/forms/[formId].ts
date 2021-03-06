import type { NextApiRequest, NextApiResponse } from 'next'

import { ok, unauthorized } from '@/utils/response'
import { useUser } from '@/utils/middlewares'

import { updateForm, deleteForm } from '@/controllers/forms'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const user = await useUser(req, res)
  if (!user) return unauthorized(res)

  const { formId } = req.query as Record<string, string>

  if (req.method === 'PUT') {
    const { variables } = JSON.parse(req.body)
    variables.schema = JSON.parse(variables.schema)
    const form = await updateForm({ id: formId, variables })
    return ok(res, form)
  }
  if (req.method === 'DELETE') {
    const form = await deleteForm({ id: formId })
    return ok(res, form)
  }
}
