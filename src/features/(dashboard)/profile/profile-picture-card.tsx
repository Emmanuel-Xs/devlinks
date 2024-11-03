import ImageIcon from "./icons/image-icon";

export default function ProfilePictureCard() {
  return (
    <div className="flex flex-col justify-between gap-6 rounded-xl border-input bg-background p-[20px] sm:flex-row sm:items-center">
      <p className="text">Profile picture</p>
      <div className="flex max-w-[432px] flex-col gap-6 sm:flex-row sm:items-center">
        <div className="flex h-48 w-48 flex-col items-center justify-center rounded-xl bg-active-link">
          <ImageIcon />
          <p className="text font-semibold text-primary">+ Upload Image</p>
        </div>
        <p className="text text-xs sm:max-w-44 md:max-w-52">
          Image must be below 1024x1024px. Use PNG or JPG format.
        </p>
      </div>
    </div>
  );
}
