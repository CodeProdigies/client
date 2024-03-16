'use client'

import React, { useEffect, useState } from 'react'
import API from '@/services/api'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { Product } from '@/classes/Product'
import { useParams } from 'next/navigation'

import { Formik, Form } from 'formik'
import FormInputTextBox from '@/components/FormInputTextbox'
import Validations from '@/utilities/validationSchemas'

const AddEditForm = () => {
	const router = useRouter()
	const params = useParams()

	const [product, setProduct] = useState(new Product())
	const [loading, setLoading] = useState(false)

	const getProduct = async () => {
		try {
			setLoading(true)
			const { data: res } = await API.store.products.get<Product>(params?.id.toString())

			if (res.statusCode === 404) toast.error('The product with the given ID not found.')
			else if (res.payload) {
				setProduct(res.payload)

				console.log(res.payload)
			}
		} catch (err: any) {
			toast.error(err?.message)
		} finally {
			setLoading(false)
		}
	}

	const createProduct = async (prdct: Product) => {
		try {
			setLoading(true)
			const { data: res } = await API.store.products.create<Product>(prdct)
			if (!res.payload || res.statusCode !== 200) return toast.error(res.message)

			toast.success(res.message)
			router.push('/dashboard/store')
		} catch (error: any) {
			toast.error(error.message)
		} finally {
			setLoading(false)
		}
	}

	const updateProduct = async (prdct: Product) => {
		try {
			setLoading(true)
			const { data: res } = await API.store.products.update<Product>(prdct)
			if (!res.payload || res.statusCode !== 200) return toast.error(res.message)

			toast.success(res.message)
			router.push('/dashboard/store')
		} catch (error: any) {
			toast.error(error.message)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		if (!params.id || params.id == 'create') return

		getProduct()
	}, [params.id])

	return (
		<Formik
			enableReinitialize={true}
			initialValues={product}
			validationSchema={Validations.store.productSchema}
			onSubmit={async (values) => {
				if (params?.id == 'create') await createProduct(values)
				else await updateProduct(values)
			}}>
			{({ isSubmitting, isValid, values }) => (
				<Form className='crudForm'>
					<FormInputTextBox<Product> label='Product Name' autofocused={true} name='name' />
					<FormInputTextBox<Product> label='SKU' name='sku' />
					<FormInputTextBox<Product> label='Product Price' name='price' />
					<FormInputTextBox<Product> label='Product Description' name='description' />

					<button type='submit' disabled={isSubmitting || !isValid || !values.name || loading}>
						{loading ? (
							<i className='fa-solid fa-spinner animate-spin' />
						) : params?.id == 'create' ? (
							'Add Product'
						) : (
							'Update Product'
						)}
					</button>
				</Form>
			)}
		</Formik>
	)
}

export default AddEditForm
