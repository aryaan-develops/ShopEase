import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const {
            items,
            customer_id,
            total_amount,
            payment_method,
            card_details
        } = body

        // 1. Create the Order
        const order = await prisma.order.create({
            data: {
                order_amount: total_amount,
                customer_id: customer_id || "65e8a4b8e4b0a1a2b3c4d5e7", // Placeholder Customer ID
                order_status: "PAID",
                orderItems: {
                    create: items.map((item: any) => ({
                        product_id: item.id,
                        quantity: item.quantity,
                        price: item.price
                    }))
                }
            }
        })

        // 2. Create the Bill
        const bill = await prisma.bill.create({
            data: {
                total_amount: total_amount,
                tax_amount: total_amount * 0.1, // 10% mock tax
                discount_amount: 0,
                shipping_charge: 0,
                payment_method,
                bill_status: "PAID",
                order_id: order.id
            }
        })

        // 3. Create the Payment
        const payment = await prisma.payment.create({
            data: {
                amount: total_amount,
                payment_method,
                transaction_id: `txn_${Math.random().toString(36).substr(2, 9)}`,
                payment_status: "SUCCESS",
                bill_id: bill.id,
                // Mock card storage (Don't do this in production!)
                card_no: card_details?.number?.slice(-4),
                cvv: "xxx",
                expiry_date: card_details?.expiry
            }
        })

        // 4. Create the Receipt
        const receipt = await prisma.receipt.create({
            data: {
                payment_id: payment.id
            }
        })

        return NextResponse.json({
            success: true,
            orderId: order.id,
            receiptId: receipt.id
        })
    } catch (error) {
        console.error('Checkout failed:', error)
        return NextResponse.json({ error: 'Checkout failed' }, { status: 500 })
    }
}
