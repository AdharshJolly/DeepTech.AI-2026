import {
  Html,
  Head,
  Body,
  Container,
  Text,
  Link,
  Preview,
  Tailwind,
  Section
} from "@react-email/components";
import * as React from "react";

interface BaseEmailLayoutProps {
  previewText: string;
  headerTitle: string;
  headerSubtitle: string;
  headerGradient: string;
  children: React.ReactNode;
  urlLinkedin?: string;
  urlTwitter?: string;
  urlInstagram?: string;
}

export default function BaseEmailLayout({
  previewText,
  headerTitle,
  headerSubtitle,
  headerGradient,
  children,
  urlLinkedin = "https://www.linkedin.com/company/ieeecsbc/",
  urlTwitter = "https://twitter.com/ieeecsbc",
  urlInstagram = "https://www.instagram.com/ieeecsbc",
}: BaseEmailLayoutProps) {
  return (
    <Html>
      <Tailwind>
        <Head>
        <style>
          {`
            @media (prefers-color-scheme: dark) {
              .body { background-color: #111827 !important; }
              .container { background-color: #1f2937 !important; border-color: #374151 !important; }
              .text-primary { color: #f3f4f6 !important; }
              .text-secondary { color: #9ca3af !important; }
              .footer-text { color: #6b7280 !important; }
              .event-card { background-color: #374151 !important; border-color: #4b5563 !important; }
              .event-value { color: #f3f4f6 !important; }
            }
          `}
        </style>
      </Head>
        <Preview>{previewText}</Preview>
        <Body className="body bg-gray-50 my-auto mx-auto font-sans px-2 py-4">
          <Container className="border border-solid border-gray-200 rounded-xl mx-auto max-w-[600px] overflow-hidden bg-white">
            {/* Header */}
            <Section
              className="p-8"
              style={{
                background: headerGradient,
                borderRadius: "12px 12px 0 0",
              }}
            >
              <Text className="text-white/80 text-[12px] m-0 tracking-[2px] uppercase">
                IEEE Computer Society Bangalore Chapter
              </Text>
              <Text className="text-white text-[26px] font-bold m-0 mt-3">
                {headerTitle}
              </Text>
              <Text className="text-white/90 text-[14px] m-0 mt-2">
                {headerSubtitle}
              </Text>
            </Section>

            {/* Content */}
            <Section className="p-8">
              {children}

              {/* Footer */}
              <Section className="mt-8 pt-6 border-t border-solid border-gray-200">
                <Text className="footer-text text-gray-400 text-[12px] m-0">
                  IEEE Computer Society Bangalore Chapter
                </Text>
                <Text className="footer-text text-gray-400 text-[12px] m-0 mt-1">
                  John F. Welch Technology Center (LFWTC), Bengaluru, India
                </Text>
                <Text className="footer-text text-gray-400 text-[12px] m-0 mt-2">
                  <Link href={urlLinkedin} className="text-[#00629B]">
                    LinkedIn
                  </Link>
                  {" | "}
                  <Link href={urlTwitter} className="text-[#00629B]">
                    X (Twitter)
                  </Link>
                  {" | "}
                  <Link href={urlInstagram} className="text-[#00629B]">
                    Instagram
                  </Link>
                </Text>
              </Section>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
