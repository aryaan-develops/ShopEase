const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
    const product = await prisma.product.findFirst()
    const customer = await prisma.customer.findFirst()

    if (product && customer) {
        await prisma.review.create({
            data: {
                product_id: product.id,
                customer_id: customer.id,
                rating: 5,
                comment: "Absolutely stunning quality. The fabric feels amazing and the fit is perfect. Highly recommend for anyone looking for luxury staples."
            }
        })
        console.log("Seed review created!")
    } else {
        console.log("Product or Customer not found for seeding reviews.")
    }
}

main()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect())
