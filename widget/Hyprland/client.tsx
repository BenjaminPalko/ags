import { bind } from "astal";
import Hyprland from "gi://AstalHyprland";

const hyprland = Hyprland.get_default();

function Client() {
  return (
    <label
      cssClasses={["no-styles"]}
      label={bind(hyprland, "focused_client").as((fc) => fc.initialTitle)}
    />
  );
}

export default Client;
