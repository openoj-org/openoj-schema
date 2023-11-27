const express = require('express');

const app = express();
const port = 3000;
const router = express.Router();

const {
	select_mail_code_by_id,
	select_mail_code_by_mail,
	insert_mail_code,
	update_mail_code,
	delete_mail_code
} = require('../../CURDs/mailCodeCURD');

router.post('/insert_mail_code', (req, res) => {
	let { mail, code_number } = req.body;
	insert_mail_code(mail, code_number).then(ret => {
		res.json(ret);
	}).catch(err => {
		res.json(err);
	})
});

router.post('/update_mail_code', (req, res) => {
	let { id, code_number } = req.body;
	update_mail_code(id, code_number).then(ret => {
		res.json(ret);
	}).catch(err => {
		res.json(err);
	})
});

router.post('/delete_mail_code', (req, res) => {
	let { id } = req.body;
	delete_mail_code(id).then(ret => {
		res.json(ret);
	}).catch(err => {
		res.json(err);
	});
});

router.get('/select_mail_code_by_id', (req, res) => {
	let { id } = req.query;
	select_mail_code_by_id(id).then(ret => {
		res.json(ret);
	}).catch(err => {
		res.json(err);
	});
});

router.get('/select_mail_code_by_mail', (req, res) => {
	let { mail } = req.query;
	select_mail_code_by_mail(mail).then(ret => {
		res.json(ret);
	}).catch(err => {
		res.json(err);
	});
});

router.get('/', (req, res) => {
  res.send('在 /test/user 下测试 user 模块的 CURD');
});

app.use('/test/user', router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});