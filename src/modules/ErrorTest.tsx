import * as React from 'react';
import { Button, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import ErrorBoundary from 'react-native-error-boundary';

import ComponentWithError from './ErrorComp'
import { log } from '../utils/log';

export function handleJSErrorForErrorBoundary(error: any, stackTrace: string) {
	// Show error locally on DEBUG mode
	log("trayce", stackTrace);
	log("error", error);
	// Send error to Sentry
	// return Sentry.captureException(error);
}


const ErrorFallback = (props) => {

	return (
		<View style={styles.container} >
			<Text style={styles.title}>Something happened!</Text>
			<Text style={styles.text}>{props.error.toString()}</Text>
			<TouchableOpacity onPress={props.resetError}>
				<Text>reset state error</Text>
			</TouchableOpacity>
		</View >
	)
}

const ErrorTest = () => {
	const [isErrorComponentVisible, setIsErrorComponentVisible] = React.useState(false)

	return (
		<ErrorBoundary
			onError={handleJSErrorForErrorBoundary}
			FallbackComponent={ErrorFallback}>
			<View style={styles.container}>
				<Text style={styles.icon}>🐛</Text>
				<Text style={styles.title}>
					react-native-error-boundary
				</Text>
				<Text style={styles.text}>
					Click on the following button to render a component that will throw an error.
				</Text>
				<Button title='Throw error' onPress={() => setIsErrorComponentVisible(true)} />
				{isErrorComponentVisible && <ComponentWithError />}
			</View>
		</ErrorBoundary>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',

		backgroundColor: '#ecf0f1',
		padding: 8,
		textAlign: 'center',
	},
	title: {
		fontSize: 18,
		fontWeight: 'bold',
		textAlign: 'center',
	},
	icon: {
		fontSize: 48
	},
	text: {
		marginVertical: 16
	}
});

export default ErrorTest