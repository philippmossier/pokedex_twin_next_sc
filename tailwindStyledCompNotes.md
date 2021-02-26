# twin.macro tricks

## Inline style way

Note: tw tag does not support string interpolation but style tag or css tag does

```ts
<div tw="bg-indigo-400 text-xs leading-none py-1 text-center text-white" style={{ width: `${convNum(st.base_stat)}%` }}>
        {st.base_stat}
</div>
```
