import React from 'react'

const ComponentWithError = () => {
	React.useEffect(() => {
		throw new Error('This is a test error thrown by ComponentWithError.')
	}, [])

	return null
}

export default ComponentWithError