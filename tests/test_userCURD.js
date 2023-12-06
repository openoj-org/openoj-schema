const express = require('express');

const app = express();
const port = 3000;
const router = express.Router();

router.post('')

app.use('/test/user', router);

app.get('/', (req, res) => {
  res.send('在 user/test 下测试 user 模块的 CURD');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});


module.exports = {
	// 查询允许注册的邮箱后缀 email_suffix 列表
	select_email_suffixes,
	// 根据 id 查询用户信息
	select_user_by_id,
	// 根据 email 查询用户信息
	select_user_by_email,
	// 根据 name 查询用户信息
	select_user_by_name,

	select_full_user_by_email,
	select_full_user_by_id,
	select_full_user_by_name,

	// 根据某一参数 order 按 increase 升序或降序排列，
	// 查询用户名含前缀为 usernameKeyword 的用户列表，
	// 返回第 start 至 end 个结果组成的列表
	select_users_by_param_order,
	// 使用用户名 name, 密码哈希 passwordHash, 邮箱 mail,
	// 角色 role, 签名 signature 注册用户
	insert_user,
	// 更新给定 id 的用户属性 param 为 value
	update_user,
	// 注销给定 id 的用户
	delete_user
};