import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface ICartProps {
	openCartDrawer: boolean;
	openMenuDrawer: boolean;
}

const initialState: ICartProps = {
	openCartDrawer: false,
	openMenuDrawer: false,
};

const useAppStore = create(
	devtools<ICartProps>(() => initialState, { name: 'app-store' })
);
export default useAppStore;
