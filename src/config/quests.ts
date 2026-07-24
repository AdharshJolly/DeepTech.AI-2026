export const QUESTS = [
  {
    id: "quest-1",
    title: "The Announcer",
    points: 50,
    description:
      "Share the DeepTech.AI 2026 registration flyer on LinkedIn using #DeepTechAI2026.",
    actionText: "Share on LinkedIn",
    shareUrl:
      "https://www.linkedin.com/sharing/share-offsite/?url=https://deeptech.ai",
    platform: "linkedin" as const,
  },
  {
    id: "quest-2",
    title: "Network Builder",
    points: 70,
    description:
      "Tag 3 colleagues in our latest Instagram announcement post and invite them to the summit.",
    actionText: "Go to Instagram",
    shareUrl: "https://www.instagram.com/ieeecsbc",
    platform: "instagram" as const,
  },
  {
    id: "quest-3",
    title: "Visionary Attendee",
    points: 100,
    description:
      "Post your excitement about attending or speaking at DeepTech.AI 2026 on X (formerly Twitter) with #DeepTechAI2026.",
    actionText: "Post on X",
    shareUrl:
      "https://twitter.com/intent/tweet?text=I'm%20excited%20to%20attend%20%23DeepTechAI2026!%20Join%20me%20for%20the%20flagship%20symposium.%20https://deeptech.ai",
    platform: "twitter" as const,
  },
  {
    id: "quest-4",
    title: "Amplifier",
    points: 40,
    description:
      "Retweet/repost our latest keynote speaker announcement on X.",
    actionText: "Retweet on X",
    shareUrl: "https://twitter.com/ieeecsbc",
    platform: "twitter" as const,
  },
] as const;

export const QUEST_POINTS: Record<string, number> = Object.fromEntries(
  QUESTS.map((q) => [q.id, q.points])
);

export const QUEST_PLATFORMS: Record<string, string> = Object.fromEntries(
  QUESTS.map((q) => [q.id, q.platform])
);
