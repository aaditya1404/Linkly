import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
    try {
        const { userName, userEmail, userPassword } = await request.json();

        // Checking is the user already exists and is verified
        const existingUserVerifiedByUsername = await prisma.user.findUnique({
            where: {
                userName,
                isVerified: true
            }
        });
        if (existingUserVerifiedByUsername) {
            return NextResponse.json({
                success: false,
                message: "User already exists"
            }, { status: 400 });
        }

        const existingUserByEmail = await prisma.user.findUnique({
            where: {
                userName
            }
        });
        const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
        // Checking if the user already exists with the email.
        if (existingUserByEmail) {
            // Checking if the user email is verified
            if (existingUserByEmail.isVerified) {
                return NextResponse.json({
                    success: false,
                    message: "User already exists with this Email"
                }, { status: 400 });
            } else {
                // If user email is not verified save that user
                const hashedPassword = await bcrypt.hash(userPassword, 10);
                await prisma.user.update({
                    where: { userEmail: existingUserByEmail.userEmail },
                    data: {
                        userPassword: hashedPassword,
                        verifyCode: verifyCode,
                        verifyCodeExpiry: new Date(Date.now() + 3600000)
                    }
                });
            }
        } else {
            const hashedPassword = await bcrypt.hash(userPassword, 10);
            const expiryDate = new Date();
            expiryDate.setHours(expiryDate.getHours() + 1);
            const newUser = await prisma.user.create({
                data: {
                    userName,
                    userEmail,
                    userPassword: hashedPassword,
                    isVerified: false,
                    verifyCode,
                    verifyCodeExpiry: expiryDate
                }
            });
            return NextResponse.json({
                success: true,
                message: "New User Created",
                newUser
            }, { status: 200 });
        }
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "Error creating user",
            error
        }, { status: 500 });
    }
}