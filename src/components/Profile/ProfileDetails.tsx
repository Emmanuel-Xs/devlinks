import ImageIcon from "./icons/image-icon";
import ProfileDetailsForm from "./ProfileDetailsForm";
import ProfilePictureCard from "./ProfilePictureCard";

export default function ProfileDetails() {
  return (
    <div className="space-y-6">
      <ProfilePictureCard />
      <ProfileDetailsForm />
    </div>
  );
}
