import { bind } from "astal";
import { exec, Variable } from "astal";
import { Gdk } from "astal/gtk4";

type SwayNCOptions = {
  text: string;
  alt: "none" | "notification" | "dnd-none" | "dnd-notification";
  tooltip: string;
  class: "notification" | "dnd-notification";
};

function Icon(alt: SwayNCOptions["alt"]) {
  switch (alt) {
    case "none": {
      return "󰂜";
    }
    case "notification": {
      return "󰅸";
    }
    case "dnd-none": {
      return "󱏨";
    }
    case "dnd-notification": {
      return "󱏨";
    }
  }
}

const SwayNC = function () {
  const options = Variable<SwayNCOptions | null>(null).watch(
    "swaync-client -swb",
    (stdout, prev) => {
      return JSON.parse(stdout) as SwayNCOptions;
    },
  );

  return (
    <button
      cursor={Gdk.Cursor.new_from_name("pointer", null)}
      onClicked={() => exec("swaync-client -t -sw")}
      label={options().as((options) => Icon(options?.alt ?? "none"))}
    ></button>
  );
};

export default SwayNC;
