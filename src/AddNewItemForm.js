import React from 'react';

class AddNewItemForm extends React.Component {

    state = {
        error: false,
        title: ''
    }

    onAddItemClick = () => {
        let newText = this.state.title
        if (newText === '') {
            this.setState({error: true})
        } else {
            this.setState({error: false})
            this.props.addItem(newText)
            this.state.title = ''
        }
    }

    onKeyPress = (e) => {
        if (e.key === 'Enter') {
            this.onAddItemClick()
        }
    }

    onTitleChanged = (e) => {
        this.setState({title: e.currentTarget.value, error: false})
    }

    render = () => {
        let classForError = this.state.error === true ? 'error' : ''

        return (

            <div className="todoList-newTaskForm">
                <input className={classForError}
                       type="text" placeholder="New item name"
                       onChange={this.onTitleChanged}
                       onKeyPress={this.onKeyPress}
                       value={this.state.title}
                />
                <button onClick={this.onAddItemClick}>Add</button>
            </div>
        );
    }
}

export default AddNewItemForm;

