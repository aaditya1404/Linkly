import * as React from "react";
import { Html, Heading, Head, Section, Row, Text } from "@react-email/components";

interface verificationEmailProps  {
    userName: string;
    verifyCode: string;
}

export default function VerificationEmail({userName, verifyCode}: verificationEmailProps){
    return (
        <Html>
            <Head>
                <title>Verification Code from Linkly.</title>
            </Head>
            <Heading className="text-center">Welcome, {userName} to Linkly</Heading>
            <Section>
                <Row>
                    <Text>Here is your verification code: {verifyCode}</Text>
                </Row>
                <Row>
                    <Text>Thank you for registering to Linkly.</Text>
                </Row>
            </Section>
        </Html>
    )
}