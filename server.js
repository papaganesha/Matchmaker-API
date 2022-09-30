const app = require('./app')
const mongoose = require('mongoose')

console.log('\n============================ MATCHMAKER ============================')

mongoose.connect(process.env.MONGO_CONNECTION_URL, {
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    dbName: process.env.MONGO_DB_NAME
})
.then(()=>console.log('Conexão com Banco de Dados estabelecida ✔️'))
.catch(err => console.log(err))


app.listen(process.env.PORT || 3000, () => {
    console.log(`Server rodando na porta ${this.PORT} ✔️`)
})