import type { User } from "../types";

type AvatarProps = {
  user: Pick<User, "displayName" | "avatarUrl">;
  size?: "sm" | "md" | "lg";
};

export function Avatar({ user, size = "md" }: AvatarProps) {
  const initial = Array.from(user.displayName.trim())[0]?.toUpperCase() ?? "?";
  return (
    <span className={`avatar avatar--${size}`} aria-label={user.displayName} title={user.displayName}>
      {user.avatarUrl ? <img src={user.avatarUrl} alt="" /> : <span>{initial}</span>}
    </span>
  );
}
