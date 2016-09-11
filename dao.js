//  Temporary - I MEAN IT! - solution for database. Should be replaced by 
//  real database as soon as possible.

var Dao = {
    data: {},
    
    getCurrentObjectByCompanyName: function(companyName) {
        var result = {};
        Dao.data.forEach(function(obj, index) {
            if (Util.companyNamesEquals(obj.company, companyName)) {
                result = obj;
            }
        });
        return result;
    },
    
    getCurrentIndustryObjects: function(company) {
        var list = [];
        Dao.data.forEach(function(obj, index) {
            if (obj.industry == company.industry) {
                list.push(obj);
            }
        });
        
        return list;
    }
};

var ServiceDao = {
    
    getTopIndustries: function(list){
        return list.sort(function(a, b){
            var p1 = getPercentage(a.menBoard, a.womenBoard);
            var p2 = getPercentage(b.menBoard, b.womenBoard);
            if (p1 < p2)
                return +1;
            if (p1 > p2)
                return -1;
            return 0;
        });
    },
    
    getRanking: function(company, sortedIndustries) {
        var ranking = 0;
        sortedIndustries.forEach(function(comp, index) {
            if (Util.companyNamesEquals(comp.company, company.company)) {
                ranking = (index + 1);
            }
        });
        return ranking;
    },
    
    
    getToolbarSearchResult: function(company, industryList) {
        var leaderBoard = ServiceDao.getTopIndustries(industryList);
        var ranking = ServiceDao.getRanking(company, leaderBoard);
        var leader = leaderBoard[0];
        
        var companyPercentage = getPercentage(parseInt(company.menExcective), 
                                              parseInt(company.womenExcective));
        var leaderPercentage = getPercentage(parseInt(leader.menExcective), 
                                             parseInt(leader.womenExcective));
        
        return new SearchToolbarResult(company, ranking, leader, companyPercentage, leaderPercentage);
    }
}