const express = require('express');
const fs = require('fs')

const app = express();
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended :false}))
app.use(bodyParser.json())

//全部请求通过
app.all("*",function(req,res,next){
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Headers","X-request-With,content-type");
    res.setHeader("Access-Control-Allow-Methods","GET,POST,DELETE,PUT,OPTIONS")
    // 放行/下一步 
    next()
})

//get请求
//获取用户数据
app.get('/getUser',(req,res)=>{
    fs.readFile('./user.json',(err,data)=>{
        if(err){
            console.log('读取失败')
            return
        }
        console.log('读取成功')
        res.send(data)
    })

})
//获取购物车
app.get('/getCars',(req,res)=>{
    fs.readFile('./cars.json',(err,data)=>{
        if(err){
            console.log('读取失败')
            return
        }
        console.log('读取成功')
        res.send(data)
    })
})
//添加购物车
app.post('/postCart',(req,res)=>{
    fs.readFile('./cars.json',(err,data)=>{
        if(err){
            console.log('读取失败')
            return
        }
        let stringData = data.toString()
        // 
        let jsonData = JSON.parse(stringData)
        let parseData = req.body
        parseData['id'] = (jsonData.data.length + 1).toString()
        jsonData.data.push(parseData)
        let strData = JSON.stringify(jsonData)
        console.log('读取成功',strData)

        fs.writeFileSync('./cars.json',strData,err=>{
            if(err){
                console.log('写入失败')
                return
            }else{
                console.log('写入成功')
                return
            }
        });
    })
})

//获取商品
app.get('/getCommodity',(req,res)=>{
    let id = req.query.id
    fs.readFile('./commodity.json',(err,data)=>{
        if(err){
            console.log('读取失败')
            return
        }
        if(!!id){
            let shangping = JSON.parse(data).dependencies.shangping
            shangping.forEach(e => {
                if(e.id == parseInt(id)){
                    res.send(e)
                    return
                }
            });
        }else{
            res.send(data)
        }
    })
})

//获取类型
app.get('/getType',(req,res)=>{
    fs.readFile('./type.json',(err,data)=>{
        if(err){
            console.log('读取失败')
            return
        }
        console.log('读取成功')
        res.send(data)
    })
})



//启动服务端口
app.listen(8080,()=>{
    console.log('server started 8080')
})