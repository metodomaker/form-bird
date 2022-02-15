import { PrismaClient } from '@prisma/client'
import { hash } from 'argon2'
import path from 'path'
import * as dotenv from 'dotenv'

dotenv.config({
  path: path.join(process.cwd(), '.env'),
})

if (!process.env.ADMINSTOR_MAIL) throw new Error('ADMINSTOR_MAIL is not set')
if (!process.env.ADMINSTOR_PASS) throw new Error('ADMINSTOR_PASS is not set')

const prisma = new PrismaClient()

export async function main() {
  try {
    console.log(`Start seeding ...`)

    const user = await prisma.user.create({
      data: {
        email: process.env.ADMINSTOR_MAIL,
        password: await hash(process.env.ADMINSTOR_PASS),
        bio: 'Administor',
        isAdmin: true,
      },
    })

    console.log(`Created administor with email: ${user.email}`)

    console.log(`Seeding finished.`)
  } catch (err) {
    console.error(err)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

main()
