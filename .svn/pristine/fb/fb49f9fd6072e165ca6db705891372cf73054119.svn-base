function getToday() {
  var now = new Date();
  var year = now.getFullYear();
  var month = now.getMonth() + 1;
  var day = now.getDate();
  if (month < 10) {
    month = '0' + month;
  };
  if (day < 10) {
    day = '0' + day;
  };
  // 如果需要时分秒 
  // var h = now.getHours(); 
  // var m = now.getMinutes(); 
  // var s = now.getSeconds(); 
  var formatDate = year + '-' + month + '-' + day;
  return formatDate;
}
module.exports = {
  getToday: getToday
}


