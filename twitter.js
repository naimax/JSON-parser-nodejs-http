var http = require('http');

var getNode = function(data1, callback) {
    var neo = http.createClient(80, 'search.twitter.com')
    var request = neo.request("GET", "/search.json?q=blue%20angels&rpp=5&include_entities=true&result_type=mixed", {'host': 'localhost','Content-Length': data1.length,
            'Content-Type': 'application/json; charset=utf-8'}
    )
    request.write(data1, encoding='utf8');
    request.addListener("response", function(response){
        var body = ""

        response.setEncoding('utf8')
        if (response.statusCode === 200) {
            console.log('statusCode: ' +response.statusCode);
            response.addListener('data', function(chunk){
                body += chunk
            })
            response.addListener("end", function() {
                console.log('BODY: ' +body);

                callback(JSON.parse(body))

            })
        } else if (response.statusCode === 404) {
            console.log('statusCode: ' +response.statusCode);
            throw new Error('Node not found')
        } else throw new Error('Server error')

    })
    request.end()
}


 data1 = JSON.stringify({});

 getNode(data1, function(body) {
 console.log('JSON: ' +body);
 });