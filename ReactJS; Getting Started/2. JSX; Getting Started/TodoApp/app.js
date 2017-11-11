let array = JSON.parse(localStorage.getItem('todo')) || [];

let add = () => {
    let newTodo = input.value;
    if (newTodo) {
        array.push(newTodo);
        render();
        input.value = '';
    }
}
let deleteTodo = (todoIndex) => {
    array.splice(todoIndex, 1);
    render();

}
let editTodo = (todoIndex, todoText) => {
    let newText = prompt('Edit todo:', todoText);
    if (newText) {
        array.splice(todoIndex, 1, newText);
        render();
    }
}

let render = () => {
    localStorage.setItem('todo', JSON.stringify(array));
    ReactDOM.render(
        <div>
            <h1>Todo App with React and Jsx</h1>
            <input id="input" onKeyDown={(e) => e.keyCode === 13 ? add() : null} />
            <button onClick={() => add()}>Add</button>
            <ul>
                {
                    array && array.length > 0 ?
                        array.map((todo, i) => {
                            return (
                                <li key={i}>
                                    {todo}
                                    <button onClick={() => deleteTodo(i)}>Delete</button>
                                    <button onClick={() => editTodo(i, todo)}>Edit</button>
                                </li>
                            )

                        })
                        :
                        <p>Nothing to show</p>
                }
            </ul>
        </div>,
        document.getElementById("root")
    );

}
render();