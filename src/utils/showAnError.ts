import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { Alert } from 'react-native';

/**
 * Type predicate to narrow an unknown error to `FetchBaseQueryError`
 */
export function isFetchBaseQueryError(error: unknown): error is FetchBaseQueryError {
	return typeof error === 'object' && error != null && 'status' in error;
}

/**
 * Type predicate to narrow an unknown error to an object with a string 'message' property
 */
export function isErrorWithMessage(error: unknown): error is { message: string } {
	return (
		typeof error === 'object' &&
		error != null &&
		'message' in error &&
		typeof (error as unknown).message === 'string'
	);
}

export const showAnError = (err: unknown) => {
	if (isFetchBaseQueryError(err)) {
		// you can access all properties of `FetchBaseQueryError` here
		const errMsg = 'error' in err ? err.error : JSON.stringify(err.data);
		Alert.alert(errMsg);
		return;
	}
	if (isErrorWithMessage(err)) {
		// you can access a string 'message' property here
		Alert.alert(err.message);
		return;
	}
	Alert.alert(String(err));
};
