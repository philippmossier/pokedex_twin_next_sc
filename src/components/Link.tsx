import React from 'react';
import NextLink from 'next/link';

// LinkWrapper to get rid of nextJS ref warnings (https://github.com/vercel/next.js/issues/7915)
const LinkWrapper = React.forwardRef(LinkWrap);

function LinkWrap({ children, refAs, ...props }: any, ref: any) {
  if (refAs) {
    props[refAs] = ref;
  }
  return <>{React.isValidElement(children) ? React.cloneElement(children, props) : null}</>;
}

const Link = ({ refAs, children, ...props }: any) => {
  return (
    <NextLink {...props}>
      <LinkWrapper refAs={refAs}>{children}</LinkWrapper>
    </NextLink>
  );
};
export default Link;
