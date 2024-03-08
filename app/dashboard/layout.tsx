import type { Metadata } from 'next'
import { headers } from 'next/headers'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { useAccountStore } from '@/src/stores/user'
import API from '@/src/services/api'
import WrapperHandler from '@/src/components/WrapperHandler'
import NavBar from '@/src/components/NavBar'
import { IUser } from '@/src/classes/User'

export const metadata: Metadata = {
	title: 'The best app ever. Trust me. I know. I made it. I Aint No Lie',
	description: 'Generated by two prodigies.',
}

async function getUserData(token: string | null) {
	if (token == null) return token

	try {
		const response = await fetch(process.env.API_URL + '/account/myuser', {
			cache: 'no-store',
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})

		if (response.ok) return await response.json()
	} catch (err) {
		console.log(err)
	}

	return null
}

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	const cookiesStore = cookies()
	const token = cookiesStore.get('at')

	// Load user data into state management library.
	if (token == null) return redirect('/login')
	const response = await getUserData(token.value)
	if (response?.payload == null) return redirect('/login')

	return (
		<html lang='en'>
			<WrapperHandler User={response.payload as IUser} />

			<body>
				<div className='App'>
					<NavBar />
					<div className='page-container'>{children}</div>
				</div>
			</body>
		</html>
	)
}
