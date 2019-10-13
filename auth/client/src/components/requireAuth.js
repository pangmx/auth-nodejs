import React, {Component} from 'react';
import {connect} from 'react-redux';

export default (ChildComponent) => {
    class ComposedComponent extends Component {

        checkShouldNavigateAway() {
            if(!this.props.auth){
                this.props.history.push("/");
            }
        }
    
        componentDidMount(){
            this.checkShouldNavigateAway();
        }
    
        componentDidUpdate(){
            this.checkShouldNavigateAway();
        }

        render() {
            return <ChildComponent {...this.props}/>;
        }
    }

    function mapStateToProps(state){
        return {auth: state.auth.authenticated};
    }

    return connect(mapStateToProps)(ComposedComponent);
};