const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {
    async index(request, response) {
        const ongs = await connection('ongs').select('*');
        return response.json(ongs);
    },

    async create(request,response){
        // const params = request.query;   //Query params - parametros nomeados enviados na rota após o ? (utilizado para filtros e paginaçao)
        // const params2 = request.params; //Route params -  por exemplo o id do usuario depois do /users/ 
        // const body = request.body;      //Request body - json enviado em post ou put para criar ou alterar recursos

        const {name, email, whatsapp, city, uf} = request.body;

        const id = crypto.randomBytes(4).toString('HEX');

        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf
        });

        return response.json({id});
    }
};