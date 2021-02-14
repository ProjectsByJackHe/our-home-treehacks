require("dotenv").config();
const axios = require('axios')
/**
 * POST /
 * sendcheck to some user
 */
exports.sendcheck = async (req, res, next) => {
    const API_KEY = process.env.CHECK_BOOK_API_KEY; 
    const API_SECRET = process.env.CHECK_BOOK_API_SECRET;
    let info = req.body; 
    console.log(info);
    const headers = {
        'Accept': 'application/json',
        'Authorization': API_KEY + ":" + API_SECRET
    }
    if (!(info.recipient && info.name && info.amount && info.description)) {
        res.status(400);
        return res.json({
            status: "failure", 
            message: "insufficient information"
        });
    } 
    const body = {
        "recipient": info.recipient, 
        "name": info.name, 
        "amount": parseInt(info.amount), 
        "description": info.description
    }
    try {
        let response = await axios.post(String(process.env.CHECK_BOOK_SENDCHECK), body, { headers: headers });
        res.json({
            status: "success", 
            message: response.data
        })
    } catch (err) {
        res.json({
            status: "failure", 
            message: err
        })
    }
};
  


/**
 * POST /
 * request payment from some user 
 */
exports.requestPayment = async (req, res, next) => {
    const API_KEY = process.env.CHECK_BOOK_API_KEY; 
    const API_SECRET = process.env.CHECK_BOOK_API_SECRET;
    let info = req.body; 
    console.log(info);
    const headers = {
        'Accept': 'application/json',
        'Authorization': API_KEY + ":" + API_SECRET
    }
    if (!(info.recipient && info.name && info.amount && info.description)) {
        res.status(400);
        return res.json({
            status: "failure", 
            message: "insufficient information"
        });
    } 
    const body = {
        "recipient": info.recipient, 
        "name": info.name, 
        "amount": parseInt(info.amount), 
        "description": info.description
    }
    try {
        let response = await axios.post(String(process.env.CHECK_BOOK_SENDINVOICE), body, { headers: headers });
        res.json({
            status: "success", 
            message: response.data
        })
    } catch (err) {
        res.json({
            status: "failure", 
            message: err
        })
    }
};