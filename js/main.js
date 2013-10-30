var rangeDate = (function () {
  var app;

  app = {
    convertDate: function(date) {
      date = date.split('/');
      return date[2] + '/' + date[1] + '/' + date[0];
    },

    dateToStamp: function (date) {
      date = date || this.getToday();
      return new Date(date).getTime();
    },

    getToday: function () {
      var d = new Date();
      return [d.getFullYear(), d.getMonth()+1, d.getDate()].join('/');
    },

    timeNow: function() {
      return this.dateToStamp();
    },

    isExcludeDay: function (excludeStamp, nowStamp) {
      if (excludeStamp === nowStamp) {
        return false;
      }
      return true;
    },

    inProgress: function (startDay, endDay, timeNow, excludeDay) {
      // convert date formats
      startDay = this.convertDate(startDay);
      endDay = this.convertDate(endDay);
      timeNow = this.dateToStamp(timeNow) || this.dateToStamp();
      
      // exclude day
      if (excludeDay) {
        switch (typeof excludeDay) {
          case 'string' :
            excludeDay = this.convertDate(excludeDay);
            if (this.isExcludeDay(this.dateToStamp(this.convertDate(excludeDay)), timeNow)) {
              return false;
            }
          break;

          case 'object' :
            var excludeStamp,
              startStamp = this.dateToStamp(startDay);
            for(var count in excludeDay) {
              excludeStamp = this.dateToStamp(this.convertDate(excludeDay[count]));
              if (excludeStamp === startStamp) {
                return false;
              }
            }
          break;
        }
      }
      
      if (this.dateToStamp(startDay) <= timeNow) {
        return this.dateToStamp(endDay) < timeNow ? false : true;
      }
      
      return false;
    }
  };

  return app;

})();