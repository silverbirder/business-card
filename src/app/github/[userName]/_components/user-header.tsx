/* eslint-disable @next/next/no-img-element */
import { Flex } from "./flex";
import type { UserHeaderData } from "@/types/github";

type Props = {
  userData: UserHeaderData;
};

export const UserHeader = ({ userData }: Props) => {
  return (
    <Flex tw="bg-gray-800 mx-4 mb-2 rounded-xl px-5 py-5 flex items-center">
      <img
        src={userData.avatar}
        tw="w-20 h-20 rounded-full mr-5"
        alt="User Avatar"
      />
      <Flex tw="flex-col flex-1">
        <Flex tw="text-white text-2xl font-bold">{userData.name}</Flex>
        <Flex tw="text-gray-400 text-base font-semibold mb-2">
          @{userData.username}
        </Flex>
        <Flex tw="text-gray-300 text-sm font-normal mb-2">{userData.bio}</Flex>
        <Flex tw="flex">
          {userData.location && (
            <Flex tw="text-gray-400 text-xs font-normal flex items-center mr-5">
              📍 {userData.location}
            </Flex>
          )}
          {userData.company && (
            <Flex tw="text-gray-400 text-xs font-normal flex items-center mr-5">
              🏢 {userData.company}
            </Flex>
          )}
          {userData.twitterUsername && (
            <Flex tw="text-gray-400 text-xs font-normal flex items-center mr-5">
              🐦 @{userData.twitterUsername}
            </Flex>
          )}
          {userData.hireable && (
            <Flex tw="text-green-400 text-xs font-normal flex items-center">
              💼 Available for hire
            </Flex>
          )}
        </Flex>
        {userData.socialAccounts && userData.socialAccounts.length > 0 && (
          <Flex tw="mt-2 flex">
            {userData.socialAccounts.slice(0, 3).map((account, index) => (
              <Flex
                key={index}
                tw="text-blue-400 text-xs font-normal flex items-center mr-3"
              >
                🔗 {account.provider}
              </Flex>
            ))}
          </Flex>
        )}
      </Flex>
      {userData.organizations.length > 0 && (
        <Flex tw="flex-col items-center">
          <Flex tw="text-white text-xs font-normal mb-2">Organizations</Flex>
          <Flex tw="flex">
            {userData.organizations.slice(0, 3).map((org, index) => (
              <img
                key={index}
                src={org.avatar_url}
                tw="w-6 h-6 rounded mr-1"
                alt={org.login}
              />
            ))}
          </Flex>
        </Flex>
      )}
    </Flex>
  );
};
