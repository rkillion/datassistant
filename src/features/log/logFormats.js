export const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]

export const weekdays = ["Sun","Mon","Tues","Wed","Thu","Fri","Sat"]

export function displayDate(date) {
    let now = new Date();
    let difference = now - date;
    let hour = date.getHours()>12 ? date.getHours()-12 : date.getHours();
    let minutes = date.getMinutes().toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
      });
    let ampm = date.getHours()>12 ? "pm" : "am";
    let weekday = date.getDay();
    let month = date.getMonth();
    let day = date.getDate();
    let year = date.getFullYear();

    if (difference<60000) {
        return "seconds ago";
    } else if (difference<120000) {
        return "1 min ago";
    } else if (difference<3600000) {
        return `${Math.round(difference/60000)} mins ago`
    } else if (difference<86400000) {
        return `${Math.round(difference/3600000)} hours ago`
    } else if (difference<172800000) {
        return `Yesterday ${hour}:${minutes} ${ampm}`
    } else if (difference<31536000000) {
        return `${weekdays[weekday]} ${months[month]} ${day} ${hour}:${minutes}${ampm}`
    } else {
        return `${weekdays[weekday]} ${months[month]} ${day}, ${year} ${hour}:${minutes}${ampm}`
    }
}