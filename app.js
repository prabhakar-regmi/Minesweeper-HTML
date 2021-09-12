// dependencies
const express = require('express');
const path = require('path');

const app = new express();
app.set('port', process.env.PORT || 1000);

app.use(express.static(path.join(__dirname, 'Public/')));

app.get('/',(req,res)=>{
    var index_path = path.join(__dirname, 'Public/HTML/index.html');
    res.sendFile(index_path);
});

var port = app.get('port');
app.listen(port, ()=>{
    console.log(`Listening to port ${port}`);
})




