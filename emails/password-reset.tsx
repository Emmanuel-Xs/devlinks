import * as React from "react";

import {
  Body,
  Column,
  Container,
  Font,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

interface PasswordResetProp {
  code?: string;
}

const baseUrl = process.env.NEXT_PUBLIC_HOME_URL || "http://localhost:3000";

export const PasswordReset = ({ code }: PasswordResetProp) => (
  <Html>
    <Head />
    <Font
      fontFamily="Instrument Sans"
      fallbackFontFamily="sans-serif"
      webFont={{
        url: "https://fonts.googleapis.com/css2?family=Instrument+Sans:ital,wght@0,400..700;1,400..700&display=swap",
        format: "woff2",
      }}
      fontWeight={400}
      fontStyle="normal"
    />
    <Preview>Reset Your Password</Preview>
    <Tailwind
      config={{
        theme: {
          extend: {
            colors: {
              primary: "#633cff",
              gray: "#737373",
              background: "#fafafa",
              foreground: "#333333",
            },
          },
        },
      }}
    >
      <Body className="m-auto bg-white font-sans text-foreground">
        <Container className="mx-auto my-[40px] max-w-[465px] rounded-lg border border-solid border-gray-200 p-[20px] shadow-sm">
          <Section className="mt-[32px] w-max">
            <Row>
              <Column>
                <Img
                  src={`${baseUrl}/logos/devlinks.png`}
                  width="41"
                  height="40"
                  alt="devlinks"
                  className="inline-block"
                />
              </Column>
              <Column>
                <Text className="text-[28px] font-bold text-foreground">
                  devlinks
                </Text>
              </Column>
            </Row>
          </Section>

          <Heading className="my-[30px] text-center text-[32px] font-bold text-foreground">
            Reset Your Password
          </Heading>
          <Text className="mb-[30px] text-center text-[16px] leading-[24px] text-gray-600">
            Your confirmation code is below - enter it in your open browser
            window and we&apos;ll help you reset your password.
          </Text>

          <Section className="rounded-md bg-background py-[20px]">
            <Text className="text-center text-[36px] font-bold tracking-wide text-primary">
              {code}
            </Text>
          </Section>

          <Text className="text-gray mt-[30px] text-center text-[14px] leading-[24px]">
            If you didn&apos;t request this email, there&apos;s nothing to worry
            about, you can safely ignore it.
          </Text>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);
