const express = require("express");
const app = express.Router();
const axios = require("axios");
const { pool } = require(`../../mysql`)


//현재 날짜를 yyyy-mm-dd 포맷으로 리턴
function getCurrentDate()
{
    const date = new Date();
    const year = date.getFullYear().toString();

    let month = date.getMonth() + 1;
    month = month < 10 ? '0' + month.toString() : month.toString();

    let day = date.getDate();
    day = day < 10 ? '0' + day.toString() : day.toString();

    return year + '-' + month + '-' + day ;
}



app.get("/", async (req, res) =>{
    try {
        const [rows, fields] = await pool.query('SELECT * FROM refreci.UserProduct WHERE uID = 1')
        
        for (let i = 0; i < rows.length; i++){
            console.log(rows[i])
            // res.send({
            //     PN : rows[i].productName,
            //     PC : rows[i].productCount,
            //     DATE : rows[i].createdDate,
            //     END_DATE : rows[i].productShelfLife
            // })
        }

        res.json(rows)
    }
    catch (err) {
        console.log(err)
        return new Error(err)
    }

})
//재료 삽입
app.post("/", async (req, res) =>{
    const nowDay = getCurrentDate()
    try {
        const uID = req.body.uID
        const productName = req.body.productName
        const productCount = req.body.productCount
        const productClassification1 = req.body.productClassification1
        const productClassification2 = req.body.productClassification2
        const productShelfLife = req.body.productShelfLife

        if (!productName || !productCount || !productClassification1 || !productClassification2 || !productShelfLife) {
            return res.status(404).json({ message: "post does not exist" });
        }
        const sql = `INSERT INTO refreci.UserProduct
        (uID, productName, productCount, createdDate, productClassification1, productClassification2, productShelfLife, isDeleted)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?);`
        
    
        await pool.query(sql,[uID, productName, productCount, nowDay,productClassification1, productClassification2, productShelfLife, 0])

        console.log('Call Updated DB')
        const [rows, fields] = await pool.query('SELECT * FROM refreci.UserProduct WHERE uID = 1')
        res.redirect('/')
        for (let i = 0; i < rows.length; i++){
            console.log(rows[i])
        }
    }
    catch (err) {
        console.log(err);
        return new Error(err)
    }

})
//재료명 수정시 소분류 매핑 방법을 생각해 보아야할 듯
app.put("/", async (req, res) =>{
    try {
        console.log(req.body);
        const upID = req.body.upID
        const productName = req.body.productName
        const productCount = req.body.productCount
        const productClassification1 = req.body.productClassification1
        const productClassification2 = req.body.productClassification2
        const productShelfLife = req.body.productShelfLife
    
        const sql = `UPDATE refreci.UserProduct
        SET productName = ?, productCount = ?, productClassification1 = ?, productClassification2 = ?, productShelfLife =  ?
        WHERE upID = ?;`
        console.log("Update DB by PUT Method")
        await pool.query(sql,[productName, productCount, productClassification1, productClassification2, productShelfLife, upID])
        res.redirect('/')
        // 테스트를 위한 냉장고 DB 호출 코드

        console.log('Call Updated DB')
        const [rows, fields] = await pool.query('SELECT * FROM refreci.UserProduct WHERE uID = 1')
    
        for (let i = 0; i < rows.length; i++){
            console.log(rows[i])
        }
    }
    catch (err) {
        console.log(err);
        return new Error(err)
    }
})

app.delete('/', async (req, res) => {
    try{
        const uID = req.body.uID
        const upID = req.body.upID
        await pool.query('DELETE FROM refreci.UserProduct WHERE uID = ? and upID = ?;',[uID,upID])
        // 테스트를 위한 냉장고 DB 호출 코드

        console.log('Call Updated DB')
        const [rows, fields] = await pool.query('SELECT * FROM refreci.UserProduct WHERE uID = 1')
            
        for (let i = 0; i < rows.length; i++){
            console.log(rows[i])
        }
    }
    catch (err) {
        console.log(err);
        return new Error(err)
    }
})


module.exports = app;