import HoProfile from "../../../api/interfaces/ho-profile.interface";
import ProfileAvatarImage from "../ProfileAvatar/ProfileAvatarImage";

export interface ProfileProps {
  profile: HoProfile;
}

export default function ProfileView({ profile }: ProfileProps): JSX.Element {
  return (
    <>
      <h1 className="text-4xl py-4 my-4 font-bold text-center">Profile</h1>
      <div className="flex justify-center">
        <ProfileAvatarImage profile={profile} />
      </div>
      <h3 className="text-2xl py-4 text-center">Username</h3>
      <p className="text-center">{profile.username}</p>
      <h3 className="text-2xl py-4 text-center">About</h3>
      <p className="text-center">{profile.about}</p>
    </>
  );
}
