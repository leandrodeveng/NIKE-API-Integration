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


## Análise da estrutura dos dados retornados:
Inicialmente realizei uma análise dos dados retornados, para entender a estrutura do Json. Algumas peculiaridades foram encontradas e segui uma linha de raciocínio lógica para processar os dados e resolver o problema proposto. 
Obs: Nesse teste surgiram algumas dúvidas, porém resolvi não recorrer a ajuda, para que pudessem avaliar minha linha de raciocínio e decidirem se está de acordo com o que procuram para a posição. Mas reforço que, num cenário realista de trabalho, recorreria a equipe, e se necessário a terceiros, para sanar dúvidas e buscar a resolução mais adequada para o problema.

## Ordenação para pegar últimos produtos:
Na estrutura retornada não há explicitamente nenhum atributo que indique o período de realização dos pedidos, para que seja possível pegar os últimos pedidos, que consequentemente terão os últimos produtos. Poderia considerar que os pedidos estão ordenados de maneira ascendente, porém é uma abordagem incerta. 
Analisando os dados percebi que o atributo "OrderCode" é o atributo que melhor indica a ordem dos pedidos. Com base na análise dos dados inferi que o "OrderCode" tem uma estrutura do tipo 
`WEB-${sequence}caracter-especial`, onde a sequence é a ordem de pedidos realizados. Com base nisso utilizei essa informação para ordenar os pedidos, para que fosse possível pegar os últimos 5 produtos do cliente.

## Casos de repetição
Precebi que existem casos de repetição de produtos e pedidos na estrutura retornada. Uma ideia para esse caso seria de descartar repetições existentes, porém achei mais adequado seguir outra abordagem. A ideia para resolução foi realizar agrupamentos baseado nos códigos do pedido e do produto. Abaixo detalharei mais sobre os casos e a solução.

## Repetição de Produtos em pedidos:
Existem pedidos com repetição de produtos(baseando-se que a unicidade do produto é dada pelo código do mesmo), por exemplo:
```json
{
   "OrderCode":"WEB-397983570",
   "OrderStatus":"ENTREGUE",
   "PaymentCondition":"MASTERCARD CREDITO/1P",
   "isRefundable":true,
   "Products":[
      {
         "ProductCode":"BV4122-010",
         "Description":"BLUSAO W NSW ESSNTL HOODIE FZ FLC",
         "Size":"P",
         "Quantity":"1",
         "Price":197.99
      },
      {
         "ProductCode":"BV4122-010",
         "Description":"BLUSAO W NSW ESSNTL HOODIE FZ FLC",
         "Size":"P",
         "Quantity":"1",
         "Price":197.99
      }
    ]
}
```
Observando o pedido anterior, nota-se que o pedido "WEB-397983570" contém 2 produtos com exatamente as mesmas características.
O tratamento adotado para esses casos foi de agrupar o produto, ou seja, considerar apenas 1 e incrementar o atributo "Quantity" do mesmo. No caso em que esses produtos fossem os últimos, retornaria o produto de código "BV4122-010" apenas uma vez, porém retornando também o atributo "Quantity" com o somatório da quantidade de produtos repetidos do mesmo.

## Repetição de Pedidos:
Além da repetição de produtos dentro de um pedido, notei que existiam pedidos com duplicatas(baseando-se que a unicidade do pedido é dada pelo código do mesmo), por exemplo:
```json
[
   {
      "OrderCode":"WEB-108698620",
      "OrderStatus":"ENTREGUE",
      "PaymentCondition":"MASTERCARD CREDITO/1P",
      "isRefundable":true,
      "Products":[
         {
            "ProductCode":"AQ3951-258",
            "Description":"CAMISETA MANGA CURTA M NSW TEE CLTR ACG",
            "Size":"P",
            "Quantity":"1",
            "Price":29.95
         },
         {
            "ProductCode":"AQ3951-258",
            "Description":"CAMISETA MANGA CURTA M NSW TEE CLTR ACG",
            "Size":"P",
            "Quantity":"1",
            "Price":29.95
         },
         {
            "ProductCode":"AQ3951-010",
            "Description":"CAMISETA MANGA CURTA M NSW TEE CLTR ACG",
            "Size":"P",
            "Quantity":"1",
            "Price":29.95
         },
         {
            "ProductCode":"AQ3951-010",
            "Description":"CAMISETA MANGA CURTA M NSW TEE CLTR ACG",
            "Size":"P",
            "Quantity":"1",
            "Price":29.95
         }
      ]
   },
   {
      "OrderCode":"WEB-108698620",
      "OrderStatus":"ENTREGUE",
      "PaymentCondition":"MASTERCARD CREDITO/1P",
      "isRefundable":true,
      "Products":[
         {
            "ProductCode":"AQ3951-010",
            "Description":"CAMISETA MANGA CURTA M NSW TEE CLTR ACG",
            "Size":"P",
            "Quantity":"1",
            "Price":29.95
         },
         {
            "ProductCode":"AQ3951-010",
            "Description":"CAMISETA MANGA CURTA M NSW TEE CLTR ACG",
            "Size":"P",
            "Quantity":"1",
            "Price":29.95
         },
         {
            "ProductCode":"AQ3951-258",
            "Description":"CAMISETA MANGA CURTA M NSW TEE CLTR ACG",
            "Size":"P",
            "Quantity":"1",
            "Price":29.95
         },
         {
            "ProductCode":"AQ3951-258",
            "Description":"CAMISETA MANGA CURTA M NSW TEE CLTR ACG",
            "Size":"P",
            "Quantity":"1",
            "Price":29.95
         }
      ]
   }
]
```
Observando os pedidos anteriores, nota-se que ambos são identicos, inclusive contém os mesmos ítens.
O tratamento adotado para esses casos também foi também seguir a ideia de agrupar os casos íguais, ou seja, tomando o exemplo anterior, considerar que existe somente um pedido de código "WEB-108698620", porém agrupar os ítens do mesmo, seguindo a lógica da repetição de ítens citada anteriormente para realizar esse agrupamento.