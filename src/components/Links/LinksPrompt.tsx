import Image from "next/image";

export default function LinksPrompt() {
  return (
    <div className="grid place-items-center space-y-6 rounded-xl bg-background p-[20px] sm:space-y-10">
      <Image
        src="/images/finger-on-phone.png"
        alt="placeholder image showing a finger tapping on a mobile phone indicating adding a ink"
        width={249.53}
        height={160}
        style={{ width: "auto" }}
      />
      <div className="w-full max-w-[488px] space-y-6 text-center">
        <h2 className="heading">Let&apos;s get you started</h2>
        <p className="text">
          Use the “Add new link” button to get started. Once you have more than
          one link, you can reorder and edit them. We&apos;re here to help you
          share your profiles with everyone!
        </p>
      </div>
    </div>
  );
}

// what can i call a components that prompts a user to add a link when there is no link to in a website where users can share links to all socials in one placev
