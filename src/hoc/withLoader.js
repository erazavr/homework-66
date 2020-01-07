import React, {Component, Fragment} from 'react';
import Spinner from "../components/UI/Spinner/Spinner";
import Modal from "../components/UI/Modal/Modal";

const WithLoader = (WrappedComponent,axios) => {
    return class WithLoader extends Component {
        constructor(props) {
            super(props);
            this.state = {
                loading: false,
                error: null,
            };
            axios.interceptors.request.use(req => {
                this.setState({loading:true});
                return req;
            });
            axios.interceptors.response.use(res => {
                this.setState({loading: false});
                return res;
            }, error => {
                this.setState({error});
                throw error
            })
        }
        dismissError = ()=> {
          this.setState({error: null})
        };

        render() {
            return (
                <Fragment>
                    {this.state.loading && <Spinner/>}
                    <WrappedComponent {...this.props}/>
                    <Modal show={!!this.state.error} close={this.dismissError}>
                        {this.state.error && String(this.state.error)}
                    </Modal>
                </Fragment>
            );
        }
    }
};

export default WithLoader;