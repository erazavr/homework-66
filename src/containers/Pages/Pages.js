import React, {Component} from 'react';
import axiosPages from "../../axiosApi";
import withLoader from "../../hoc/withLoader";

class Pages extends Component {
    state = {
        page: null,
    };
    requestData = async ()=> {
        const response = await axiosPages.get(`/pages/${this.props.match.params.name}.json`);
        if (response.data) {
            this.setState({page: response.data});
        }
    };
    componentDidMount() {
        return this.requestData()
    }
    componentDidUpdate(prevProps) {
        if (prevProps.match.params.name !== this.props.match.params.name) {
            return this.requestData()
        }
    }
    render() {
        return this.state.page &&(
            <div style={{textAlign: 'center'}}>
                <h1>{this.state.page.title}</h1>
                <p style={{padding: '0 50px'}}>{this.state.page.content}</p>
            </div>
        );
    }
}

export default withLoader(Pages, axiosPages) ;