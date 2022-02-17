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
    const { variables } = req.body
    const form = await updateForm({ id: formId, variables })
    return ok(res, { form })
  }
  if (req.method === 'DELETE') {
    const forms = await deleteForm({ id: formId })
    return ok(res, { forms })
  }
}
