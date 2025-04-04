import { bind } from "astal";
import Network from "gi://AstalNetwork";

function Internet() {
  const network = Network.get_default();

  const icon = (strength: number) => {
    if (strength > 80) {
      return "󰤨";
    }
    if (strength > 60) {
      return "󰤥";
    }
    if (strength > 40) {
      return "󰤢";
    }
    if (strength > 20) {
      return "󰤟";
    }
    return "󰤯";
  };

  return (
    <box>
      <label
        cssClasses={["Label"]}
        label={bind(network, "wifi").as(
          (w) => `${icon(w.strength)}  ${w.strength}%`,
        )}
        hasTooltip={true}
        tooltip_text={bind(network, "wifi").as((w) => w.ssid)}
      />
    </box>
  );
}

export default Internet;
