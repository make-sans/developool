# 4-sem-project
Website for the 4th semester project

Route|Headers|Body|Responses|Description
-----|-------|----|---------|-----------
/api/accounts - POST|Authorization: admin token|-|200 - Returns all accounts in database <br/> 401 - Not authenticated <br/> 500 - Any other server error|Returns all accounts saved on the database if the request is accompanied with an admin account token.
/api/accounts - POST|-|JSON object:  username (string): the username of the new account  ... | 200 - Returns success: true json object , registration successful|Tries to register a new account in the system.
