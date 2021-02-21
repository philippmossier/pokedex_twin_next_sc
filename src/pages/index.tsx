import tw from 'twin.macro';
import List from '../components/List';

const Wrapper = tw.div`flex flex-col items-center justify-center h-screen bg-gradient-to-b from-indigo-100 to-indigo-600`


const App = () => (
<Wrapper>
  <List/>
</Wrapper>
)

export default App

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
//     <ButtonExample isPrimary>Button1</ButtonExample>
//       <ButtonExample isSecondary>Button2</ButtonExample>
//       <ButtonExample isSmall>Button3</ButtonExample>
//       <ButtonEasy>ButtonEasy</ButtonEasy>
//       <ButtonAdvanced>ButtonAdvanced</ButtonAdvanced>
//     </div>
//     <LogoExample />
//   </div>
// )

// export default App

