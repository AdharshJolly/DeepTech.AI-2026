import { Heart, Share2 } from "lucide-react";

interface SocialPost {
  id: string;
  user: string;
  handle: string;
  platform: "linkedin" | "instagram" | "twitter" | "facebook";
  content: string;
  time: string;
  likes: number;
  avatar: string;
  postUrl?: string;
}

interface SocialPostCardProps {
  post: SocialPost;
}

function InstagramEmbed({ postUrl }: { postUrl: string }) {
  const match = postUrl.match(/instagram\.com\/(?:p|reel)\/([A-Za-z0-9_-]+)/);
  if (!match?.[1]) return null;

  return (
    <div className="bg-white rounded-3xl overflow-hidden border border-ieee-gray/10 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow duration-300">
      <div className="relative w-full h-100">
        <iframe
          src={`https://www.instagram.com/p/${match[1]}/embed`}
          className="absolute inset-0 w-full h-full border-0"
          sandbox="allow-scripts allow-same-origin"
          scrolling="no"
        />
      </div>
      <div className="p-4 bg-ieee-gray/5 border-t border-ieee-gray/5 flex items-center justify-between text-xxs font-bold text-ieee-gray">
        <span>Instagram Post</span>
        <a
          href={postUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-ieee-cyan hover:underline"
        >
          View Original
        </a>
      </div>
    </div>
  );
}

export default function SocialPostCard({ post }: SocialPostCardProps) {
  const isInstagram = post.platform === "instagram" && post.postUrl?.includes("instagram.com");

  if (isInstagram) {
    return <InstagramEmbed postUrl={post.postUrl!} />;
  }

  const platformStyles: Record<string, string> = {
    linkedin: "bg-sky-100 text-sky-700",
    instagram: "bg-pink-100 text-pink-700",
    twitter: "bg-slate-100 text-slate-700",
    facebook: "bg-blue-100 text-blue-700",
  };

  const linkStyles: Record<string, string> = {
    linkedin: "border-sky-200 text-sky-700 bg-sky-50/50 hover:bg-sky-50",
    facebook: "border-blue-200 text-blue-700 bg-blue-50/50 hover:bg-blue-50",
    default: "border-slate-200 text-slate-800 bg-slate-50/50 hover:bg-slate-50",
  };

  return (
    <div className="bg-white rounded-3xl p-6 border border-ieee-gray/10 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow duration-300">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-ieee-blue/10 flex items-center justify-center font-bold text-ieee-blue text-sm shrink-0">
              {post.avatar}
            </div>
            <div className="overflow-hidden">
              <div className="font-bold text-sm text-ieee-black truncate">
                {post.user}
              </div>
              <div className="text-xs text-ieee-gray truncate">
                {post.handle}
              </div>
            </div>
          </div>
          <span
            className={`text-xxs font-black uppercase tracking-wider px-2 py-1 rounded-full ${
              platformStyles[post.platform] || platformStyles.twitter
            }`}
          >
            {post.platform}
          </span>
        </div>

        <p className="text-sm text-ieee-black leading-relaxed font-medium">
          {post.content}
        </p>

        {post.postUrl && (
          <div className="pt-2">
            <a
              href={post.postUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-xl border transition-all ${
                linkStyles[post.platform] || linkStyles.default
              }`}
            >
              View Post
            </a>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between pt-4 mt-6 border-t border-ieee-gray/5 text-xxs font-bold text-ieee-gray">
        <span>{post.time}</span>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <Heart className="w-3.5 h-3.5 text-pink-500 fill-pink-500" />{" "}
            {post.likes}
          </span>
          <span className="flex items-center gap-1">
            <Share2 className="w-3.5 h-3.5 text-ieee-cyan" /> Share
          </span>
        </div>
      </div>
    </div>
  );
}
