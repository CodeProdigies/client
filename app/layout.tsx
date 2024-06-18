import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Medsource',
	description: 'A marketplace with all the medical supplies you need',
}

export default async function RootLayout(props: any) {


	return (
		<html lang='en'>
			<body>
				<main className='page-container'>
					{props.children}
				</main>
			</body>
		</html>
	)
}
