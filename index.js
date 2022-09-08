const express = require('express')
const { shortestWord } = require('./function')

const longestWord = require('./function').longestWord
const shortest = require('./function').shortestWord
const wordLength = require('./function').wordLength
const phoneBill = require('./function').totalPhoneBill
const enoughAirtime = require('./function').enoughAirTime

const app = express()
    
app.use(express.static('public'))    

app.get('/api/word_game',(req,res)=>{
    const {sentence} = req.query

    if(!sentence) res.json({
        error : 'sentence not found!'
    })

    res.json({
        "message" : sentence.toUpperCase(),
        "longestWord": longestWord(sentence),
        "shortestWord" : shortest(sentence),
        "sum": wordLength(sentence)
    })
})

let callPrice = 2.75
let smsPrice = 0.65

app.get('/api/phonebill/prices', (req, res) => {

    res.json({
        call : callPrice,
        sms : smsPrice
    })
})

app.post('/api/phonebill/total',(req,res)=>{
    const {bill} = req.query
    res.json({
        "total" : phoneBill(bill,callPrice,smsPrice)
    })
})

app.post('/api/phonebill/price', (req, res) => {

    const type = req.body.type
    const price = req.body.price

    if(type === 'sms') {
        smsPrice = price
    } 
    else if(type === 'call') {
        callPrice = price
    }

    res.json ({
        type, price
    })
});

app.post('/api/enough',(req,res)=>{
    const {usage,airtimeAvailable} = req.query
    res.json({
        "results" : enoughAirtime(usage,airtimeAvailable)
    })
})

const PORT = process.env.PORT || 8080;

app.listen(PORT,()=>{
    console.log('app running on port 8080')
})