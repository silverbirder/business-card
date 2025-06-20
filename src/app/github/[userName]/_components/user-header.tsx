/* eslint-disable @next/next/no-img-element */
import { GITHUB_COLORS, SPACING, RADIUS, TYPOGRAPHY } from "@/lib/design-token";

interface UserData {
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
}

interface UserHeaderProps {
  userData: UserData;
}

export function UserHeader({ userData }: UserHeaderProps) {
  return (
    <div
      style={{
        display: "flex",
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
      <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
        <div
          style={{
            display: "flex",
            color: GITHUB_COLORS.text.primary,
            fontSize: TYPOGRAPHY.h1.fontSize,
            fontWeight: TYPOGRAPHY.h1.fontWeight,
          }}
        >
          {userData.name}
        </div>
        <div
          style={{
            display: "flex",
            color: GITHUB_COLORS.text.muted,
            fontSize: TYPOGRAPHY.h4.fontSize,
            fontWeight: TYPOGRAPHY.h4.fontWeight,
            marginBottom: SPACING.lg,
          }}
        >
          @{userData.username}
        </div>
        <div
          style={{
            display: "flex",
            color: GITHUB_COLORS.text.secondary,
            fontSize: TYPOGRAPHY.body.fontSize,
            fontWeight: TYPOGRAPHY.body.fontWeight,
            marginBottom: SPACING.lg,
          }}
        >
          {userData.bio}
        </div>
        <div style={{ display: "flex", gap: SPACING["4xl"] }}>
          {userData.location && (
            <div
              style={{
                display: "flex",
                color: GITHUB_COLORS.text.muted,
                fontSize: TYPOGRAPHY.bodySmall.fontSize,
                fontWeight: TYPOGRAPHY.bodySmall.fontWeight,
                alignItems: "center",
              }}
            >
              📍 {userData.location}
            </div>
          )}
          {userData.company && (
            <div
              style={{
                display: "flex",
                color: GITHUB_COLORS.text.muted,
                fontSize: TYPOGRAPHY.bodySmall.fontSize,
                fontWeight: TYPOGRAPHY.bodySmall.fontWeight,
                alignItems: "center",
              }}
            >
              🏢 {userData.company}
            </div>
          )}
          {userData.twitterUsername && (
            <div
              style={{
                display: "flex",
                color: GITHUB_COLORS.text.muted,
                fontSize: TYPOGRAPHY.bodySmall.fontSize,
                fontWeight: TYPOGRAPHY.bodySmall.fontWeight,
                alignItems: "center",
              }}
            >
              🐦 @{userData.twitterUsername}
            </div>
          )}
          {userData.hireable && (
            <div
              style={{
                display: "flex",
                color: GITHUB_COLORS.accent.green,
                fontSize: TYPOGRAPHY.bodySmall.fontSize,
                fontWeight: TYPOGRAPHY.bodySmall.fontWeight,
                alignItems: "center",
              }}
            >
              💼 Available for hire
            </div>
          )}
        </div>
        {userData.socialAccounts &&
          userData.socialAccounts.length > 0 && (
            <div
              style={{
                display: "flex",
                marginTop: SPACING.lg,
                gap: SPACING.xl,
              }}
            >
              {userData.socialAccounts
                .slice(0, 3)
                .map((account, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      color: GITHUB_COLORS.accent.blue,
                      fontSize: TYPOGRAPHY.bodySmall.fontSize,
                      fontWeight: TYPOGRAPHY.bodySmall.fontWeight,
                      alignItems: "center",
                    }}
                  >
                    🔗 {account.provider}
                  </div>
                ))}
            </div>
          )}
      </div>
      {userData.organizations.length > 0 && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              color: GITHUB_COLORS.text.primary,
              fontSize: TYPOGRAPHY.bodySmall.fontSize,
              fontWeight: TYPOGRAPHY.bodySmall.fontWeight,
              marginBottom: SPACING.lg,
            }}
          >
            Organizations
          </div>
          <div style={{ display: "flex", gap: SPACING.sm }}>
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
          </div>
        </div>
      )}
    </div>
  );
}
