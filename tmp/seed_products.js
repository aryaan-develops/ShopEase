const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
    // 1. Ensure we have an Admin
    let admin = await prisma.admin.findFirst()
    if (!admin) {
        admin = await prisma.admin.create({
            data: {
                name: "ShopEase Admin",
                email: "admin@shopease.com",
                password: "adminpassword123", // In real world use bcrypt
            }
        })
    }

    // 2. Ensure we have a vendor linked to the Admin
    let vendor = await prisma.vendor.findFirst()
    if (!vendor) {
        vendor = await prisma.vendor.create({
            data: {
                vendor_name: "Atelier Mixtas",
                email: "atelier@shopease.com",
                password: "hashedpassword123",
                admin_id: admin.id
            }
        })
    }

    const products = [
        {
            name: "Minimalist Wool Overcoat",
            description: "Crafted from ethically sourced 100% Merino wool, this overcoat features sharp tailoring and a clean silhouette. Designed for timeless elegance in colder months.",
            price: 1250.00,
            stock_quantity: 15,
            product_image: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&q=80&w=800",
            vendor_id: vendor.id,
            admin_id: admin.id
        },
        {
            name: "Silk Palazzo Trousers",
            description: "Fluid and ethereal, these palazzo trousers are made from heavy-weight mulberry silk. Features a high-waist fit and hidden side pockets.",
            price: 440.00,
            stock_quantity: 25,
            product_image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&q=80&w=800",
            vendor_id: vendor.id,
            admin_id: admin.id
        },
        {
            name: "Signature Leather Tote",
            description: "A masterclass in functional minimalism. This tote is handcrafted from full-grain Italian leather that ages beautifully over time. Includes an internal laptop sleeve.",
            price: 890.00,
            stock_quantity: 10,
            product_image: "https://images.unsplash.com/photo-1544816153-12ad7f85890e?auto=format&fit=crop&q=80&w=800",
            vendor_id: vendor.id,
            admin_id: admin.id
        },
        {
            name: "Structured Blazer Noir",
            description: "An essential piece for the modern wardrobe. This blazer features architectural shoulders and a cinched waist for a sharp, powerful silhouette.",
            price: 950.00,
            stock_quantity: 12,
            product_image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=800",
            vendor_id: vendor.id,
            admin_id: admin.id
        },
        {
            name: "Cashmere Turtleneck",
            description: "Unrivaled softness. Our turtleneck is knitted from 100% premium Mongolian cashmere. A luxurious staple that offers warmth without bulk.",
            price: 320.00,
            stock_quantity: 30,
            product_image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80&w=800",
            vendor_id: vendor.id,
            admin_id: admin.id
        },
        {
            name: "Chelsea Boots in Suede",
            description: "The perfect balance of rugged and refined. Built on a Goodyear welt construction with water-resistant Italian suede.",
            price: 550.00,
            stock_quantity: 20,
            product_image: "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?auto=format&fit=crop&q=80&w=800",
            vendor_id: vendor.id,
            admin_id: admin.id
        }
    ]

    for (const productData of products) {
        await prisma.product.create({
            data: productData
        })
    }

    console.log("Successfully seeded admin, vendor, and 6 premium products.")
}

main()
    .catch(e => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
