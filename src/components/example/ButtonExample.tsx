import tw, { css, styled, theme } from 'twin.macro';

interface ButtonProps {
  isPrimary?: boolean;
  isSecondary?: boolean;
  isSmall?: boolean;
  disabled: boolean;
  boxWidth?: number;
}

const ButtonExample = styled.button(({ isPrimary, isSecondary, isSmall, disabled, boxWidth }: ButtonProps) => [
  // The common button styles
  tw`text-lg px-4 py-2 rounded-lg focus:outline-none`,
  tw`transform transition-transform duration-75`,

  // non boolean props need to be handled with css
  boxWidth &&
    css`
      width: ${boxWidth}rem;
    `,

  // Use the variant grouping feature to add variants to multiple classes
  !disabled && tw`hocus:(scale-105 text-blue-300)`,

  disabled && tw`opacity-50`,
  // Use props to conditionally style your components
  isPrimary && tw`bg-gray-700 text-white border-black`,

  // Combine regular css with tailwind classes within backticks
  isSecondary && [
    css`
      box-shadow: 0 0.1em 0 0 rgba(0, 0, 0, 0.25);
    `,
    tw`border-2 border-yellow-600`,
  ],

  // Conditional props can be added
  isSmall ? tw`text-sm` : tw`text-lg`,

  // The theme import can supply values from your tailwind.config.js
  css`
    color: ${theme`colors.white`};
  `,
]);

export default ButtonExample;

// ---------------------- Can be used like this: -----------------------------

// import tw, { styled } from 'twin.macro';
// import { ButtonExample, LogoExample } from '../components/example'

// const ButtonEasy = tw.button`bg-yellow-400 text-black rounded-md py-2 px-4`;
// const ButtonAdvanced = styled.button(()=> [
//   tw`items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white `,
//   tw`bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`,
// ]);

// const App = () => (
//   <div
//     css={[
//       tw`flex flex-col items-center justify-center h-screen`,
//       tw`bg-gradient-to-b from-electric to-ribbon`,
//     ]}
//   >
//     <div tw="flex flex-col justify-center h-full space-y-5">
//        <ButtonExample isPrimary>Button1</ButtonExample>
//        <ButtonExample isSecondary>Button2</ButtonExample>
//        <ButtonExample isSmall>Button3</ButtonExample>
//        <ButtonEasy>ButtonEasy</ButtonEasy>
//        <ButtonAdvanced>ButtonAdvanced</ButtonAdvanced>
//     </div>
//     <LogoExample />
//   </div>
// )

// export default App
