// 按照模块分开,不然这个文件越来越长
// 注意防止命名冲突,每一组 action 里面加上自己的文件名称,参考 account.js
import account from './account';
import user from './user';

let actions = [].concat(
    account,
    user
);
const _actions = {};
actions.forEach((action) => _actions[action] = action);
export default _actions;
