'use client'
import React, { useEffect } from 'react'
import InputTextBox from '../InputTextBox'
import { User } from '@/classes/User'
import { useAccountStore } from '@/src/stores/user'
import API from '@/services/api'
import { toast } from 'react-toastify'

import { Formik, Form, FormikProps } from 'formik'
import FormInputTextBox from '@/components/FormInputTextbox'
import Validations from '@/utilities/validationSchemas'

const UpdateProfileForm = () => {
	const { User: UserFromStore } = useAccountStore((state) => state)
	const [loading, setLoading] = React.useState(false)

	const handleSubmit = async (UserData: User) => {
		try {
			setLoading(true)
			const response = await API.account.update<Boolean>(UserData)

			if (response && response.data.statusCode != 200) return toast.error(response.data.message)
			toast.success(response.data.message)
			useAccountStore.setState({ User: UserData })
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
				initialValues={UserFromStore}
				validationSchema={Validations.profileSchema}
				onSubmit={(values, { setSubmitting }) => {
					handleSubmit(values)
					setSubmitting(false)
				}}>
				{(form) => (
					<Form>
						<FormInputTextBox label='First Name' name='firstName' />
						<FormInputTextBox label='Last Name' name='lastName' />
						<FormInputTextBox label='Email Address' name='email' />
						<button type='submit' className='btn btn-primary' disabled={!form.isValid || loading}>

						{loading ? <i className="fa-solid fa-spinner animate-spin"></i> : "Update Profile" }
						</button>
					</Form>
				)}
			</Formik>
		</div>
	)
}

export default UpdateProfileForm
