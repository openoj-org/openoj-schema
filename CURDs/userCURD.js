
const { querySql, queryOne, modifySql } = require('../utils/index');

function select_email_suffixes() {
	return querySql(`SELECT * FROM email_suffixes;`)
	.then(email_suffixes => {
		if (!email_suffixes || email_suffixes.length == 0) {
			return {
				haveList: false,
				suffixList: null,
				message: '邮箱后缀列表为空'
			};
		} else {
			return {
				haveList: true,
				suffixList: email_suffixes,
				message: '邮箱后缀列表查询成功'
			};
		}
	})
	.catch(err => {
		return {
			haveList: false,
			suffixList: null,
			message: err.message
		};
	});
}

// 根据 id 查询用户信息
function select_user_by_id(id) {
	return select_first_user_info_by_param('user_id', id);
}

// 根据 email 查询用户信息
function select_user_by_email(email) {
	return select_first_user_info_by_param('user_email', email);
}

// 根据 name 查询用户信息
function select_user_by_name(name) {
	return select_first_user_info_by_param('user_name', name);
}

// 根据 id 查询用户全部信息
function select_full_user_by_id(id) {
	return select_first_user_by_param('user_id', id);
}

// 根据 email 查询用户全部信息
function select_full_user_by_email(email) {
	return select_first_user_by_param('user_email', email);
}

// 根据 name 查询用户全部信息
function select_full_user_by_name(name) {
	return select_first_user_by_param('user_name', name);
}

// 查询参数 param 为 value 的首个用户
function select_first_user_by_param(param, value) {
	return querySql(`SELECT * FROM users WHERE ${param} LIKE '${value}';`)
	.then(users => {
		if (!users || users.length == 0) {
			return {
				success: false,
				message: '用户不存在'
			};
		} else {
			return {
				success: true,
				message: '用户信息查询成功',
				userInfo: users[0]
			};
		}
	})
	.catch(err => {
		return {
			success: false,
			message: err.message
		}
	});
}

// 查询参数 param 为 value 的首个用户的重要信息
function select_first_user_info_by_param(param, value) {
	return select_first_user_by_param(param, value)
	.then(usr => {
		if (usr && usr.success) {
			let userInfo = usr.userInfo;
			return {
				success: true,
				message: '用户信息查询成功',
				username: userInfo.user_name,
				character: userInfo.user_role,
				signature: userInfo.user_signature,
				registerTime: userInfo.user_register_time,
				emailChangeTime: userInfo.user_email_change_time,
				nameChangeTime: userInfo.user_name_change_time,
				pass: userInfo.user_pass_number,
				mail: userInfo.user_email
			};
		}
	})
}

// 根据某一参数排序查询用户列表，返回第 start 至 end 个结果组成的列表
function select_users_by_param_order(order, increase, usernameKeyword, start, end) {
	let sql = `SELECT * FROM users WHERE user_name LIKE '${usernameKeyword}%' `
	          + `ORDER BY ${order} ` + (increase ? 'ASC ' : 'DESC ')
			  + `LIMIT ${start}, ${end};`;
	
	return querySql(sql)
	.then(users => {
		if (!users || users.length == 0) {
			return {
				success: false,
				message: '指定范围内用户不存在',
				count: 0,
				result: null
			};
		} else {
			return {
				success: true,
				message: '用户列表查询成功',
				count: users.length,
				result: users.map(usr => ({
					id: usr.user_id,
					username: usr.user_name,
					character: usr.user_role,
					signature: usr.user_signature,
					registerTime: usr.user_register_time,
					pass: usr.user_pass_number
				}))
			};
		}
	})
	.catch(e => {
		return {
			success: false,
			message: e.message
		}
	});
}

function insert_user(name, passwordHash, mail, role, signature)
{
	var valid = true;
	let userPromise = select_user_by_name(name)
	.then(usr => {
		if (usr && usr.success) {
			valid = false;
			return {
				success: false,
				message: '用户名已注册'
			};
		}
	});
	if (!valid) {
		return userPromise;
	}
	userPromise = select_user_by_email(mail)
	.then(usr => {
		if (usr && usr.success) {
			valid = false;
			res.json({
				success: false,
				message: '邮箱已注册'
			});
		}
	})
	if (!valid) {
		return userPromise;
	}
	// 以上均通过, 则用户名和邮箱可用于注册

	// user_register_time, user_name_change_time,
	// user_email_change_time 在数据库中默认设置为
	// UTC 毫秒数, 而 user_pass_number 默认为 0
	let sql = 'INSERT INTO users(user_name, user_password_hash, user_email, \
		                         user_role, user_signature) ' + 
			  `VALUES('${name}', '${passwordHash}', '${mail}', '${role}', '${signature}');`;
	return querySql(sql)
	.then(result => {
		return {
			success: result.affectedRows != 0,
			message: (result.affectedRows != 0) ? '注册成功' : '注册失败',
			// 自动生成的用户 id
			id: result.insertId
		};
	})
	.catch(err => {
		return {
			success: false,
			message: err.message
		};
	});
}

function update_user(id, param, value)
{
	let sql = `UPDATE users SET ${param} = ${value}`;
	if (param == 'user_name') {
		sql += `, user_name_change_time = ${new Date().getTime()}`;
	} else if (param == 'user_email') {
		sql += `, user_email_change_time = ${new Date().getTime()}`;
	}
	sql += ` WHERE id = ${id}`;
	return querySql(sql)
	.then(result => {
		return {
			success: result.affectedRows != 0,
			message: (result.affectedRows != 0) ? `${param} 更新成功` : '用户不存在'
		};
	})
	.catch(err => {
		return {
			success: false,
			message: err.message
		};
	});
}

function delete_user(id)
{
	return querySql(`DELETE FROM users WHERE user_id = ${id};`)
	.then(result => {
		return {
			success: result.affectedRows != 0,
			message: (result.affectedRows != 0) ? '用户注销成功' : '用户不存在'
		};
	})
	.catch(err => {
		return {
			success: false,
			message: err.message
		};
	});
}

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