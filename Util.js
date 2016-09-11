var Util = {
    csvToObject: function(data) {
        var objectList = [];
        
        var arr = data.split('\n');     
        var headers = arr[0].split(',');
        for(var i = 1; i < arr.length; i++) {
          var data = arr[i].split(',');
          var obj = {};
          for (var j = 0; j < data.length; j++) {
             obj[headers[j].trim()] = data[j].trim();
          }  
            objectList.push(obj);
        }
        return objectList;
    },
    
    companyNamesEquals: function(str1, str2) {
        if (str1 == undefined) str1 = "1";
        if (str2 == undefined) str2 = "2";
        if (str1.toLowerCase() === str2.toLowerCase()) {
            return true;
        }
        if (str1.toLowerCase().indexOf(str2.toLowerCase()) !== -1) {
            return true;
        }
        if (str2.toLowerCase().indexOf(str1.toLowerCase()) !== -1) {
            return true;
        }
        return false;
    },
    
    compareBoard: function(a, b) {
        var p1 = getPercentage(a.menBoard, a.womenBoard);
        var p2 = getPercentage(b.menBoard, b.womenBoard);
        if (p1 < p2)
            return +1;
        if (p1 > p2)
            return -1;
        return 0;
    },
    
    compareExcec: function(a, b) {
        var p1 = getPercentage(a.menExcective, a.womenExcective);
        var p2 = getPercentage(b.menExcective, b.womenExcective);
        
        if (p1 < p2)
            return +1;
        if (p1 > p2)
            return -1;
        return 0;
    }
};

var containsWord = function(url, word) {
    if (url.toLowerCase().indexOf(word.toLowerCase()) !== -1) {
        return true;
    }
};

var getPercentage = function(male, female) {
    var total = male + female;
    return Math.round(100 * female  / total);
}