import { render } from "@react-email/components";
import VerificationEmail from "../../emails/VerificationEmail";
import { transporter } from "@/lib/nodemailer";
import { NextResponse } from "next/server";

export async function sendVerificationEmail(userName: string, userEmail: string, verifyCode: string) {
    try {
        const emailHtml = await render(VerificationEmail({ userName, verifyCode }));
        await transporter.sendMail({
            from: `"Linkly" <${process.env.EMAIL_USER}>`, // sender address
            to: userEmail,
            subject: "Verification Code",
            html: emailHtml,
        });

        return { success: true, message: "Successfully send verification email" };
    } catch (error) {
        return { success: false, message: "Error sending verification email", error };
    }
}