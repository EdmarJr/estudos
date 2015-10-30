/*global document: false */
/*global console*/

var EJESA = EJESA || {};

/** declarando os módulos **/
EJESA.namespace('EJESA.BENEA00404'); /** Lista de noticias relacionadas **/


/** implementando módulo **/
/** Lista de noticias relacionadas **/
EJESA.BENEA00404 = (function () {

	'use strict';
	//propriedades privadas
	var QTDNEWS = 4,
		SITE = 'odia',
		SOLR ,
		FORMAT = 'json',
		start,
		renderiza,
		makeAddress,
		executeSearch,
		parseTag,
		tags = EJESA.Util.getMetaName('tags'),
		sessao = "5284db55aab74cac64000049";
		//secao da home
		
	//fim da declaracao var



       var site_enviroment,
            strUrl = ' ' + window.location + ' ',
            edition_prod = 'cms.ejesa.igcorp.com.br/edicao.html#start=0',
            prod_preview = 'cms.ejesa.igcorp.com.br/edicaoHomes/preview',
            edition_qa = 'cms-ejesa-qa.igcorp.com.br/edicao.html#start=0',
            qa_preview = 'cms-ejesa-qa.igcorp.com.br/edicaoHomes/preview',
            prod_site = 'brasileconomico.ig.com.br';

            site_enviroment = '';

            SOLR = 'http://brasileconomico.ig.com.br/_indice/noticias/select?';
 		
 		  if (strUrl.match(edition_qa) ||strUrl.match(qa_preview) ){
                SOLR = 'http://cms-ejesa-qa.igcorp.com.br/solr/editorialStaging/select?sort=updatedDate%20desc&q=%2Bsite:brasileconomico%20%2Bre_cpy_termos';
           }
	
            else if (strUrl.match(edition_prod) ||strUrl.match(prod_preview)  || strUrl.match(prod_site)){
                SOLR = 'http://brasileconomico.ig.com.br/_indice/noticias/select?start=0&size=4&site=brasileconomico&comb_termos=';
            }




	//métodos privados
	parseTag = function (tags) {
		var mytag = '',
			tag = '',
			mytags,
			i;
		
			mytags = tags.split('%20');


			for(i= 0; i<mytags.length ; i++){
				tag += '%22';
				tag += mytags[i].replace(/_/g, '%20');
				tag += '%22';

				if(i != mytags.length-1  ){
					tag += '%20';
				}
			}

		return tag;
	};


	makeAddress = function () {

		var address = SOLR;
		
		address += parseTag(tags); 
		address += '&start=0';
	//	address += QTDNEWS;
	//	address += '&palavrasChaves=';
	//	address += tags;
		address += '&wt=';
		address += FORMAT;
		
		return address;
	};


	executeSearch = function (query) {	

		var i, xhr;

		xhr = EJESA.Util.getXHR();

	    xhr.onreadystatechange = function () {
	        if (xhr.readyState !== 4) {
	            return false;
	        }
	        if (xhr.status !== 200) {
	            console.log("Error, status code: " + xhr.status);
	            return false;
	        }
	        renderiza(xhr.responseText);
	    };

	    xhr.open("GET", query, true);
	    xhr.send("");
	};

	renderiza = function (data) {

		var obj = JSON.parse(data),
			docs,
			i,
			limit,
			date_news,
			sections,
			mysection,
			tit,
			html = '',
			eye,
			tamanho,
			contador;

		contador = 0;

		docs = obj.response.docs;

		if(docs.length < 4){
			tamanho = docs.length;
		}
		else{
			tamanho = 4;
		}

        for (i = 0; i < tamanho; i += 1) {
      //  for (i = 0; i < docs.length; i += 1) {
        	
      //  	if(docs[i].palavrasChaves.toUpperCase().match(tags.toUpperCase()) && contador < tamanho){
				html += "<li class='col-md-3'>";
				html += "<div class='headline'>";

				limit = 0;
				if (docs[i].urlImgEmp_140x90 !== undefined) {

					html += "<div class='headline-img'>";
					html += "<a href='" + docs[i].url + "' title=''>";
					html += "<img src='" + docs[i].urlImgEmp_140x90 +  "' width='140' height='90' />";
					html += "</a>";
					html += "</div>";
					limit = 30;
				} else {

					limit = 50;
				}

				tit = '';
				if (docs[i].titulo.length > limit) {
					tit = docs[i].titulo.substring(0, limit) + "...";
				} else {
					tit = docs[i].titulo;
				}
				html += "<a href='" + docs[i].url + "' title=''>";

				html += "<div class='headline-title'>";
				html += tit;
				html += "</div>";

				if (docs[i].urlImgEmp_idCorteImagem === undefined) {

					eye = '';
					if (docs[i].olho.length > 80) {
						eye = docs[i].olho.substring(0, 100) + "...";
					} else {
						eye = docs[i].olho;
					}


					html += "<div class='headline-eye'>";
					html += eye;
					html += "</div>";

				}


				html += "</a></li>";

//				contador = contador + 1;
//        	}
			
        }


		document.getElementById('BENEA00404HL').innerHTML = html;
	};


	start = function () {

		var address,
			search;


		address = makeAddress();

		executeSearch(address);


	};



	//revelando API pública
	return {
		start: start
	};
}());
