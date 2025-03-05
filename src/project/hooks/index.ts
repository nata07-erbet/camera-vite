import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux';
import type { TState, TAppDispatch } from '../store/state';

const useAppDispatch = () => useDispatch<TAppDispatch>();
const useAppSelector: TypedUseSelectorHook<TState> = useSelector;

export { useAppDispatch, useAppSelector };
