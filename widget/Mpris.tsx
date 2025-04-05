import { bind, derive, Variable } from "astal";
import AstalMpris from "gi://AstalMpris";

function IntegerToMinuteSeconds(value: number) {
  const minutes = Math.floor(value / 60);
  const seconds = Math.floor(value - minutes * 60);
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function FormatLabel(player: {
  title: string;
  artist: string;
  position: number;
  length: number;
}) {
  return `${player.title} - ${player.artist} [${IntegerToMinuteSeconds(player.position)}/${IntegerToMinuteSeconds(player.length)}]`;
}

const Mpris = function () {
  const mpris = AstalMpris.get_default();

  const players = bind(mpris, "players");
  const activeIndex = Variable(0);

  bind(
    derive([players, activeIndex], (players, index) => players[index]),
  ).subscribe((value) => print(value.title));

  return (
    <box>
      {bind(
        derive([players, activeIndex], (players, index) => {
          const activePlayer = players[index];

          return (
            <label
              label={bind(
                derive(
                  [
                    bind(activePlayer, "title"),
                    bind(activePlayer, "artist"),
                    bind(activePlayer, "position"),
                    bind(activePlayer, "length"),
                  ],
                  (title, artist, position, length) =>
                    FormatLabel({ title, artist, position, length }),
                ),
              )}
            />
          );
        }),
      )}
    </box>
  );
};

export default Mpris;
