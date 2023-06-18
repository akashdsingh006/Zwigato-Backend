const express=require('express')
const app=express();

const mongoDB=require('./db');
const F_URL=process.env.F_URL

const port=5000 || process.env.PORT

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin);

  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
  });

mongoDB()
app.use(express.json())
app.use('/api', require('./Routes/CreateUser'));

app.use('/api', require('./Routes/LoginUser'));

app.use('/api', require('./Routes/DisplayData'));

app.use('/api', require('./Routes/OrderData'));

app.use('/api',require('./Routes/MyOrderData'))

app.get('/',async(req,resp)=>{
    resp.send('Working')
    console.log('Working server')
    
})



app.listen(`${port}`)