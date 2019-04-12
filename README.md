|Route|Headers|Body|Responses|Description|
|-----|-------|----|---------|-----------|
|**/api/accounts** - GET|**Authorization**: `admin token`<br/>|-|**200**: Returns all accounts in database<br/>**401**: Not authenticated<br/>**500**: Any other server error<br/>|lorem ipsum|
**/api/accounts** - POST|-|Type: application/json<br/>**username**: (string) - the username<br/>**password**: (string) - the password<br/>**email**: (string) - the email<br/>Example:<br/>```json <br/>{"username":"Federlizer","email":"mail@mail.com","password":"12345"}<br/> ```|-|-|
