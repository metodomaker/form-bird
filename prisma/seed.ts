import { PrismaClient } from '@prisma/client'
import { hash } from 'argon2'
import dotenv from 'dotenv'

dotenv.config()

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
