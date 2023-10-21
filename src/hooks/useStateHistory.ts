import {useRef, useState, useEffect} from 'react';

export function useStateHistory<T>(
    initialValue?: T | (() => T),
): [
    T | undefined,
    (state: T) => void,
    Array<T | number | string | boolean | undefined>,
] {
    const stateHistoryRef = useRef<
        Array<T | number | string | boolean | undefined>
    >([]);
    const [state, setState] = useState<T | undefined>(initialValue);

    useEffect(() => {
        stateHistoryRef.current = [...stateHistoryRef.current, state];
    }, [state]);

    const historyState = stateHistoryRef.current;

    const isIncludeEl = (key: number | string | boolean): boolean => {
        return historyState.includes(key);
    };

    return [state, setState, isIncludeEl, historyState];
}
