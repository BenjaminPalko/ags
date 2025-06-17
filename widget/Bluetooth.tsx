import { Binding } from "astal";
import { bind, derive } from "astal";
import AstalBluetooth from "gi://AstalBluetooth";

const DeviceList = function ({
	devices,
}: {
	devices: Binding<AstalBluetooth.Device[]>;
}) {
	return (
		<box vertical>
			{devices.as((devices) => {
				return devices.map((device) => {
					const name = bind(device, "name");
					const connected = bind(device, "connected");

					return (
						<button
							label={bind(
								derive(
									[name, connected],
									(name, connected) => `${connected ? "󰂱" : ""} ${name}`,
								),
							)}
						/>
					);
				});
			})}
		</box>
	);
};

const Bluetooth = function () {
	const bluetooth = AstalBluetooth.get_default();

	const devices = bind(bluetooth, "devices");
	const count = devices.as((devices) => devices.length);

	return (
		<menubutton>
			<label label={devices.as((devices) => `󰂯 ${devices.length}`)} />
			<popover>
				<DeviceList devices={devices} />
			</popover>
		</menubutton>
	);
};

export default Bluetooth;
