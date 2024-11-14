import PreviewLinks from "@/features/preview/components/preview-links";
import PreviewNavbar from "@/features/preview/components/preview-navbar";
import Image from "next/image";
import React from "react";

export default function Page() {
  return (
    <main className="relative min-h-svh bg-card pb-4 sm:bg-none">
      <div className="hidden h-[357px] rounded-b-[32px] bg-primary pt-4 sm:block">
        <PreviewNavbar />
      </div>
      <PreviewNavbar className="px-0 sm:hidden" />
      <div className="inset-x-1/2 top-[208px] mx-auto px-14 py-12 text-center sm:absolute sm:h-[569px] sm:w-[349px] sm:-translate-x-1/2 sm:rounded-3xl sm:bg-card">
        {/* TODO:  Image loading or PreLoading */}
        <Image
          src="/images/profile-image.png"
          alt=""
          width={104}
          height={104}
          className="mx-auto rounded-full border-[3px] border-primary bg-primary"
          priority
        />
        <h1 className="heading">Ben Wright</h1>
        <p className="text">links</p>
        <div className="flex flex-col gap-2">
          <PreviewLinks
            name="gitlab"
            url="https://stackoverflow.com/users/18391310/emmanuel-xs"
          />
          <PreviewLinks
            name="github"
            url="https://www.github.com/Emmanuel-Xs"
          />
          <PreviewLinks
            name="frontendmentor"
            url="https://www.frontendmentor.io/profile/Emmanuel-Xs"
          />
        </div>
      </div>
    </main>
  );
}
