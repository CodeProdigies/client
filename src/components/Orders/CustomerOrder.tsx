'use client'

import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import '@/styles/App/orderPage.css'

import API from '@/services/api'
import { Product } from '@/classes/Product'
import Order, { OrderItem } from '@/classes/Order'
import IsBusyLoading from '@/components/isBusyLoading'
import UserOrdersPage from '@/components/Orders/UserOrdersPage'
import Company from '@/src/classes/Company'
import Routes from '@/services/routes'

function CustomerOrder(context: any) {
	const router = useRouter()

	const [order, setOrder] = useState<Order | null>(null)
	const [productsList, setProducts] = useState<Product[]>([])
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [customers, setCustomers] = useState<Company[]>([])

	const getOrder = async () => {
		if (context.params.id == 'create') return
		try {
			setIsLoading(true)
			const { data } = await API.Orders.get<Order>(parseInt(context.params.id as string))
			if (!data.payload) toast.error(`Order with id #${context.params.id} not found!`)

			return data.payload
		} catch (err) {
			console.error(err)
		} finally {
			setIsLoading(false)
		}
	}

	const fetchCustomers = async () => {
		try {
			setIsLoading(true)
			const { data } = await API.Customers.getAll<Company>()
			if (!data.payload) toast.error('Unable to retrieve the list of available customers...')

			setCustomers(data.payload?.map((customer) => new Company(customer)) ?? [])
		} catch (err) {
			console.error(err)
		} finally {
			setIsLoading(false)
		}
	}

	const getProducts = async () => {
		try {
			setIsLoading(true)
			const { data } = await API.Store.Products.getAllProducts()
			if (!data.payload) toast.error('Unable to retrieve the list of available products...')

			return data.payload
		} catch (err) {
			console.error(err)
		} finally {
			setIsLoading(false)
		}
	}

	useEffect(() => {
		const fetchData = async () => {
			const [orderData, products] = await Promise.all([getOrder(), getProducts(), fetchCustomers()])

			if (!products) {
				setTimeout(() => {
					router.push(`${Routes.InternalAppRoute}/orders`)
				}, 3000)

				return
			}

			setOrder(new Order(orderData ?? {}))
			setProducts(products.map((x) => new Product(x)))
		}

		fetchData()
	}, [])

	if (isLoading || !order) return <IsBusyLoading isBusy={true} />

	return (
		<div style={{ height: '100%', width: '100%' }} className='flex items-center justify-center text-center h-1 w-1'>
			<UserOrdersPage products={productsList} order={order} customers={customers} />
		</div>
	)
}

export default CustomerOrder
