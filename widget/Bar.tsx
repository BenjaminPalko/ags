import { App, Astal, Gdk, Gtk } from "astal/gtk4";
import Calendar from "./Calendar";
import Hyprland from "./Hyprland";
import Internet from "./Internet";
import Mpris from "./Mpris";
import OS from "./OS";
import Pywal from "./Pywal";
import Tray from "./Tray";

export default function Bar(gdkmonitor: Gdk.Monitor) {
  const { TOP, LEFT, RIGHT } = Astal.WindowAnchor;

  return (
    <window
      visible
      cssClasses={["Bar"]}
      gdkmonitor={gdkmonitor}
      exclusivity={Astal.Exclusivity.EXCLUSIVE}
      anchor={TOP | LEFT | RIGHT}
      application={App}
    >
      <centerbox cssName="centerbox">
        <box halign={Gtk.Align.START}>
          <OS />
          <Tray />
          <Hyprland.Client />
        </box>
        <box halign={Gtk.Align.CENTER}>
          <Mpris />
        </box>
        <box halign={Gtk.Align.END}>
          <Pywal />
          <Internet />
          <Calendar />
        </box>
      </centerbox>
    </window>
  );
}
