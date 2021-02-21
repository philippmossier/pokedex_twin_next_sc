import React, {FC} from 'react';
import 'twin.macro';

type Props = {
	name: string,
	id: string,
}

const PokeCard: FC<Props> = ({name, id}) => {
	console.log('id', id)
		return (
			<div tw="bg-green-200 rounded-2xl shadow-md m-5 py-2 px-6 text-center">
				<div tw="w-32 h-32 text-center">
					<img tw="mt-5 max-w-full bg-transparent" src={`https://pokeres.bastionbot.org/images/pokemon/${id}.png`}/>
				</div>
	
				<div tw="mt-5">
					<span tw="bg-gray-300 rounded-lg text-sm py-1 px-2">{`#${id}`}</span>	
					<h3 tw="mt-4 mb-2 tracking-wide uppercase font-medium">{name}</h3>
				</div>

			</div>
		);
};

export default PokeCard;