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

interface EmailVerificationProp {
  code?: string;
}

const baseUrl = process.env.NEXT_PUBLIC_HOME_URL || "http://localhost:3000";

export const EmailVerification = ({ code }: EmailVerificationProp) => (
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
    <Preview>Verify your email address</Preview>
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
        safelist: [],
        separator: ":",
        corePlugins: {},
      }}
    >
      <Body className="text-foreground m-auto bg-white font-sans">
        <Container className="mx-auto my-10 max-w-116.25 rounded-lg border border-solid border-gray-200 p-5 shadow-sm">
          <Section className="mt-8 w-max">
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
                <Text className="text-foreground text-[28px] font-bold">
                  devlinks
                </Text>
              </Column>
            </Row>
          </Section>

          <Heading className="text-foreground my-7.5 text-center text-[32px] font-bold">
            Verify your email address
          </Heading>
          <Text className="mb-7.5 text-center text-[16px] leading-6 text-gray-600">
            Your confirmation code is below - enter it in your open browser
            window and we&apos;ll help you get signed in.
          </Text>

          <Section className="bg-background rounded-md py-5">
            <Text className="text-primary text-center text-[36px] font-bold tracking-wide">
              {code}
            </Text>
          </Section>

          <Text className="text-gray mt-7.5 text-center text-[14px] leading-6">
            If you didn&apos;t request this email, there&apos;s nothing to worry
            about, you can safely ignore it.
          </Text>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);

// EmailVerification.PreviewProps = {
//   code: "DJZ-TLX",
// } as EmailVerificationProp;

export default EmailVerification;
