'use client'

import React, { useState, useEffect } from 'react'
import { SortColumn, TableColumn } from '@/interfaces/Table'
import { useRouter } from 'next/navigation'
import { Product } from '@/classes/Product'
import { toast } from 'react-toastify'
import _ from 'lodash'

import Link from 'next/link'
import API from '@/services/api'
import Table from '@/common/table'
import IsBusyLoading from '@/components/isBusyLoading'

const Page = () => {
	const route = useRouter()
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [allProducts, setAllProducts] = useState<Product[]>([])

	const columns: TableColumn<Product>[] = [
		{
			name: 'name',
			label: 'Name',
		},
		{
			name: 'description',
			label: 'Description',
		},
		{
			name: 'category',
			label: 'Category',
		},
		{
			name: 'price',
			label: 'Price',
		},
		{
			key: 'edit',
			label: 'Edit',
			content: (product) => <Link href={`store/${product.id}`}>Edit</Link>,
		},
		{
			key: 'delete',
			label: 'Delete',
			content: (product) => (
				<button className='delete' onClick={() => deleteProduct(product.id!)}>
					Delete
				</button>
			),
		},
	]

	const retrieveProducts = async () => {
		try {
			setIsLoading(true)
			const { data: res } = await API.Store.Products.getList<Product[]>()

			if (!res.payload || res.statusCode !== 200) {
				toast.error(res.message)
				return
			}
			const productsList = res.payload
			setAllProducts(productsList)
		} catch (err: any) {
			toast.error(err.message)
		} finally {
			setIsLoading(false)
		}
	}

	const deleteProduct = async (productId: string) => {
		try {
			setIsLoading(true)
			const { data: res } = await API.Store.Products.delete<string>(productId)
			if (res.statusCode !== 200) {
				toast.error(res.message)
				return
			} else {
				toast.success(res.message)
				const productsList = allProducts.filter((product) => product.id !== productId)
				setAllProducts(productsList)
			}
		} catch (err: any) {
			toast.error(err.message)
		} finally {
			setIsLoading(false)
		}
	}

	useEffect(() => {
		retrieveProducts()
	}, [])

	if (isLoading)
		return (
			<div className='store-page'>
				<h2 className='page-title'>Products</h2>
				<IsBusyLoading />
			</div>
		)
	else
		return (
			<div className='store-page'>
				<h2 className='page-title'>Products</h2>
				<div className='products-container'>
					{!allProducts.length ? (
						<h3>No Items found for this search...</h3>
					) : (
						<Table<Product>
							columns={columns}
							data={allProducts}
							isSortable={true}
							isSearchable={true}
							isPaged={true}
						/>
					)}
				</div>
				<button className='mt-7' onClick={() => route.push('store/create')}>
					Create Product
				</button>
			</div>
		)
}

export default Page