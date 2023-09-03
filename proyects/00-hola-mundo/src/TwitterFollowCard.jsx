import { useState } from "react";

export default function TwitterFollowCard({ userName = "username", name, initialIsFollowing }) {
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing);

  const text = isFollowing ? "Siguiendo" : "Seguir";
  const buttonClassName = isFollowing
    ? "tw-followCard-button is-following"
    : "tw-followCard-button";
  const handleClick = () => {
    setIsFollowing(!isFollowing);
  };
  return (
    <>
      <article className="tw-followCard">
        <header className="tw-followCard-header">
          <img
            className="tw-followCard-avatar"
            alt="avatar"
            src={`https://unavatar.io/${userName}`}
          ></img>
          <div className="tw-followCard-info">
            <strong>{name}</strong>
            <span className="tw-followCard-userName">@{userName}</span>
          </div>
        </header>
        <aside>
          <button className={buttonClassName} onClick={handleClick}>
            <span className="tw-followCard-text"> {text}</span>
            <span className="tw-followCard-unfollow"> Dejar de seguir </span>
          </button>
        </aside>
      </article>
    </>
  );
}
