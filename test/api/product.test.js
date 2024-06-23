const { spec, request } = require('pactum');
const { eachLike, like } = require('pactum-matchers');

request.setBaseUrl('http://lojaebac.ebaconline.art.br');

let token;
beforeEach(async () => {
    token = await spec()
        .post('/public/authUser')
        .withJson({
            "email": "admin@admin.com",
            "password": "admin123"
        })
        .expectStatus(200)  // Certifique-se de que o login foi bem-sucedido
        .returns('data.token');
    
    console.log('Token:', token);  // Verifique se o token está sendo gerado corretamente
});

it('Deve adicionar produto', async () => {
    
    await spec()
        .post('/api/addProduct')
        // .withHeaders('authorization', `Bearer ${token}`)
        .withJson({
            "name": "Bolsa de praia",
            "price": "100",
            "quantity": "10",
            "categories": "Bags",
            "description": "Bolsa de praia em palha",
            "photos": "",
            "popular": "true",
            "visible": "true",
            "location": "Várzea Alegre, CE, Brasil",
            "additionalDetails": "Detalhes adicionais do produto",
            "specialPrice": "90"
        })
        .expectStatus(200)
        .expectJsonMatch({
            data: {
                Products: eachLike({
                    name: like("Bolsa de praia"),
                })
            }
        
        })
});

// it('Deve editar produto', async () => {
//     const produtoId = await spec()
//         .post('/produto')
//         .withHeaders('authorization', `Bearer ${token}`)
//         .withJson({
//             "name": "Produto para Editar",
//             "photo": "url_da_foto"
//         })
//         .returns('data.id');

//     await spec()
//         .put(`/produto/${produtoId}`)
//         .withHeaders('authorization', `Bearer ${token}`)
//         .withJson({
//             "name": "Produto Editado",
//             "photo": "url_da_nova_foto"
//         })
//         .expectStatus(200)
//         .expectJson({
//             "message": "Produto editado com sucesso"
//         });
// });

// it('Deve deletar produto', async () => {
//     const produtoId = await spec()
//         .post('/produto')
//         .withHeaders('authorization', `Bearer ${token}`)
//         .withJson({
//             "name": "Produto para Deletar",
//             "photo": "url_da_foto"
//         })
//         .returns('data.id');

//     await spec()
//         .delete(`/produto/${produtoId}`)
//         .withHeaders('authorization', `Bearer ${token}`)
//         .expectStatus(200)
//         .expectJson({
//             "message": "Produto deletado com sucesso"
//         });
// });
