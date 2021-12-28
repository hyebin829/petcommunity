const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport');

const { User } = require('../models');

router.post('/login', (req, res, next) => {
  //(서버에러,성공객체,정보)
  passport.authenticate('local', (err, user, info) => {
    //서버에러가 발생했을 경우
    if (err) {
      console.error(err);
      return next(err);
    }
    //클라이언트 에러가 발생했을 경우
    if (info) {
      return res.status(401).send(info.reason);
    }
    return req.login(user, async loginErr => {
      //passport의 로그인 처리에서 에러가 발생할 경우
      if (loginErr) {
        return next(loginErr);
      }
      return res.status(200).json(user);
    });
  })(req, res, next);
});

router.post('/', async (req, res, next) => {
  try {
    const exUser = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (exUser) {
      return res.status(403).send('이미 사용중인 아이디입니다.');
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    await User.create({
      email: req.body.email,
      password: hashedPassword,
    });
    res.status(201).send('ok');
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post('/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  res.send('logoutDone');
});

module.exports = router;
