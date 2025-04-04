import { bind } from "astal";
import Hyprland from "gi://AstalHyprland";

const hyprland = Hyprland.get_default();

function Client() {
  return (
    <label
      label={bind(hyprland, "focused_client").as((fc) => fc.initialTitle)}
    />
  );
}

export default Client;
