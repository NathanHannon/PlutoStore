var db_connection = require('../database/database_connection');
var express = require('express');
var router = express.Router();

//get all categories
router.get('/product/category',(request,response,next) =>{

    db_connection.query('SELECT * FROM productcategory', (error, result) =>{
        if(error){
            return next(error);
        }
        response.status(200).json(result.rows);
    });
});

//get a category
router.get('/product/category/:id', (request,response,next) =>{
    const id = parseInt(request.params.id);
    db_connection.query('SELECT * FROM productcategory WHERE categoryid = $1', [id], (error,result) =>{
        if(error){
            return next(error);
        }    
        response.status(200).json(result.rows);
    });
});

//add a category
router.post('/product/category/add', (request, response, next) =>{
    const {categoryname} = request.body;
    db_connection.query('INSERT INTO productcategory (categoryname) VALUES($1)', [categoryname], (error,result) =>{
        if(error){
            return next(error);
        }
        response.status(200).json("Product category successfully been added");
    });
});

router.put('/product/category/update', (request,response, next) =>{
    const {categoryid, categoryname} = request.body;
    db_connection.query('UPDATE productcategory SET categoryname=$1 WHERE categoryid =$2', [categoryname, categoryid], (error, result) =>{
        if(error){
            return next(error);
        }
        response.status(200).json("Product category update");
    });
});

router.delete('/product/category/delete',(request,response,next) =>{
    const{categoryid} = request.body;
    db_connection.query('DELETE FROM productcategory WHERE categoryid=$1', [categoryid], (error, result) =>{
        if(error){
            return next(error);
        }
        response.status(200).json("Product category has successfully been deleted");
    });
});

module.exports = router;