import Image from "next/image";
import HoProfile from "../../../api/interfaces/ho-profile.interface";
import { useGetImageSrc } from "../../../hooks/use-get-image-src";

export interface ProfileAvatarImageProps {
  profile: HoProfile;
}

export default function ProfileAvatarImage(
  props: ProfileAvatarImageProps
): JSX.Element {
  const [imageSrc, downloading] = useGetImageSrc(
    props.profile.avatar_url ?? ""
  );
  return (
    <Image
      src={imageSrc || "/avataaars.png"}
      className="rounded-full border-solid border-black border-2 cursor-pointer"
      alt="profile-picture"
      width={200}
      height={200}
    />
  );
}
