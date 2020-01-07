import React, {Component} from 'react';
import './PageEdit.css'
import axiosPages from "../../axiosApi";
import withLoader from "../../hoc/withLoader";
class PageEdit extends Component {
    state = {
        title: '',
        content: '',
        categories: '',
        category: '',
    };
    async componentDidMount() {
        const response = await axiosPages.get('/pages.json');
        if (response.data) {
            this.setState({
                categories: response.data
            });
        }
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.category !== this.state.category) {
            const response = await axiosPages.get(`/pages/${this.state.category}.json`);
            if (response.data) {
                this.setState({
                    title: response.data.title,
                    content: response.data.content
                });
            }
        }
    }
    inputValueChanged = e => this.setState({[e.target.name]: e.target.value});
    getCategory = (e)=> {
        this.setState({category: e.target.value})
    };
    submitHandler = async (e) => {
        e.preventDefault();
        const data = {
            title: this.state.title,
            content: this.state.content,
        };
        await axiosPages.put('/pages/' + this.state.category + '.json',data);
        this.props.history.push(`/pages/${this.state.category}`)
    };
    render() {
        return (
            <form action="" className='container' onSubmit={this.submitHandler}>
                <h1>Edit pages</h1>
                <div style={{marginBottom: '10px'}}>
                    <label className='label'>Select page</label>
                    <select name='category' style={{textTransform: 'capitalize'}} onChange={this.getCategory}>
                        {Object.keys(this.state.categories).map(q => (
                            <option key={q} value={q}>{q}</option>
                        ))}
                    </select>
                </div>
                <div style={{marginBottom: '10px'}}>
                    <label htmlFor="title" className='label'>Title</label>
                    <input
                        className='field'
                        type="text"
                        id='title'
                        name='title'
                        value={this.state.title}
                        onChange={this.inputValueChanged}
                    />
                </div>
                <div style={{marginBottom: '10px'}}>
                    <label htmlFor="content" className='label'>Content</label>
                    <textarea
                        name="content"
                        id="content"
                        cols="30"
                        rows="10"
                        value={this.state.content}
                        onChange={this.inputValueChanged}
                    />
                </div>
                <button type='submit' style={{padding: '5px 15px'}}>Edit</button>
            </form>
        );
    }
}

export default withLoader(PageEdit,axiosPages) ;