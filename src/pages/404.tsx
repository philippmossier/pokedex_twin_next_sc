import { useRouter } from 'next/router';
import { ReactElement } from 'react';
// General ErrorPage if a unknown route is used
const ErrorPage = (): ReactElement => {
  const router = useRouter();
  return (
    <div>
      <div>This route does not exist.</div>
      <button onClick={() => router.push('/')}>Back to Home</button>
    </div>
  );
};

export default ErrorPage;
