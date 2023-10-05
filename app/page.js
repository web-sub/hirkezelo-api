"use client";

import { Avatar, Button, Container, CopyButton, Grid, GridCol, Group, Stack, Text, Title } from "@mantine/core";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

export default function Page() {
	const { data, status } = useSession();

	if (status === "loading") {
		return <p>Loading...</p>;
	}

	if (status === "unauthenticated") {
		return (
			<>
				<Container p="lg">
					<Stack align="center">
						<Title>Jelentkezz be az Hírkezelő API oldal használatához.</Title>
						<Text>A hozzáférési tokent sikeres belépés után kapod meg.</Text>
						<Button size="lg" onClick={() => signIn("google")}>
							Bejelentkezés Google-el
						</Button>
					</Stack>
				</Container>
			</>
		);
	}

	return (
		<>
			<Container p="lg">
				<Group justify="center" mb="xl">
					<Button size="md" prefetch={false} component={Link} href="/api-doc">
						Dokumentáció
					</Button>
					<Button size="md" variant="outline" onClick={() => signOut()}>
						Kijelentkezés
					</Button>
				</Group>
				<Stack align="center">
					<Avatar src={data.user.image} size="lg" />
					<Title ta="center">Üdvözöllek {data.user.name} !</Title>
					<Text ta="center" maw="40rem">
						A hozzáférési token segítségével tudod használni a Hírkezelő API-t akár a ?token= paraméter használatával az url-ben, vagy Bearer tokenként elküldve.
					</Text>
					<CopyButton value={data.user.access_token}>
						{({ copied, copy }) => (
							<Button size="lg" color={copied ? "teal" : "blue"} onClick={copy}>
								{copied ? "Hozzáférési token kimásolva" : "Hozzáférési token másolása"}
							</Button>
						)}
					</CopyButton>
				</Stack>
			</Container>
		</>
	);
}
