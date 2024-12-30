// config/platforms.tsx
import CodepenIcon from "@/components/Icons/codepen";
import CodewarsIcon from "@/components/Icons/codewars";
import DevDotToIcon from "@/components/Icons/dev-to";
import FacebookIcon from "@/components/Icons/facebook";
import FreeCodeCampIcon from "@/components/Icons/freecodecamp";
import FrontendMentorIcon from "@/components/Icons/frontend-mentor";
import GithubIcon from "@/components/Icons/github";
import GitlabIcon from "@/components/Icons/gitlab";
import HashnodeIcon from "@/components/Icons/hashnode";
import LinkedInIcon from "@/components/Icons/linkedin";
import StackOverFlowIcon from "@/components/Icons/stack-overflow";
import TwitchIcon from "@/components/Icons/twitch";
import TwitterIcon from "@/components/Icons/twitter";
import YouTubeIcon from "@/components/Icons/youtube";

import { Platform, PlatformConfig } from "../types/platform";

export const platforms: PlatformConfig = {
  github: {
    key: "github",
    label: "Github",
    getIcon: (className = "fill-primary-foreground") => (
      <GithubIcon className={className} />
    ),
    color: "bg-platform-github",
  },
  frontendmentor: {
    key: "frontendmentor",
    label: "Frontend Mentor",
    getIcon: (className = "fill-primary-foreground") => (
      <FrontendMentorIcon className={className} />
    ),
    color: "bg-platform-frontendmentor",
  },
  twitter: {
    key: "twitter",
    label: "Twitter",
    getIcon: (className = "fill-primary-foreground") => (
      <TwitterIcon className={className} />
    ),
    color: "bg-platform-twitter",
  },
  linkedin: {
    key: "linkedin",
    label: "LinkedIn",
    getIcon: (className = "fill-primary-foreground") => (
      <LinkedInIcon className={className} />
    ),
    color: "bg-platform-linkedin",
  },
  youtube: {
    key: "youtube",
    label: "YouTube",
    getIcon: (className = "fill-primary-foreground") => (
      <YouTubeIcon className={className} />
    ),
    color: "bg-platform-youtube",
  },
  facebook: {
    key: "facebook",
    label: "Facebook",
    getIcon: (className = "fill-primary-foreground") => (
      <FacebookIcon className={className} />
    ),
    color: "bg-platform-facebook",
  },
  twitch: {
    key: "twitch",
    label: "Twitch",
    getIcon: (className = "fill-primary-foreground") => (
      <TwitchIcon className={className} />
    ),
    color: "bg-platform-twitch",
  },
  "dev.to": {
    key: "dev.to",
    label: "Dev.to",
    getIcon: (className = "fill-primary-foreground") => (
      <DevDotToIcon className={className} />
    ),
    color: "bg-platform-devto",
  },
  codewars: {
    key: "codewars",
    label: "Codewars",
    getIcon: (className = "fill-primary-foreground") => (
      <CodewarsIcon className={className} />
    ),
    color: "bg-platform-codewars",
  },
  codepen: {
    key: "codepen",
    label: "Codepen",
    getIcon: (className = "fill-primary-foreground") => (
      <CodepenIcon className={className} />
    ),
    color: "bg-platform-codepen",
  },
  freecodecamp: {
    key: "freecodecamp",
    label: "FreeCodeCamp",
    getIcon: (className = "fill-primary-foreground") => (
      <FreeCodeCampIcon className={className} />
    ),
    color: "bg-platform-freecodecamp",
  },
  gitlab: {
    key: "gitlab",
    label: "GitLab",
    getIcon: (className = "fill-primary-foreground") => (
      <GitlabIcon className={className} />
    ),
    color: "bg-platform-gitlab",
  },
  hashnode: {
    key: "hashnode",
    label: "Hashnode",
    getIcon: (className = "fill-primary-foreground") => (
      <HashnodeIcon className={className} />
    ),
    color: "bg-platform-hashnode",
  },
  stackoverflow: {
    key: "stackoverflow",
    label: "Stack Overflow",
    getIcon: (className = "fill-primary-foreground") => (
      <StackOverFlowIcon className={className} />
    ),
    color: "bg-platform-stackoverflow",
  },
};

export const platformsArray = Object.values(platforms);

export const defaultPlatform: Platform = {
  key: "unknown",
  label: "Unknown Platform",
  getIcon: () => null,
  color: "bg-gray-500",
};

export const getPlatformConfig = (key: string): Platform => {
  return (
    platforms[key.toLowerCase() as keyof PlatformConfig] || defaultPlatform
  );
};
