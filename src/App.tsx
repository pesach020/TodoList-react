import React from 'react';
import './App.css';
import Header from './components/Header';
import TodoList from './components/TodoList';
import {ITodo} from './models/ITodo';

export enum ViewFilterMode {
    All = 0,
    Completed,
    favorite
}

interface IState {
    viewFilter: ViewFilterMode,
    todoCollection: Array<ITodo>
}

const createId = (): string => (
    Math.random().toString(36).substring(2) + (new Date()).getTime().toString(36)
);

class App extends React.Component<{}, IState> {
    constructor(props = {}) {
        super(props);

        this.state = {
            viewFilter: ViewFilterMode.All,
            todoCollection: [
                {id: createId(), completed: true, favorite: false, text: 'Call Benny'},
                {id: createId(), completed: false, favorite: false, text: 'Build react demo'},
                {id: createId(), completed: false, favorite: true, text: 'Take rest'}
            ]
        };
    }

    onViewFilterChange = (newValue: ViewFilterMode) => {
        this.setState({
            viewFilter: newValue as ViewFilterMode
        })
    };

    onAdd = (value: string) => {
        const newTodo = {id: createId(), completed: false, favorite: false, text: value};
        this.setState({
            todoCollection: [...this.state.todoCollection, newTodo]
        })
    };

    onCompletedToggle = (id: string, completed: boolean) => {
        const todo = this.state.todoCollection.find((todo: ITodo) => todo.id === id);

        if (todo) {
            todo.completed = completed;
        } else {
            throw new Error('onCompletedToggle: todo id invalid')
        }

        this.setState({
            todoCollection: [...this.state.todoCollection]
        })
    };
    onFavoriteToggle = (id: string, favorite: boolean) => {
        const favoriteTodo = this.state.todoCollection.find((favoriteTodo: ITodo) => favoriteTodo.id === id);

        if (favoriteTodo) {
            favoriteTodo.favorite = favorite;
        } else {
            throw new Error('onCompletedToggle: todo id invalid')
        }

        this.setState({
            todoCollection: [...this.state.todoCollection]
        })
    };

    // get date after filter (if needed)
    getTodoListWithFilter(): Array<ITodo> {
        let todoList = this.state.todoCollection;

        switch ((this.state.viewFilter)) {
            case ViewFilterMode.All:
                break;
            case ViewFilterMode.Completed:
                todoList = this.state.todoCollection.filter((todo: ITodo) => todo.completed);
                break;
            case ViewFilterMode.favorite:
                todoList = this.state.todoCollection.filter((todo: ITodo) => todo.favorite);
                break;
            default:
                break;
        }
        return todoList;
    }

    render() {
        return (
            <div className="App">
                <Header onAdd={this.onAdd} onViewFilterChange={this.onViewFilterChange}/>
                <TodoList todoCollection={this.getTodoListWithFilter()} onCompletedToggle={this.onCompletedToggle}
                          onFavoriteToggle={this.onFavoriteToggle}/>
            </div>
        );
    }
}

export default App;
