import { useForm } from 'react-hook-form';
import tw, { styled } from 'twin.macro';
import { useRouter } from 'next/router';

type FormData = {
  pokemonName: string;
};

type Props = {
  isNavbar?: boolean;
};

const Input = styled.input(({ isNavbar }: Props) => [
  tw`pl-10 pr-2 py-2 border border-transparent rounded-md leading-5 text-gray-300 placeholder-gray-400 focus:(outline-none border-white ring-white bg-white text-gray-900) sm:text-sm`,
  !isNavbar && tw`w-72 bg-gray-800`,
  isNavbar && tw`w-full bg-gray-700`,
]);

const SearchForm = ({ isNavbar }: Props) => {
  const { register, handleSubmit } = useForm<FormData>();
  const router = useRouter();

  const onSubmit = handleSubmit(({ pokemonName }) => {
    router.push(`/details/${pokemonName.toLowerCase()}`);
  });

  return (
    <form onSubmit={onSubmit}>
      <Input
        isNavbar={isNavbar}
        required
        name="pokemonName"
        ref={register}
        placeholder="Search Pokemon by Name or Id"
        title="dummySearch"
      />
    </form>
  );
};
export default SearchForm;
