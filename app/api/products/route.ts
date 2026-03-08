import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
    try {
        const products = await prisma.product.findMany({
            include: {
                vendor: {
                    select: {
                        vendor_name: true
                    }
                }
            }
        })
        return NextResponse.json(products)
    } catch (error) {
        console.error('Failed to fetch products:', error)
        return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 })
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { name, description, price, stock_quantity, product_image, vendor_id } = body

        const product = await prisma.product.create({
            data: {
                name,
                description,
                price: parseFloat(price),
                stock_quantity: parseInt(stock_quantity),
                product_image,
                vendor_id
            }
        })

        return NextResponse.json(product, { status: 201 })
    } catch (error) {
        console.error('Failed to create product:', error)
        return NextResponse.json({ error: 'Failed to create product' }, { status: 500 })
    }
}
