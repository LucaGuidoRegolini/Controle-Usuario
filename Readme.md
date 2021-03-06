# Resumo

Projeto que usa typescript e node no seu backend, além de tecnologias como webpack para maior otimização, e Vue em seu frontend, seguido de bibliotecas como Vuex e vue-routes.



# Aplicativo Online

Link: https://controler-user.netlify.app/

API: https://user-control-123aa.herokuapp.com/



# Instalação

### backend

para usar a API basta fazer o download do repositório, na pasta raiz, basta usar esses comandos

```cmd
cd backend
npm i
npm start
```

é necessário ter o Node instalado, ao terminar o processo pode-se acessar a API em 

http://localhost:3000/



### frontend

para usar o aplicativo basta fazer o download do repositório, na pasta raiz, basta usar esses comandos

```cmd
cd frontend
npm i
npm run serve
```

é necessário ter o Node instalado, ao terminar o processo pode-se acessar a aplicação em 

http://localhost:8000/



# Documentação

## Users

Comandos para gerenciamento de usuários



### POST Create User

http://localhost:3000/users

Cria um usuário, é necessário enviar o token no cabeçario



Authorization: Bearer Token



```
{
  "name": "nome do usuario",
  "nickname": "nickname dousuario",
  "password": "senha do usuario"
}
```

### PUT Update User

[Open Request  ]()

http://localhost:3000/users/:id

Altera o **nickname** e **password** do usuário, é necessário enviar o token no cabeçario



Authorization: Bearer Token



```
{
  "nickname": "nickname",
  "password": "password"
}
```

### GET Index User

http://localhost:3000/users/:id

Mostra os dados de um usuário, é necessário enviar o token no cabeçario



Authorization: Bearer Token



### GET List Users

[Open Request  ]()

http://localhost:3000/users/

Lista usuários do administrador, pode usar o paramns **name** para filtrar os resultados, é necessário enviar o token no cabeçario



Authorization: Bearer Token

### DEL Delete User

http://localhost:3000/users/:id

Deleta um usuário, é necessário enviar o token no cabeçario





Authorization: Bearer Token

### POST Login

http://localhost:3000/user/login

O usuário pode logar usando seu **name** e **password**, recebera o token de acesso



```
{
  "name": "name",
  "password": "password"
}
```

### GET Me user

Mostra os dado do usuário logado, é necessário enviar o token de usuário no cabeçario



Authorization:Bearer Token



## Admins

Comandos para gerenciamento de administradores



### POST Create

http://localhost:3000/admin

Cria um usuário



```
{
  "name": "admin name",
  "email": "admin email",
  "password": "admin password"
}
```

### POST Login

http://localhost:3000/admin/login

Faz o login do admin na aplicação, recebera o token de acesso



```
{
  "email": "admin email",
  "password": "admin password"
}
```

### GET Me admin

http://localhost:3000/admin/me

Mostra os dados do admin logado, é necessário enviar o token de usuário no cabeçario



Authorization: Bearer Token

### DEL Delete Admin

http://localhost:3000/admin/me

Deleta os dados do admin logado, é necessário enviar o token de usuário no cabeçario



Authorization: Bearer Token