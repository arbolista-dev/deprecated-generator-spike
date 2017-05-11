import hook from 'node-hook';

const noOp = () => {};
hook.hook('.scss', noOp);
hook.hook('.css', noOp);
