import { bind, derive, Variable } from "astal";
import { Gdk } from "astal/gtk4";
import AstalMpris from "gi://AstalMpris";
import { Mathf } from "../util/Mathf";

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
  status: AstalMpris.PlaybackStatus;
}) {
  return `${player.status === AstalMpris.PlaybackStatus.PLAYING ? "" : ""} ${player.title} - ${player.artist} [${IntegerToMinuteSeconds(player.position)}/${IntegerToMinuteSeconds(player.length)}]`;
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

          if (!activePlayer) {
            return <></>;
          }

          return (
            <button
              cursor={Gdk.Cursor.new_from_name("pointer", null)}
              onClicked={() =>
                activePlayer.playbackStatus ===
                AstalMpris.PlaybackStatus.PLAYING
                  ? activePlayer.pause()
                  : activePlayer.play()
              }
              onScroll={(_, __, dy) => {
                activeIndex.set(
                  Mathf.clamp(
                    activeIndex.get() - Mathf.sign(dy),
                    0,
                    players.length - 1,
                  ),
                );
              }}
            >
              <label
                label={bind(
                  derive(
                    [
                      bind(activePlayer, "title"),
                      bind(activePlayer, "artist"),
                      bind(activePlayer, "position"),
                      bind(activePlayer, "length"),
                      bind(activePlayer, "playback_status"),
                    ],
                    (title, artist, position, length, status) =>
                      FormatLabel({ title, artist, position, length, status }),
                  ),
                )}
              />
            </button>
          );
        }),
      )}
    </box>
  );
};

export default Mpris;
