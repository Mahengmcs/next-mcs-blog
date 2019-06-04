/*
 * @Description: 
 * @Author: edison
 * @Date: 2019-01-16 14:23:27
 * @LastEditors: edison
 * @LastEditTime: 2019-01-26 17:55:31
 */

 const express = require('express')
 const next = require('next')
 const path = require('path')
 const dev = process.env.NODE_ENV != 'production'
 const app = next({dev})
 const handle = app.getRequestHandler()

 app.prepare()
 .then(() => {
    const server = express()
    server.use(express.static(path.join(__dirname,'static')))
    server.get('/d/:id',(req,res) => {
        const actualPage = '/blogDetails'
        const queryParams = {id: req.params.id,type:  req.params.type}
        app.render(req,res,actualPage,queryParams)
    })
    server.get('*',(req,res) => {
        return handle(req,res)
    })
    server.listen(3000, (err) => {
        if(err) throw err
        console.log('> Ready on http://localhost:3000')
    })
 })
 .catch(ex => {
     console.log(ex.stack)
     process.exit(1)
 })