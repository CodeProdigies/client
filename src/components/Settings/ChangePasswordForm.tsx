'use client'

import React from 'react'
import InputTextBox from '../InputTextBox'
import API from '@/services/api'
import { toast } from 'react-toastify'

import { Formik, Form } from 'formik'
import FormInputTextBox from '@/components/FormInputTextbox'
import Validations from '@/utilities/validationSchemas'

class PasswordForm {
	oldPassword: string = ''
	newPassword: string = ''
	confirmNewPassword: string = ''
}

const ChangePasswordForm = () => {
	const [loading, setLoading] = React.useState(false)

	const handleSubmit = async (e: PasswordForm) => {
		try {
			setLoading(true)
			const response = await API.account.changePassword<Boolean>(e.oldPassword, e.newPassword)

			if (response && response.data.statusCode === 200) return toast.success(response.data.message)
			else toast.error(response.data.message)
		} catch (err: any) {
			toast.error(err.message)
		} finally {
			setLoading(false)
		}
	}

	return (
		<div>
			<h2>Account</h2>

			<Formik
				enableReinitialize={true}
				initialValues={new PasswordForm()}
				validationSchema={Validations.changePasswordSchema}
				onSubmit={(values, { setSubmitting }) => {
					handleSubmit(values)
					setSubmitting(false)
				}}>
				{(form) => (
					<Form className='min-h-96 flex flex-col gap-8 w-2/4 relative'>
						<FormInputTextBox<PasswordForm> label='Old Password' name='oldPassword' type='password' />
						<FormInputTextBox<PasswordForm> label='New Password' name='newPassword' type='password' />
						<FormInputTextBox<PasswordForm>
							label='Confirm New Password'
							name='confirmNewPassword'
							type='password'
						/>

						<button type='submit' disabled={!form.isValid || loading}>
							{loading ? <i className='fa-solid fa-spinner animate-spin'></i> : 'Change Password'}
						</button>
					</Form>
				)}
			</Formik>
		</div>
	)
}

export default ChangePasswordForm
