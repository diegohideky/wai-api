# WAI API

## Descrição

Este projeto tem como objetivo atender todas as necessidades de back-end do sofwater da WAI.
É fornecido para o [WAI UI](https://github.com/diegohideky/wai-ui) os dados gerenciados por esta API.

## Ferramentas utilizados

Node JS v8.9.4
Nodemon v1.14.7
NPM v5.6.0
MongoDB v3.6.0

## Variáveis de ambiente

ADMIN_CREATE - define se deve-se criar um admin no sistema.

## Rodando o servidor

Rode `node index.js` para iniciar a API, esta será em http://localhost:3000
Caso queira definir alguma variável de ambiente rode `NOME_DA_VARIAVEL=VALOR node index.js`

## Rodando com Nodemon

Nodemon é uma ferramenta para que se você modificar qualquer arquivo a API reinicie automaticamente.
Rode `nodemon index.js`


### Observações

Sempre que atualizar ou baixar este projeto rode `npm install` para atualizar as dependências
Não se esqueça de ter MongoDB instalado na sua máquina e funcionando corretamente. Dependências antigas, erradas ou a falte de, podem comprometer o funcionamento da API.
