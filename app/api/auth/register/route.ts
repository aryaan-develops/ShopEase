import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, password, role } = body;

        if (!email || !password || !role) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        if (role === "VENDOR") {
            const existingVendor = await prisma.vendor.findUnique({ where: { email } });
            if (existingVendor) return NextResponse.json({ error: "Email already exists" }, { status: 400 });

            // In this schema, Vendor needs an admin_id. 
            // For now, we'll find the first admin or return error if none exists.
            const admin = await prisma.admin.findFirst();
            if (!admin) return NextResponse.json({ error: "No admin found to assign vendor" }, { status: 500 });

            const vendor = await (prisma.vendor as any).create({
                data: {
                    vendor_name: name,
                    email,
                    password: hashedPassword,
                    role: "VENDOR",
                    admin_id: admin.id
                }
            });
            return NextResponse.json(vendor, { status: 201 });
        } else {
            const existingCustomer = await prisma.customer.findUnique({ where: { email } });
            if (existingCustomer) return NextResponse.json({ error: "Email already exists" }, { status: 400 });

            const customer = await (prisma.customer as any).create({
                data: {
                    name,
                    email,
                    password: hashedPassword,
                    role: "CUSTOMER"
                }
            });
            return NextResponse.json(customer, { status: 201 });
        }
    } catch (error) {
        console.error("Registration error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
