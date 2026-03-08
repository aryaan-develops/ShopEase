import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
    try {
        const [totalOrders, totalRevenue, recentOrders, totalProducts] = await Promise.all([
            prisma.order.count(),
            prisma.order.aggregate({ _sum: { order_amount: true } }),
            prisma.order.findMany({
                take: 5,
                orderBy: { order_date: 'desc' },
                include: { customer: { select: { name: true } } }
            }),
            prisma.product.count()
        ])

        return NextResponse.json({
            totalOrders,
            revenue: totalRevenue._sum.order_amount || 0,
            totalProducts,
            recentOrders
        })
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch admin stats' }, { status: 500 })
    }
}
