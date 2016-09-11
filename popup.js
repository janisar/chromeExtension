var BoardWatch = {
    leaderBoardRows: 5,
    scope:{},
    
    getPieChartData: function(boardPercentage) {
        return [
        {
          value: boardPercentage,
          color:"#F1C24F"
        },
        {
          value : 100 - boardPercentage,
          color : "#222"
        }
        ];
    },
    
    insertLeaderRow: function(selector, company, men, women, rank) {
        $(selector).append("<b>" + parseInt(rank + 1) + "</b> " + company + " " + getPercentage(parseInt(men), parseInt(women)) + "%</br>");
    },
    
    populateLeaderboard: function(industryList) {
        industryList.sort(Util.compareBoard);
        
        for (var i = 0; i < industryList.length && i < BoardWatch.leaderBoardRows; i++) {
            var obj = industryList[i];
            BoardWatch.insertLeaderRow("#leaderBoard", obj.company, obj.menBoard, obj.womenBoard, i);
        }
        
        industryList.sort(Util.compareExcec);
        for (var i = 0; i < industryList.length && i < BoardWatch.leaderBoardRows; i++) {
            var obj = industryList[i];
            BoardWatch.insertLeaderRow("#leaderExcective", obj.company, obj.menExcective, obj.womenExcective, i);
        } 
    },
    
    populateBoard: function(data) {
        var boardPercentage = getPercentage(parseInt(data.menBoard), parseInt(data.womenBoard));
        $("#board").append("<br/>Total men: <b>" + data.menBoard + "</b></br>");
        $("#board").append("Total women: <b>" + data.womenBoard + "</b></br>");
        
        var pieData = BoardWatch.getPieChartData(boardPercentage);

        var myPie = new Chart(document.getElementById("boardCanvas").getContext("2d")).Doughnut(pieData,{percentageInnerCutout : 80});    

    },
    
    populateExcective: function(data) {
        var boardPercentage = getPercentage(parseInt(data.menExcective), parseInt(data.womenExcective));
        $("#excective").append("<br/>Total men:<b> " + data.menExcective + "</b></br>");
        $("#excective").append("Total women: <b>" + data.womenExcective + "</b></br>");
        
        
        var pieData = BoardWatch.getPieChartData(boardPercentage);

        var myPie = new Chart(document.getElementById("excectiveCanvas").getContext("2d")).Doughnut(pieData,{percentageInnerCutout : 80});    
        
    },
    
    showCompanyStats: function(data) {
        Dao.data = Util.csvToObject(data);
        
        var object = Dao.getCurrentObjectByCompanyName(BoardWatch.scope.company);
        if (object.company != undefined) {
            var industryList = Dao.getCurrentIndustryObjects(object);
        
            $('#company').html(object.company);
            $('#industry').html(object.industry);

            BoardWatch.populateBoard(object);
            BoardWatch.populateExcective(object);
            BoardWatch.populateLeaderboard(industryList);
        } else {
            $("body > section").html("<h4 style=''>Sorry, couldn't found any data for " + 
                                     BoardWatch.scope.company + "</h4>");
            $("div#leaderSection").css('display', 'none');
        }
    },
    
    error: function() {
        $("#placeholder").html("");
    }
};

var onClickHandler = function() {
    chrome.tabs.getSelected(null, function(tab) {
        var company = tab.url.split("/")[2];
        BoardWatch.scope.company = company;
        $.ajax({
            method: "GET",
            url: "data.csv",
            success: BoardWatch.showCompanyStats, 
            error: BoardWatch.error
        });
    });
                         
};

$(document).ready(function() { 
    onClickHandler();
});
