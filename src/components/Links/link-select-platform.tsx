"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Fragment, useState } from "react";
import GithubIcon from "./Icons/github";
import FrontendMentorIcon from "./Icons/frontend-mentor";
import TwitterIcon from "./Icons/twitter";
import LinkedInIcon from "./Icons/linkedin";
import YouTubeIcon from "./Icons/youtube";
import FacebookIcon from "./Icons/facebook";
import TwitchIcon from "./Icons/twitch";
import DevDotToIcon from "./Icons/dev-to";
import CodewarsIcon from "./Icons/codewars";
import CodepenIcon from "./Icons/codepen";
import FreeCodeCampIcon from "./Icons/freecodecamp";
import GitlabIcon from "./Icons/gitlab";
import HashnodeIcon from "./Icons/hashnode";
import StackOverFlowIcon from "./Icons/stack-overflow";
import { Label } from "../ui/label";

const platforms = [
  {
    key: "github",
    label: "Github",
    icon: <GithubIcon className="group-hover/item:fill-primary" />,
  },
  {
    key: "frontendmentor",
    label: "Frontend Mentor",
    icon: <FrontendMentorIcon className="group-hover/item:fill-primary" />,
  },
  {
    key: "twitter",
    label: "Twitter",
    icon: <TwitterIcon className="group-hover/item:fill-primary" />,
  },
  {
    key: "linkedIn",
    label: "LinkedIn",
    icon: <LinkedInIcon className="group-hover/item:fill-primary" />,
  },
  {
    key: "youtube",
    label: "YouTube",
    icon: <YouTubeIcon className="group-hover/item:fill-primary" />,
  },
  {
    key: "facebook",
    label: "Facebook",
    icon: <FacebookIcon className="group-hover/item:fill-primary" />,
  },
  {
    key: "Twitch",
    label: "Twitch",
    icon: <TwitchIcon className="group-hover/item:fill-primary" />,
  },
  {
    key: "dev.to",
    label: "Dev.to",
    icon: <DevDotToIcon className="group-hover/item:fill-primary" />,
  },
  {
    key: "codewars",
    label: "Codewars",
    icon: <CodewarsIcon className="group-hover/item:fill-primary" />,
  },
  {
    key: "codepen",
    label: "Codepen",
    icon: <CodepenIcon className="group-hover/item:fill-primary" />,
  },
  {
    key: "freecodecamp",
    label: "FreeCodeCamp",
    icon: <FreeCodeCampIcon className="group-hover/item:fill-primary" />,
  },
  {
    key: "gitlab",
    label: "GitLab",
    icon: <GitlabIcon className="group-hover/item:fill-primary" />,
  },
  {
    key: "hashnode",
    label: "Hashnode",
    icon: <HashnodeIcon className="group-hover/item:fill-primary" />,
  },
  {
    key: "stackoverflow",
    label: "Stack Overflow",
    icon: <StackOverFlowIcon className="group-hover/item:fill-primary" />,
  },
];

type LinkSelectPlatformProps = {
  platform: string;
  onPlatformChange: (platform: string) => void;
};

export default function LinkSelectPlatform({
  platform,
  onPlatformChange,
}: LinkSelectPlatformProps) {
  const [isSelectOpen, setIsSelectOpen] = useState(false);

  const handleSelectOpen = () => {
    setIsSelectOpen((prev) => !prev);
  };
  return (
    <div className="space-y-1">
      <Label htmlFor="platform" className="leading-[150%] text-card-foreground">
        Platform
      </Label>
      <Select
        // defaultValue={platform}
        value={platform}
        onValueChange={onPlatformChange}
        onOpenChange={handleSelectOpen}
      >
        <SelectTrigger id="platform" isOpen={isSelectOpen} className="">
          <SelectValue placeholder="" />
        </SelectTrigger>
        <SelectContent>
          {platforms.map((platform, index) => (
            <Fragment key={platform.key}>
              <SelectItem value={platform.key} className="group/item">
                <div className="flex items-center gap-3">
                  {platform.icon}
                  {platform.label}
                </div>
              </SelectItem>
              {index < platforms.length - 1 && <SelectSeparator />}
            </Fragment>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
