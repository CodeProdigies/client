'use client'
import '@/styles/Landing.css'
import '@/app/globals.css'
import Image from 'next/image'
import Logo from '@/public/Logo.png'
import { submitForm } from '@/app/actions'
import { useFormState, useFormStatus } from 'react-dom'

export default function Home() {
	const [state, formAction] = useFormState(submitForm, { email: '', message: '' })
	
	const SubmitButton = () => {
		const { pending } = useFormStatus()

		return (
			<button type='submit' disabled={pending}>
				{pending ? 'Submitting ...' : 'Notify Me'}
			</button>
		)
	}

	return (
		<div className='landing-page'>
			<Image src={Logo} alt='Logo' />
			<div className='form-container'>
				<h3>Under Construction👷🏽</h3>
				{state.message ? (
					<p>{state.message}</p>
				) : (
					<p>If you&apos;d like to be notified when we&apos;re ready, please leave us your email!</p>
				)}
				{!state.message && (
					<form action={formAction}>
						<div className='InputTextBox flex flex-col'>
							<input type='email' placeholder='Email' name='email' required />
						</div>

						<SubmitButton/>
					</form>
				)}
			</div>
		</div>
	)
}
