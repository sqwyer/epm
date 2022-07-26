import type { NextPage } from "next";
import Head from "next/head";
// import { trpc } from "../utils/trpc";
import { signIn, useSession } from "next-auth/react";
import App from "../components/App";

const Home: NextPage = () => {
	const { data: session, status } = useSession();

	return (
		<>
			<Head>
				<title>Create T3 App</title>
				<meta name="description" content="Generated by create-t3-app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			{session?.user ? (
				<App></App>
			) : (
				<div>
					<button onClick={() => signIn("google")}>
						Login with Google
					</button>
				</div>
			)}
		</>
	);
};

export default Home;
