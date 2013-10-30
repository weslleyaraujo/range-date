describe("rangeDate", function() {
  var d;
  
  beforeEach(function() {
    d = new Date();
    d = [d.getFullYear(), d.getMonth()+1, d.getDate()].join('/');
  });

  it("generate a timestamp from string in format (Y/m/d)", function() {
    expect(rangeDate.dateToStamp("2011/11/11")).toEqual(1320976800000);
  });

  it("returns a string of today in format (Y/m/d)", function() {
    expect(rangeDate.getToday()).toEqual(d);
  });

  it("returns false if the startTime is less than today", function() {
    var startDay = '10/11/2012',
      endDay = '11/11/2012',
      timeNow = '09/11/2012';
    expect(rangeDate.inProgress(startDay, endDay, timeNow)).toBeFalsy();
  });

  it("returns true if the startTime is in the range", function() {
    var startDay = '10/11/2012',
      endDay = '12/11/2012',
      timeNow = '11/11/2012';
    expect(rangeDate.inProgress(startDay, endDay, timeNow)).toBeTruthy();
  });

  it("returns false if the startTime is greater than today", function() {
    var startDay = '12/11/2012',
      endDay = '12/11/2012',
      timeNow = '11/11/2012';
    expect(rangeDate.inProgress(startDay, endDay, timeNow)).toBeFalsy();
  });

  it("returns false if the parameter excluded day equals today", function() {
    var startDay = '12/11/2012',
      endDay = '15/11/2012',
      timeNow = '13/11/2012',
      excludeDay = '13/11/2012';
    expect(rangeDate.inProgress(startDay, endDay, timeNow, excludeDay)).toBeFalsy();
  });

  it("returns false if today is in excludeDays array", function() {
    var startDay = '13/11/2012',
      endDay = '15/11/2012',
      timeNow = '14/11/2012',
      excludeDay = ['13/11/2012', '14/11/2012'];
    expect(rangeDate.inProgress(startDay, endDay, timeNow, excludeDay)).toBeFalsy();
  });

});