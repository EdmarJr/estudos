/*global COUNTAPI */
/*global XMLHttpRequest*/
/*global window*/
/*global ecount*/
/*global console*/
/*global ActiveXObject*/

function atualizaEnquete() {
    setInterval(function(){
        COUNTAPI.POLL.get();
    }, 60000);
}

var COUNTAPI = COUNTAPI || {};
var RET;
var COUNTURL = "http://count.ejesa.com.br/count/";
//var COUNTURL = "http://count-qa.ejesa.com.br:8080/count/";
//var COUNTURL = "http://localhost:8080/count/";

COUNTAPI.namespace = function (ns_string) {
    'use strict';
    var parts = ns_string.split('.'),
        parent = COUNTAPI,
        i;

    if (parts[0] === "COUNTAPI") {
        parts = parts.slice(1);
    }

    for (i = 0; i < parts.lenght; i += 1) {
        if (parent[parts[i]] === 'undefined') {
            parent[parts[i]] = {};
        }
        parent = parent[parts[i]];
    }
    return parent;
};

/** declarando os mÃ³dulos **/
COUNTAPI.namespace('COUNTAPI.XHR');
COUNTAPI.namespace('COUNTAPI.SEARCH');
COUNTAPI.namespace('COUNTAPI.RATE');
COUNTAPI.namespace('COUNTAPI.POLL');

/** implementando módulo **/
COUNTAPI.XHR = (function () {
    'use strict';
    //propriedades privadas
    //métodos privados
    var getXHR = function () {
            var i,
                xhr,
                activexIds = [
                    'MSXML2.XMLHTTP.3.0',
                    'MSXML2.XMLHTTP',
                    'Microsoft.XMLHTTP'
                ];
            if (typeof XMLHttpRequest === "function" || window.XMLHttpRequest) { // native XHR
                xhr =  new XMLHttpRequest();
            } else { // IE before 7
                for (i = 0; i < activexIds.length; i += 1) {
                    try {
                        xhr = new ActiveXObject(activexIds[i]);
                        break;
                    } catch (e) {
                        console.log(e);
                    }
                }
            }
            return xhr;
        };

    //fim da declaracao var

    //revelando API pública
    return {
        getXHR: getXHR
    };
}());

COUNTAPI.SEARCH = (function () {
    'use strict';
    var executeSearch = function (address) {

        var xhr;

        xhr = COUNTAPI.XHR.getXHR();

        xhr.onreadystatechange = function () {
            if (xhr.readyState !== 4) {
                return false;
            }
            if (xhr.status !== 200) {
                console.log("Error, status code: " + xhr.status);
                return false;
            }
            eval(xhr.responseText);

        };
        xhr.open("GET", address, true);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded; charset=UTF-8')
        xhr.send("");

    };

    return {
        executeSearch: executeSearch
    };

}());

COUNTAPI.RATE = (function () {
    'use strict';
    var vote = function (value) {

        //falta setar o cookie

        var vurl = COUNTURL;
        vurl += erate[2];
        vurl += "?cmd=";
        vurl += erate[2];
        vurl += "&app=";
        vurl += erate[0];
        vurl += "&value=";
        vurl += value;
        vurl += "&key=";
        vurl += window.location;
        vurl += "&callback=";
        vurl += erate[1];

        COUNTAPI.SEARCH.executeSearch(vurl);
    };

    return {
        vote: vote
    };

}());

COUNTAPI.POLL = (function () {
    'use strict';
    var vote = function (value) {
        //falta setar o cookie
        // ### console.log("Aqui votou: "+epoll.toString());
        var vurl = COUNTURL;
        vurl += "poll?cmd=pollf&app=";
        vurl += epoll[1];
        vurl += "&key=";
        vurl += value;
        vurl += "&callback=";
        vurl += epoll[0];
        // vurl += "&rcf=";
        // vurl += rcf;
        // vurl += "&rrf=";
        // vurl += rrf;

        COUNTAPI.SEARCH.executeSearch(vurl);
    };

    var get = function (id) {
        var vurl = COUNTURL;
        vurl += "poll?cmd=getnp&app=";
        vurl += id;
        vurl += "&callback=";
        vurl += gpoll[0];

        COUNTAPI.SEARCH.executeSearch(vurl);
    };

    /*
    var get = function () {
        var vurl = COUNTURL;
        vurl += "poll?cmd=getnp&app=";
        vurl += gpoll[1];
        vurl += "&callback=";
        vurl += gpoll[0];

        COUNTAPI.SEARCH.executeSearch(vurl);
    };
    */

    var votis = function (pergunta,perguntaid,voto,votoid) {
        /*
            cmd     = cpoll
            ckey    = 5395ff03e4b03378c924e26f (site O DIA)
            app     = date-time hash informado pelo editor manualmente
            napp    = label: pergunta, questão
            key     = id da resposta
            nkey    = label: resposta
        */
        var data = {cmd : 'cpoll', ckey : '5395ff03e4b03378c924e26f', app : perguntaid, napp : pergunta, key : votoid, nkey : voto}
        $.ajax({
            type: "POST",
            url: 'http://107.23.76.58/count/poll',
            data: data,
            success: function(data) {
                console.log(data);
            }
        });
    };

    return {
        vote: vote,
        get: get,
        votis: votis
    };

}());


if (typeof ecount != "undefined" && ecount[0].toString() === "view") {

    var subDmn = 'be';
    if(window.location.hostname.split('.')[0]=='odia'){
        subDmn = 'odia';
    }

    var ecsurl = COUNTURL;
    ecsurl += ecount[0];
    ecsurl += "?cmd=";
    ecsurl += ecount[0];
    ecsurl += "&app=";
    ecsurl += ecount[2];
    ecsurl += "&key=";
    // ecsurl += window.location;
    ecsurl += document.getElementsByName("articleid")[0].getAttribute("content");
    ecsurl += "&callback=";
    ecsurl += ecount[1];

    COUNTAPI.SEARCH.executeSearch(ecsurl);
}
