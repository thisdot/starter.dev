type IAction = 'plus' | 'minus';
interface INumericIput {
	line: any;
	onClick: (action: IAction) => void;
}

const NumericIput = ({ line, onClick }: INumericIput) => {
	if (!line || typeof line?.quantity === 'undefined') return null;
	const { id: lineId, quantity } = line;
	const prevQuantity = Number(Math.max(0, quantity - 1).toFixed(0));
	const nextQuantity = Number((quantity + 1).toFixed(0));

	const modifyQuantity = (action: IAction) => {
		onClick(action);
	};

	return (
		<>
			<label htmlFor={`quantity-${lineId}`} className="sr-only">
				Quantity, {quantity}
			</label>
			<div className="flex justify-center items-center border rounded">
				<button
					name="decrease-quantity"
					aria-label="Decrease quantity"
					className="w-10 h-10 transition text-primary/50 hover:text-primary disabled:text-primary/10 outline-none"
					value={prevQuantity}
					disabled={quantity <= 1}
					onClick={() => modifyQuantity('minus')}
				>
					<span>&#8722;</span>
				</button>

				<div className="px-2 text-center" data-test="item-quantity">
					{quantity}
				</div>

				<button
					className="w-10 h-10 transition text-primary/50 hover:text-primary outline-none"
					name="increase-quantity"
					value={nextQuantity}
					aria-label="Increase quantity"
					onClick={() => modifyQuantity('plus')}
				>
					<span>&#43;</span>
				</button>
			</div>
		</>
	);
};

export default NumericIput;
