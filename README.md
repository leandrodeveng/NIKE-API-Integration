# NIKE-API-Integration

<center> A plataforma de chatbot possui limitação de caracteres na recepção de payloads de api's externas, dessa forma, para o chatbot nike, quando o cliente possui muitos pedidos, não é possível autentica-lo
<br>
<br>

## Atividade:
Para conseguirmos ter acesso aos dados de produtos encontrados pela api nike, será necessário criar uma api na qual ela receba o cpf do cliente e retorne o count e os ultimos 5 produtos.

<br>

CPF de teste: 
464.972.498-85

## Curl

```
curl --request GET \
  --url 'https://ibot.ifcdns.com.br:7790/api/Order/cpf?=&cpf=464.972.498-85' \
  --header 'Content-Type: application/json'
```
<br>
