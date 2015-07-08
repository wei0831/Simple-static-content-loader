# Simple Static Content Loader
Simple Static Content Loader for NodeJS

## Usage
```javascript
// Load Moudle
var static_content = require('./static.js');

var server = http.createServer(function (request, response){
  // Simple Static Content Loader
  // Take care of file requests and respond
  static_content(request, response);
});
```
## Default Assest Location
| File Type | Location                                         |
|--------|-----------------------------------------------------|
| Images | ```localhost/example.jpg -> ./images/example.jpg``` |
| CSS    | ```localhost/example.jpg -> ./css/```               |
| Audios | ```localhost/example.jpg -> ./audios/```            |

** Default location can be changed in the static.js

##Author
**[Jack Chang]** : [![endorse](https://api.coderwall.com/wei0831/endorsecount.png)](https://coderwall.com/wei0831)

[Jack Chang]: https://about.me/wei0831
