import "./App.css";
import TwitterFollowCard from "./TwitterFollowCard";

export default function App() {
  const users = [
    {
      userName: "florwegher",
      name: "Florencia Wegher Osci",
      isFollowing: true,
    },
    {
      userName: "ampiperez8",
      name: "Amparo Perez",
      isFollowing: true,
    },
    {
      userName: "augustodesuque",
      name: "Augusto Desuque",
    },
  ];

  return (
    <>
      <section className="App">
        <h1>A quién seguir</h1>
        {users.map((user) => {
          const { userName, isFollowing, name } = user;
          return (
            <TwitterFollowCard
              userName={userName}
              initialIsFollowing={isFollowing}
              name={name}
            />
          );
        })}
      </section>
    </>
  );
}
