$(document).ready(function () {

    var apikey = "s3l6ih6ic81tuqe0pknqjxur5bw2455muysnt4mf7jm42wart";

    $('#search').click(function () { 
        SearchWord();
    });

    $('#erase').click(function(){        
        $('#word').val("");
    })

    function SearchWord()
    {

        var word = $('#word').val();
        word = word.toLowerCase();
        var url1 = "https://api.wordnik.com/v4/word.json/"+word+"/definitions?limit=200&includeRelated=false&useCanonical=false&includeTags=false&api_key="+apikey+"";
        let request1 = new XMLHttpRequest();
        request1.open("GET",url1);
        request1.send();
        request1.onload = function()
        {
            if(request1.status!= 404)
            {
                // console.log(request);
                // console.log(request.response);
                var data1 = JSON.parse(request1.response);
                var iterator = 0;
                // console.log(data1.length);
                // console.log(data1);
                $('.WordName p').text();
                $('.WordName p').text(data1[0].word);
                while(!data1[iterator].text)
                {
                    console.log(iterator);
                    iterator++;   
                }
                $('.Definition p').text();
                $('.Definition p').text(data1[iterator].text);
                // console.log(data1[iterator].text);

            }
            else
            {
                console.log("Error");
            }
            
        }

        var url2 = "https://api.wordnik.com/v4/word.json/"+word+"/topExample?useCanonical=false&api_key="+apikey+"";
        let request2 = new XMLHttpRequest();
        request2.open("GET",url2);
        request2.send();
        request2.onload = function()
        {
            if(request2.status !=404)
            {
                var data2 = JSON.parse(request2.response);
                // console.log(data2.text);
                $('.topExample p').text();
                $('.topExample p').text(data2.text);
            }
            else
            {
                console.log("Error");
                
            }
        }

        var url3 = "https://api.wordnik.com/v4/word.json/"+word+"/relatedWords?useCanonical=false&limitPerRelationshipType=10&api_key="+apikey+"";

        let request3 = new XMLHttpRequest();
        request3.open("GET",url3);
        request3.send();
        request3.onload = function()
        {
            if(request3.status !=404)
            {
                var data3 = JSON.parse(request3.response);
                for(let i=0;i<data3.length;i++)
                {
                    if(data3[i].relationshipType == "synonym")
                    {
                        // console.log(data3[i]);
                        var sysnonyms = "";
                        for(let j=0;j<data3[i].words.length;j++)
                        {
                            if(j == (data3[i].words.length)-1)
                            {
                                sysnonyms=sysnonyms+data3[i].words[j];
                            }
                            else
                            {
                                sysnonyms=sysnonyms+data3[i].words[j]+" , ";
                            }
                        }
                        $('.synonyms p').text();
                        $('.synonyms p').text(sysnonyms);
                    }
                }
            }
            else
            {
                console.log("Error");
                
            }
        }

                
    }

});