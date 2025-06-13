import { App, Astal, Gdk, Gtk } from "astal/gtk4";
import Bluetooth from "./Bluetooth";
import Calendar from "./Calendar";
import Hyprland from "./Hyprland";
import Workspaces from "./Hyprland/workspaces";
import Internet from "./Internet";
import Memory from "./Memory";
import Mpris from "./Mpris";
import OS from "./OS";
import Pywal from "./Pywal";
import SwayNC from "./SwayNC";
import Tray from "./Tray";
import WirePlumber from "./WirePlumber";

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
          <Workspaces />
          <Tray />
          <Hyprland.Client />
        </box>
        <box halign={Gtk.Align.CENTER}>
          <Mpris />
        </box>
        <box halign={Gtk.Align.END}>
          <Pywal />
          <WirePlumber />
          <Internet />
          <Bluetooth />
          <Memory />
          <Calendar />
          <SwayNC />
        </box>
      </centerbox>
    </window>
  );
}
