import "@mantine/core/styles.css";
import { MantineProvider, ColorSchemeScript } from "@mantine/core";
import Provider from "./context/client-provider";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]/route";

export const metadata = {
	title: "Hírkezelő API",
	description: "Készítette: Pavlik Dániel",
};

export default async function RootLayout({ children }) {
	const session = await getServerSession(authOptions);

	return (
		<html lang="hu">
			<head>
				<ColorSchemeScript />
			</head>
			<body>
				<MantineProvider>
					<Provider session={session}>{children}</Provider>
				</MantineProvider>
			</body>
		</html>
	);
}
