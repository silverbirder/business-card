/* eslint-disable @next/next/no-img-element */
import { GITHUB_COLORS, SPACING, RADIUS, TYPOGRAPHY } from "@/lib/design-token";
import { Flex } from "./flex";

type UserData = {
  name: string;
  username: string;
  bio: string;
  location?: string | null;
  company?: string | null;
  twitterUsername?: string | null;
  hireable?: boolean | null;
  avatar: string;
  socialAccounts?: Array<{ provider: string }>;
  organizations: Array<{ avatar_url: string; login: string }>;
};

type Props = {
  userData: UserData;
};

export const UserHeader = ({ userData }: Props) => {
  return (
    <Flex
      style={{
        background: GITHUB_COLORS.background.secondary,
        margin: SPACING["3xl"],
        marginBottom: SPACING.lg,
        borderRadius: RADIUS.xl,
        padding: SPACING["4xl"],
        alignItems: "center",
      }}
    >
      <img
        src={userData.avatar}
        style={{
          width: "80px",
          height: "80px",
          borderRadius: RADIUS.full,
          marginRight: SPACING["4xl"],
        }}
        alt="User Avatar"
      />
      <Flex style={{ flexDirection: "column", flex: 1 }}>
        <Flex
          style={{
            color: GITHUB_COLORS.text.primary,
            fontSize: TYPOGRAPHY.h1.fontSize,
            fontWeight: TYPOGRAPHY.h1.fontWeight,
          }}
        >
          {userData.name}
        </Flex>
        <Flex
          style={{
            color: GITHUB_COLORS.text.muted,
            fontSize: TYPOGRAPHY.h4.fontSize,
            fontWeight: TYPOGRAPHY.h4.fontWeight,
            marginBottom: SPACING.lg,
          }}
        >
          @{userData.username}
        </Flex>
        <Flex
          style={{
            color: GITHUB_COLORS.text.secondary,
            fontSize: TYPOGRAPHY.body.fontSize,
            fontWeight: TYPOGRAPHY.body.fontWeight,
            marginBottom: SPACING.lg,
          }}
        >
          {userData.bio}
        </Flex>
        <Flex style={{ gap: SPACING["4xl"] }}>
          {userData.location && (
            <Flex
              style={{
                color: GITHUB_COLORS.text.muted,
                fontSize: TYPOGRAPHY.bodySmall.fontSize,
                fontWeight: TYPOGRAPHY.bodySmall.fontWeight,
                alignItems: "center",
              }}
            >
              📍 {userData.location}
            </Flex>
          )}
          {userData.company && (
            <Flex
              style={{
                color: GITHUB_COLORS.text.muted,
                fontSize: TYPOGRAPHY.bodySmall.fontSize,
                fontWeight: TYPOGRAPHY.bodySmall.fontWeight,
                alignItems: "center",
              }}
            >
              🏢 {userData.company}
            </Flex>
          )}
          {userData.twitterUsername && (
            <Flex
              style={{
                color: GITHUB_COLORS.text.muted,
                fontSize: TYPOGRAPHY.bodySmall.fontSize,
                fontWeight: TYPOGRAPHY.bodySmall.fontWeight,
                alignItems: "center",
              }}
            >
              🐦 @{userData.twitterUsername}
            </Flex>
          )}
          {userData.hireable && (
            <Flex
              style={{
                color: GITHUB_COLORS.accent.green,
                fontSize: TYPOGRAPHY.bodySmall.fontSize,
                fontWeight: TYPOGRAPHY.bodySmall.fontWeight,
                alignItems: "center",
              }}
            >
              💼 Available for hire
            </Flex>
          )}
        </Flex>
        {userData.socialAccounts &&
          userData.socialAccounts.length > 0 && (
            <Flex
              style={{
                marginTop: SPACING.lg,
                gap: SPACING.xl,
              }}
            >
              {userData.socialAccounts
                .slice(0, 3)
                .map((account, index) => (
                  <Flex
                    key={index}
                    style={{
                      color: GITHUB_COLORS.accent.blue,
                      fontSize: TYPOGRAPHY.bodySmall.fontSize,
                      fontWeight: TYPOGRAPHY.bodySmall.fontWeight,
                      alignItems: "center",
                    }}
                  >
                    🔗 {account.provider}
                  </Flex>
                ))}
            </Flex>
          )}
      </Flex>
      {userData.organizations.length > 0 && (
        <Flex
          style={{
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Flex
            style={{
              color: GITHUB_COLORS.text.primary,
              fontSize: TYPOGRAPHY.bodySmall.fontSize,
              fontWeight: TYPOGRAPHY.bodySmall.fontWeight,
              marginBottom: SPACING.lg,
            }}
          >
            Organizations
          </Flex>
          <Flex style={{ gap: SPACING.sm }}>
            {userData.organizations.slice(0, 3).map((org, index) => (
              <img
                key={index}
                src={org.avatar_url}
                style={{
                  width: "24px",
                  height: "24px",
                  borderRadius: RADIUS.sm,
                }}
                alt={org.login}
              />
            ))}
          </Flex>
        </Flex>
      )}
    </Flex>
  );
};
