import { Button, Flex, Heading, Box, Text } from "@radix-ui/themes";
import { workos } from "@/app/(api)/api/workos";
import { GeneratePortalLinkIntent } from "@workos-inc/node";
import { withAuth } from "@workos-inc/authkit-nextjs";
import Link from "next/link";
import { UpgradeButton } from "@/components/upgrade-button";
import { DashboardContainer } from "@/components/layout/dashboard-container";

export default async function SettingsPage() {
  const { organizationId } = await withAuth({ ensureSignedIn: true });

  const { link: workOSAdminPortalLink } = await workos.portal.generateLink({
    organization: organizationId as string,
    intent: GeneratePortalLinkIntent.SSO,
  });

  return (
    <Flex direction="column" gap="3" width="100%">
      <Box>
        <Heading>Dashboard</Heading>
      </Box>
      <DashboardContainer>
        <Text size="4">Single Sign-On</Text>
        <Text size="2" color="gray">
          Setup or modify an existing SSO connection
        </Text>
        <Box>
          <Button variant="soft" style={{ cursor: "pointer" }}>
            <Link href={workOSAdminPortalLink}>Configure</Link>
          </Button>
        </Box>
      </DashboardContainer>
      <DashboardContainer>
        <Text size="4">Payments & Subscriptions</Text>
        <Text size="2" color="gray">
          Update payment method or change plans
        </Text>
        <Box>
          <UpgradeButton path="settings">Configure</UpgradeButton>
        </Box>
      </DashboardContainer>
    </Flex>
  );
}
