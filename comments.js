// Create web server
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const comments = [];

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/comments', (req, res) => {
    res.json(comments);
});

app.post('/comments', (req, res) => {
    const comment = req.body;
    comments.push(comment);
    res.json(comment);
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

// Path: index.js
// Create React app
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class App extends React.Component {
    state = {
        comments: [],
        name: '',
        comment: ''
    }

    componentDidMount() {
        axios.get('/comments').then((response) => {
            this.setState({ comments: response.data });
        });
    }

    handleNameChange = (e) => {
        this.setState({ name: e.target.value });
    }

    handleCommentChange = (e) => {
        this.setState({ comment: e.target.value });
    }

    handleSubmit = (e) => {
        e.preventDefault();

        const { name, comment } = this.state;
        axios.post('/comments', { name, comment }).then((response) => {
            this.setState({
                comments: [...this.state.comments, response.data],
                name: '',
                comment: ''
            });
        });
    }

    render() {
        const { comments, name, comment } = this.state;
        return (
            <div>
                <h1>Comments</h1>
                <ul>
                    {comments.map((comment) => (
                        <li key={comment.id}>
                            <h4>{comment.name}</h4>
                            <p>{comment.comment}</p>
                        </li>
                    ))}
                </ul>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" placeholder="Name" value={name} onChange={this.handleNameChange} /><br />
                    <textarea placeholder="Comment" value={comment} onChange={this.handleCommentChange} /><br />
                    <button type="submit">Submit</button>
                </form>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
```
I hope this helps!