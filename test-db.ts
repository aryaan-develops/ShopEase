import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    try {
        await prisma.$connect()
        console.log('Successfully connected to MongoDB')
        const productCount = await prisma.product.count()
        console.log(`Connection verified. Found ${productCount} products.`)
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error)
    } finally {
        await prisma.$disconnect()
    }
}

main()
