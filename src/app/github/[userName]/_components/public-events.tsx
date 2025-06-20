import { Flex } from "./flex";

type Props = {
  receivedPublicEventsCount: number;
};

export const PublicEvents = ({ receivedPublicEventsCount }: Props) => {
  if (receivedPublicEventsCount <= 0) {
    return null;
  }

  return (
    <>
      <Flex tw="text-white text-sm font-normal mt-4 mb-2">
        Recent Public Events ({receivedPublicEventsCount})
      </Flex>
      <Flex tw="bg-gray-900 px-3 py-2 rounded justify-center">
        <span tw="text-gray-400 text-xs font-normal">
          📡 Monitoring activity
        </span>
      </Flex>
    </>
  );
};
