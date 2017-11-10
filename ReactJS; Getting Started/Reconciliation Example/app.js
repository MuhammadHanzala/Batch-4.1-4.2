let jsDiv = document.getElementById('js');
let reactDiv = document.getElementById('root');

setInterval(() => {
    // with core JS
    jsDiv.innerHTML = new Date();
    let inputTag = document.createElement('INPUT');
    jsDiv.appendChild(inputTag);
    // with ReactJS
    let inputTagForReact = React.createElement('input');
    ReactDOM.render(
        React.createElement('div', null, `${new Date()}`, inputTagForReact),
        reactDiv
    );

}, 1000);
