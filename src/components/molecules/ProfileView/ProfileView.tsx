import { Flex, Heading, Text } from "@chakra-ui/layout";
import HoProfile from "../../../api/interfaces/ho-profile.interface";
import { useUpload } from "../../../hooks/use-upload";
import ProfileAvatar from "../ProfileAvatar/ProfileAvatar";
import ProfileAvatarWithUpload from "../ProfileAvatar/ProfileAvatarWithUpload";

export interface ProfileProps {
  profile: HoProfile;
  onUpload?: (url: string) => void;
}

export default function ProfileView({
  profile,
  onUpload,
}: ProfileProps): JSX.Element {
  return (
    <Flex w="100%" flexDirection="column" alignItems="center">
      <Heading as="h1" size="2xl" mb={8}>
        Profile
      </Heading>
      {!!onUpload ? (
        <ProfileAvatarWithUpload
          profile={profile}
          onUpload={onUpload}
          name="profile-image-upload"
        />
      ) : (
        <ProfileAvatar profile={profile} />
      )}
      <Heading as="h3" py={2} mt={4} size="lg">
        Username
      </Heading>
      <Text fontSize={20}>{profile.username}</Text>
      <Heading as="h3" py={2} mt={4} size="lg">
        About
      </Heading>
      <Text fontSize={20}>{profile.about}</Text>
    </Flex>
  );
}
