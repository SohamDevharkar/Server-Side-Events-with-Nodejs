const bodyElement = document.querySelector("body");
 
const es = new EventSource("http://localhost:3001/progress");

es.addEventListener("progress", ({event, id, data}) => {
    bodyElement.textContent = data;
});

es.addEventListener("done", ({event, id, data}) => {
    bodyElement.textContent = data;
    bodyElement.textContent = "Finished!";
    es.close();
})