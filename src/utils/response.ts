import { NextApiResponse } from 'next'

// a set of functions to handle the response

export function ok<T>(res: NextApiResponse, data: T) {
  return res.status(200).json(data)
}

export function error(res: NextApiResponse, message = 'Server Error') {
  return res.status(500).end(message)
}

export function notFound(res: NextApiResponse) {
  return res.status(404).end()
}

export function badRequest(res: NextApiResponse, message = 'Bad Request') {
  return res.status(400).end(message)
}

export function unauthorized(res: NextApiResponse, message = 'Unauthorized') {
  return res.status(401).end(message)
}

export function forbidden(res: NextApiResponse, message = 'Forbidden') {
  return res.status(403).end(message)
}

export function notAllow(res: NextApiResponse, message = 'Method Not Allowed') {
  return res.status(405).end(message)
}
