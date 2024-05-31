import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import WrapperHandler from '@/components/WrapperHandler'
import { IUser } from '@/classes/User'
import '@/styles/store.css'
import Sidebar from '@/components/Sidebar'
import Breadcrumb from '@/components/Navigation/BreadCrumb'

export const metadata: Metadata = {
	title: 'The best app ever. Trust me. I know. I made it. I Aint No Lie',
	description: 'Generated by two prodigies.',
}

async function getUserData(token: string | null) {
	if (token == null) return token

	try {
		const response = await fetch(process.env.API_URL + '/account', {
			cache: 'no-store',
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})

		if (response.ok) return await response.json()
	} catch (err) {
		console.error(err)
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
		<div className='App'>
			<Sidebar />
			<Breadcrumb />
			<WrapperHandler User={response.payload as IUser} />
			{children}
		</div>
	)
}
