import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions)
        if (!session || !session.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const { product_id, rating, comment } = await request.json()

        if (!product_id || !rating || !comment) {
            return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
        }

        // Ensure user is matching a customer
        const customer = await prisma.customer.findUnique({
            where: { email: session.user.email! }
        })

        if (!customer) {
            return NextResponse.json({ error: 'Only customers can leave reviews' }, { status: 403 })
        }

        const review = await (prisma.review as any).create({
            data: {
                product_id,
                customer_id: customer.id,
                rating: Number(rating),
                comment
            }
        })

        return NextResponse.json(review, { status: 201 })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: 'Failed to post review' }, { status: 500 })
    }
}
