const express = require('express')
const app = express()

app.get("/api", (req, res) => {
    res.json({"mockData": ["item1", "item2", "item3"]})
})

// server running on port 3001
app.listen(3001, () => {
    console.log("Server started on port 3000...")
})