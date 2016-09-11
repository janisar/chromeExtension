

var containsWord = function(url, word) {
    if (url.toLowerCase().indexOf(word.toLowerCase()) !== -1) {
        return true;
    }
}

var GoogleSearchProvider = {
    scope:{},
    
    companyStat: function(searchResult) {
        return (
            "<b>Boardwatch: </b>" + 
                searchResult.element.company + " is <b>#" + searchResult.ranking + 
                " (" + searchResult.companyPercentage + "%)</b>"
        );
    },
    
    industryStat: function(industry) {
        return (
            " <span style='font-weight: 400; font-size: 0.65em;'> - industry is " + 
            industry + "</span>"
        );
    },
    
    injectHTML: function(searchResult) {
        return (
            (searchResult.element.company != searchResult.leader.company) ?
                "<h3 id = 'boardwatch-toolbar'" + 
                "style='background-color: #F1C24F;padding: 10px;'>" +
                GoogleSearchProvider.companyStat(searchResult) +
                ", " + searchResult.leader.company + " is <b>#1 (" + 
                searchResult.leaderPercentage + "%)</b>" + 
                GoogleSearchProvider.industryStat(searchResult.element.industry) +
                "</h3>"
                 
            :
                "<h3 id = 'boardwatch-toolbar'" + 
                "style='background-color: #F1C24F;padding: 10px;'>" +
                GoogleSearchProvider.companyStat(searchResult) + 
                GoogleSearchProvider.industryStat(searchResult.element.industry) +
                "</h3>"
        );
    },
    
    iteration: function() {
        $(this).find('h3.r').each(function() {
            var thisUrl = $(this).find("a").attr('href');
            var companyName = thisUrl.split("/")[2];
            
            var el = Dao.getCurrentObjectByCompanyName(companyName);
            
            if (el.company !== undefined && 
                            $(this).prev().attr('id') != 'boardwatch-toolbar' &&
                            ($(this).parent().parent().hasClass('rc') || 
                            $(this).parent().hasClass('rc'))) {
                
                var industryList = Dao.getCurrentIndustryObjects(el);
                var searchResult = ServiceDao.getToolbarSearchResult(el, industryList);
                
                $(this).before(GoogleSearchProvider.injectHTML(searchResult)); 
            }
        });
    },
    
    init: function(request, sender, sendResponse) {
        
        // set temprorary data.. should be replaced when on actual database
        Dao.data = request.args[0];
        GoogleSearchProvider.scope.icon = request.args[1];
        
        var url = location.href;
 
        setTimeout(function() {
            $('div.g').each(GoogleSearchProvider.iteration);
            $('.srg').each(GoogleSearchProvider.iteration);
        }, 1000);
        
        //
    }
};

chrome.runtime.onMessage.addListener(GoogleSearchProvider.init);