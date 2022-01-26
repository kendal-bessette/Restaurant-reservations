export default function formatDate(date) {
    
  const options = {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  
  return date.toLocaleString("en-us", options);

}