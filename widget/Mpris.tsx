import { bind, Variable } from "astal";
import AstalMpris from "gi://AstalMpris";

function IntegerToMinuteSeconds(value: number) {
  const minutes = Math.floor(value / 60);
  const seconds = Math.floor(value - minutes * 60);
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function FormatLabel(player: AstalMpris.Player) {
  return `${player.title} - ${player.artist} [${IntegerToMinuteSeconds(player.position)}/${IntegerToMinuteSeconds(player.length)}]`;
}

const Mpris = function () {
  const mpris = AstalMpris.get_default();

  mpris.connect("player-added", () => {
    players.set(mpris.players);
  });
  mpris.connect("player-closed", () => {
    players.set(mpris.players);
  });

  const players = Variable<Array<AstalMpris.Player>>(mpris.players);

  const label = Variable.derive([players], (players) => {
    const player = players[0];
    if (!player.title || !player.artist || !player.position || !player.length) {
      return "";
    }
    return FormatLabel(player);
  });

  label.subscribe((value) => print(value));

  return (
    <box>
      <label
        label={bind(label)}
        onScroll={(self, dx, dy) => {
          dy > 0 ? print("BLING!") : print("BANG!");
        }}
      />
    </box>
  );
};

export default Mpris;
