import React, { useState, ChangeEvent } from 'react'
import InputTextBox from '@/components/InputTextBox'
import NotificationBell from '@/components/Navigation/NotificationBell'
import classNames from 'classnames'
import ProfilePreview from '../ProfilePreview'

function CustomerNavBar() {
	const [searchText, setSearchText] = useState('')
	
	const [hasFloatingButton, setHasFloatingButton] = useState(true)
	const handleSearchTextChange = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchText(e.currentTarget.value)
	}


	return (
		<header className='header customer'>
			<nav className='navbar'>
				<div className='app-title-container'>
					(())
					<a href='/'>MEDSOURCE</a>
				</div>
				<div className='navbar-container'>
					<div className={classNames({ 'search-container': true, 'is-hidden': hasFloatingButton })}>
						<button className='floating-button' onClick={() => setHasFloatingButton(!hasFloatingButton)}>
							<i className='fa-solid fa-magnifying-glass' />
						</button>

						<InputTextBox
							value={searchText}
							type='text'
							handleChange={handleSearchTextChange}
							icon='fa-solid fa-magnifying-glass'
							autofocused={true}
						/>
					</div>
					<NotificationBell />
					<ProfilePreview />
				</div>
			</nav>
		</header>
	)
}

export default CustomerNavBar
