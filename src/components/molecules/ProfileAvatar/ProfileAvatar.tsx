import Image from "next/image";
import HoProfile from "../../../api/interfaces/profile";
import { useGetImageSrc } from "../../../hooks/use-get-image-src";
import { useUpload } from "../../../hooks/use-upload";
import { Upload } from "../../atoms/Upload";

export interface ProfileAvatarProps {
  profile: HoProfile;
  name: string;
  onUpload: (url: string) => void;
}

export function ProfileAvatar(props: ProfileAvatarProps): JSX.Element {
  const [uploading, onImageSelected] = useUpload("avatars", props.onUpload);
  const [imageSrc, downloading] = useGetImageSrc(
    props.profile.avatar_url ?? ""
  );
  console.log("eggs", imageSrc);

  return (
    <Upload
      name={props.name}
      accept="image/*"
      onChange={onImageSelected}
      disabled={uploading || downloading}
    >
      <div className="flex items-center justify-center">
        <Image
          src={imageSrc || "/avataaars.png"}
          className="rounded-full border-solid border-white border-2 cursor-pointer"
          alt="profile-picture"
          width={200}
          height={200}
        />
      </div>
    </Upload>
  );
}
ProfileAvatar.displayName = "ProfileAvatar";
