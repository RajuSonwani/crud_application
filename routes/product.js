const express = require('express');
const router = express.Router();
const db_connection = require('../database')



/* get product home page. */
router.get('/', function (req, res) {
    let query = 'select* from products';
    db_connection.query(query, (err, rows, fields) => {
        if (err) throw err;
        // res.json(rows);
        res.render('product', { title: 'Welcome to MySql Database', products: rows });
    })
});

router.get('/form', function (req, res) {
    res.render('productform', { title: 'Add Product Details' });
});

router.post('/form', function (req, res) {
    let sno = req.body.sno;
    let item = req.body.item;
    let price = req.body.price;
    // console.log(sno, item, price);
    let query = `insert into products values(${sno},'${item}',${price})`;
    db_connection.query(query, (err) => {
        if (err) {
            console.log(err)
        };
        res.redirect('/product');

    })
});

router.get('/edit/:id', function (req, res) {
    let id = req.params.id;
    // console.log(typeof(id));
    // console.log(id);
    let query = `select* from products where sno=${id}`;
    db_connection.query(query, (err, rows, fields) => {
        if (err) throw err;
        // res.json(rows);
        // console.log(rows[0].sno)
        res.render('editproduct', { title: 'Edit Your Product Details Here..!', products: rows[0] });
    })
})

router.post('/update/:id', function (req, res) {
    let id = req.params.id;
    let sno = req.body.sno;
    let item = req.body.item;
    let price = req.body.price;
    let query = `update products set sno=${sno}, item='${item}', price=${price} where sno=${id}`;
    db_connection.query(query, (err) => {
        if (err) throw err;
        // res.json(rows);
        // console.log(rows[0].sno)
        res.redirect('/product')});
});

router.get('/delete/:id', function (req, res) {
    let id = req.params.id;
    // console.log(typeof(id));
    // console.log(id);
    let query = `delete from products where sno=${id}`;
    db_connection.query(query, (err) => {
        if (err) throw err;
        // res.json(rows);
        // console.log(rows[0].sno)
        res.redirect('/product');
    })
})



module.exports = router;
