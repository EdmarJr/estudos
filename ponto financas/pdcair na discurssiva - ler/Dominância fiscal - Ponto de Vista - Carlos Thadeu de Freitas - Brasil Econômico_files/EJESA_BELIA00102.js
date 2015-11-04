/*global document: false */
/*global console*/
/*global window */
/*global IBTX */

var EJESA = EJESA || {};

/** declarando os módulos **/
EJESA.namespace('EJESA.BELIA00102'); /** Lista de últimas Home  **/

/** implementando módulo **/
/** Lista de últimas Home **/
EJESA.BELIA00102 = (function () {
    'use strict';
    //propriedades privadas
    var QTDNEWS = 5,
        SITE = 'brasileconomico',
        SOLR ,
        FORMAT = 'json',
        start,
        renderiza,
        newsMenuCommented,
        newsMenuLast,
        page = 1,
        pageIdentify,
        makeAddress,
        query,
        executeSearch,
        pageMarked,
        nextPage,
        prevPage,
        thisPage,
        resetPagination;
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
                SOLR = 'http://cms-ejesa-qa.igcorp.com.br/solr/editorialStaging/select?sort=updatedDate%20desc&fq=site%3Abrasileconomico&q=*%3A*';
            }

            else if (strUrl.match(edition_prod) ||strUrl.match(prod_preview) ){
                SOLR = 'http://brasileconomico.ig.com.br/_indice/noticias/select?';
            }


    //métodos privados
    pageIdentify = function () {
        var start = (page - 1) * QTDNEWS;
        return start;
    };

    makeAddress = function (start) {

        var address = SOLR;

        address += '&start=';
        address += start;
        address += '&size=';
        address += QTDNEWS;
        address += '&site=';
        address += SITE;
        address += '&wt=';
        address += FORMAT;


        return address;
    };

    pageMarked = function () {

        var mp,
            posid = '';

        if (page > 5) {

            if (page % 5 === 1) {

                posid = page % 5;

            } else {
                posid = page % 5;
                if (posid === 0) {
                    posid = 5;
                }
            }

            mp = 'hn_pos_' + posid;

        } else {
            mp = 'hn_pos_' + page;
        }

        EJESA.Util.removeClassByID(mp, 'headline_nav_off');
        EJESA.Util.addClassByID(mp, 'headline_nav_on', true);
    };

    resetPagination = function () {

        EJESA.Util.removeClassByID('hn_pos_1', 'headline_nav_on');
        EJESA.Util.removeClassByID('hn_pos_2', 'headline_nav_on');
        EJESA.Util.removeClassByID('hn_pos_3', 'headline_nav_on');
        EJESA.Util.removeClassByID('hn_pos_4', 'headline_nav_on');
        EJESA.Util.removeClassByID('hn_pos_5', 'headline_nav_on');

        EJESA.Util.addClassByID('hn_pos_1', 'headline_nav_off');
        EJESA.Util.addClassByID('hn_pos_2', 'headline_nav_off');
        EJESA.Util.addClassByID('hn_pos_3', 'headline_nav_off');
        EJESA.Util.addClassByID('hn_pos_4', 'headline_nav_off');
        EJESA.Util.addClassByID('hn_pos_5', 'headline_nav_off');
    };

    start = function () {

        var start,
            address;

        //box de mais lidas
        //EJESA.Util.loadJS(TOP);

        //box de últimas
        start = pageIdentify();
        address = makeAddress(start);
        executeSearch(address);
        resetPagination();
        pageMarked();

    };

    executeSearch = function (query) {

        var xmlhttp;

        if (window.XMLHttpRequest) {
          xmlhttp = new XMLHttpRequest();
        }
        else {
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }

        xmlhttp.onreadystatechange = function(){
            if (xmlhttp.readyState !== 4) {
                return false;
            }
            if (xmlhttp.status !== 200) {
                console.log("Error, status code: " + xmlhttp.status);
                return false;
            }
            renderiza(xmlhttp.responseText);
            $("#news-menu ul").addClass("status code: " + xmlhttp.status);

        }
        xmlhttp.open("GET",query,true);
        xmlhttp.send("");

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
            tamanho;



        docs = obj.response.docs;

        html += "<ul>";

        tamanho = 5
        if (docs.length < 5){
            tamanho = docs.length
        }

        for (i = 0; i < tamanho; i = i + 1) {

            html += "<li><a href='" + docs[i].url + "'>";


            html += "<span class='headline-item'>";

            limit = 0;
        //    if (docs[i].urlImgEmp_idCorteImagem !== undefined) {

        //        html += "<img src='" + docs[i].urlImgEmp_80x60 + "'>";
        //        limit = 90;
        //    } else {
                limit = 180;
        //    }

            date_news = EJESA.Util.dateSolr(docs[i].startDate, '$3/$2/$1');

            html += "<span class='headline-item-eye'><b>";

            sections = docs[i].secaoBreadcrumb.split('›');
            mysection = sections[sections.length - 1];
            html += EJESA.Util.trim(mysection);

            html += " em ";
            html += date_news;

            html += "</b></span>";

            html += "<p>";

            tit = '';
            if (docs[i].titulo.length > limit) {
                tit = docs[i].titulo.substring(0, limit) + "...";
            } else {
                tit = docs[i].titulo;
            }

            html += tit;
            html += "</p>";

            html += "</span></a></li>";
        }

        html += "</ul>";

        html += "<a id='mais-noticia-ultimas' href='http://brasileconomico.ig.com.br/noticias'>+ veja <b>mais notícias »</b></a>";

        document.getElementById('BELIA00102HL').innerHTML = html;
    };

    thisPage = function (click) {

        page = click;
        start();
    };

    nextPage = function () {

        page = page + 1;
        if (page > 5) {
            page = 1;
        }
        start();
    };

    prevPage = function () {

        page = page - 1;
        if (page < 1) {
            page = 5;
        }
        start();
    };

    //procedimentos de inicialização
    //posicionando abas
    window.onload = function () {
        $('#news-item-commented').click(function() {
            $('#news-commented').css('display', 'block');
            $('#news-last').css('display', 'none');
            $('#news-menu-commented').css('color', '#f0f0f0');
            $('#news-item-commented').css('background', '#b2b2b2');
            $('#news-menu-last').css('color', '#b2b2b2');
            $('#news-item-last').css('background', '#f0f0f0');
        });
        $('#news-item-last').click(function() {
            $('#news-commented').css('display', 'none');
            $('#news-last').css('display', 'block');
            $('#news-menu-last').css('color', '#f0f0f0');
            $('#news-item-last').css('background', '#b2b2b2');
            $('#news-menu-commented').css('color', '#b2b2b2');
            $('#news-item-commented').css('background', '#f0f0f0');
        });
        $('#news-item-commented').click();
    };

    //revelando API pública
    return {
        start: start,
        nextPage: nextPage,
        prevPage: prevPage,
        thisPage: thisPage
    };
}());
