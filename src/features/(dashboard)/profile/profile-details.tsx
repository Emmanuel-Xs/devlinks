// import ImageIcon from "./icons/image-icon";
import ProfileDetailsForm from "./profile-details-form";
import ProfilePictureCard from "./profile-picture-card";

export default function ProfileDetails() {
  return (
    <div className="space-y-6">
      <ProfilePictureCard />
      <ProfileDetailsForm />
    </div>
  );
}
