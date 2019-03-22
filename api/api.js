var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var todoSchema = require('../mongodb/ToDoSchema');
var userSchema = require('../mongodb/UserSchema');


router.post('/addItem', function(req,res,next){
  let item = {};
  item.note = req.body.note;
  item.completed = false;
  item.update_time = new Date().getTime();

  todoSchema.create(item, function(err,data){
    if(err){
      next(err)
      res.json({code:'400', msg:'err'})
    }else{
      res.json({code:'200', msg:'添加成功', data:data})
    }
  })

});


//用户注册
router.post('/register',function(req, res, next){
    let name = req.body.name;
    let password = req.body.password;
    let comfirmPassword  = req.body.comfirmPassword ;
    if(password!==comfirmPassword){
        res.json({
            code:500,
            msg:'两次输入的密码不一致'
        })
        return;
    }
    console.log(req.body)

    userSchema.findOne({'name':name},function(err,data){
        if(err){
            res.json({code: 500, msg: '数据库查询出错'});
            return;
        }
        if(data!=null){
            console.log(data);
            res.json({code:500, msg:'用户名已存在'});
            return;
        }

        //对密码进行加密
        var hash = crypto.createHash('sha1');
        hash.update(password);
        password = hash.digest('hex');

        var userInfo = {};
        userInfo.name = name;
        userInfo.password = password;
        console.log(userInfo)

        userSchema.create(userInfo, function(err,data){
            if(err){
                res.json({code:500, msg:'创建用户失败'})
            }else{
                res.json({code:200, msg:'注册成功'})
            }
        })
    });

})


//用户登录功能
router.post('/login', function(req, res, next){
    var name = req.body.name;
    var password = req.body.password;

    userSchema.findOne({name:name}, function(err,data){
        if(err){
            res.json({code:500, msg: '用户名查询出错'});
            return;
        }

        if(data==null){
            res.json({code:500, msg: '用户不存在'})
            return;
        }

        var hash = crypto.createHash('sha1');
        hash.update(password);
        password = hash.digest('hex');

        //将用户名和加密后的密码继续查询
        userSchema.findOne({name:name, password:password}, function(err,data){
            if(err){
                res.json({code: 500, msg: '登陆失败'});
                return;
            }

            if(data==null){
                res.json({code:500, msg:'密码错误'});
                return
            }

            //匹配，将此条用户的时间更新，用于后期可以知道该用户最后登录的时间
            userSchema.findOneAndUpdate({name:name, password: password},{update_time: new Date().getTime()}, function(err,data){
                if(err){
                    res.json({code:500, msg:'登录失败'});
                }else{
                    res.json({code:200, msg: '登录成功'})
                }
            })
        })
    })  

})



module.exports = router;
