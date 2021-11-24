import { Img } from "@chakra-ui/image";
import HoProfile from "../../../api/interfaces/ho-profile.interface";
import { useGetImageSrc } from "../../../hooks/use-get-image-src";

export interface ProfileAvatarImageProps {
  profile: HoProfile;
}

export default function ProfileAvatar(
  props: ProfileAvatarImageProps
): JSX.Element {
  const [imageSrc, downloading] = useGetImageSrc(
    props.profile.avatar_url ?? ""
  );
  return (
    <Img
      src={imageSrc || "/avataaars.png"}
      borderRadius="150px"
      className="rounded-full border-solid border-black border-2 cursor-pointer"
      alt={props.profile.username ?? "profile-image"}
      boxSize="150px"
    />
  );
}
