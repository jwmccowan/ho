import Image from "next/image";
import HoProfile from "../../../api/interfaces/ho-profile.interface";
import { useGetImageSrc } from "../../../hooks/use-get-image-src";
import { useUpload } from "../../../hooks/use-upload";
import { Upload } from "../../atoms/Upload";
import ProfileAvatarImage from "./ProfileAvatar";

export interface ProfileAvatarProps {
  profile: HoProfile;
  name: string;
  onUpload: (url: string) => void;
}

export default function ProfileAvatarWithUpload(
  props: ProfileAvatarProps
): JSX.Element {
  const [uploading, onImageSelected] = useUpload("avatars", props.onUpload);
  const [imageSrc, downloading] = useGetImageSrc(
    props.profile.avatar_url ?? ""
  );

  return (
    <Upload
      name={props.name}
      accept="image/*"
      onChange={onImageSelected}
      disabled={uploading || downloading}
    >
      <div className="flex items-center justify-center">
        <ProfileAvatarImage profile={props.profile} />
      </div>
    </Upload>
  );
}
ProfileAvatarWithUpload.displayName = "ProfileAvatar";
