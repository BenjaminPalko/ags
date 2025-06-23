import { Gdk, Gtk } from "astal/gtk4";
import GLib from "gi://GLib?version=2.0";
import Rsvg from "gi://Rsvg?version=2.0";

interface SvgProps {
	color?: string;
	path: string;
	rotation?: number;
	size?: number;
}

export function Svg({
	color = "#cac9c9",
	path,
	rotation = 0,
	size = 24,
}: SvgProps) {
	const svgString = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" transform="rotate(${rotation} 12 12)" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${path}</svg>`;
	const bytes = new GLib.Bytes(new TextEncoder().encode(svgString));
	const texture = Gdk.Texture.new_from_bytes(bytes);

	return Gtk.Image.new_from_paintable(texture);
}
