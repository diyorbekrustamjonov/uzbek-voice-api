const express = require('express')
const ovozchiFun = require("./speaker")
const PORT = process.env.PORT || 3000
const path = require("path")
const app = express()
app.use(express.json())

app.use("/api", (req, res, next) => {
    if(req.query.text){
        if(req.query.text.trim().length >= 5){
            next()
        }else{
            res.status(401).json({
                message: "Text too short",
                code: 401
            })
        }
    }else{
        res.status(401).json({
            message: "Text not found",
            code: 401
        })
    }
}, async (req, res) => {
    ovozchiFun({
        text: req.query.text
    }, function(buffer){
        //get buffer and send it to client
        //set header to audio/wav
        res.setHeader('Content-Type', 'audio/wav')
        // and send it to client download it
        res.end(buffer)
    })
})


app.get("/", (req, res) => {
    res.json({
        message: "api not found"
    })
})

const start = () => {
    try{
        app.listen(PORT, () => console.log("Server listening on https://localhost:" + PORT))
    }catch(e){
        console.log(e)
    }
}

start()