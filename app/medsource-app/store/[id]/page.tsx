'use client'
import React from 'react'
import AddEditForm from '@/components/Store/Products/AddEditForm'

import Link from 'next/link'
import Routes from '@/services/routes'

const page = () => {
	return (
		<div className='store-page creation-container'>
			<div className='header mb-6'>
				
				<Link href={`${Routes.InternalAppRoute}/store`}>
				<i className="fa-solid fa-chevron-left"/>
				Back to store</Link>
			</div>
			<h3>Create a product</h3>
			<AddEditForm />
		</div>
	)
}

export default page
