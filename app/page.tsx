import Link from 'next/link'
import Image from 'next/image'
import DoctorsImage from '@/public/LandingImage1.png'

import '@/styles/Landing.css'

import Intro from '@/src/components/Landing/Intro'
import ProductsCarousel from '@/src/components/Landing/ProductsCarousel'
import SalesPitch from '@/src/components/Landing/SalesPitch'
import Products from '@/src/components/Landing/Products'
import ContactUs from '@/src/components/Landing/ContactUs'

import FAQ from '@/src/components/Landing/FAQ'

export default function Home() {
	return (
		<div className='Home'>
			<div className='landing'>
				<div className='page-header image-container'>
					<Image priority src={DoctorsImage} alt='Doctors Image' width={1920} height={1080} />
				</div>
				<section className='hero-section'>
					<h2 className='page-title'>
						Welcome to <br />
						<strong>Medsource!</strong>
					</h2>
					<Intro />
				</section>
			</div>

			<div className='page-body'>
				<ProductsCarousel />
				<SalesPitch />
				<Products />
				<FAQ />
				<ContactUs />
			</div>
		</div>
	)
}
