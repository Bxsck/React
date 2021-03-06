import React from 'react';
import {Field, reduxForm} from 'redux-form'; //Field -> F = capital -> reactcomponent | reduxFrom -> lowecercase r -> function
/* renderInput receive all props by <Field/> under component={this.renderInput} so {input} came from field*/
class StreamForm extends React.Component{
    renderError({error,touched}){
        if(touched && error){
            return(
                <div className="ui error message">
                    <div className="header">{error}</div>
                </div>
            );
        }
    }
    renderInput=({input,label,meta})=>{
        const className = `field ${meta.error && meta.touched ? 'error' :''}`;
        return (
            // <input 
            // onChange={formProps.input.onChange} 
            // value={formProps.input.value}
            // />
            <div className={className}>
                <label>{label}</label>
                <input {...input} autoComplete="off"/>
                {this.renderError(meta)}
            </div>
             //pass input props (formProps's) as props to <input/>
        );
    }
    onSubmit=(formValues)=>{
        // console.log(formValues);
        this.props.onSubmit(formValues);
    }
    /* onSubmit(formValues){
        // console.log(formValues);
        this.props.createStream(formValues);
    } */
    
    render(){
        return (
            <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
                <Field  name="title" component={this.renderInput} label="Enter Title"/> 
                <Field name="description" component={this.renderInput} label="Enter Description"/>
                <button className="ui button primary">Submit</button>
            </form>
        );
    }
}

const validate = (formValues) =>{
    const errors ={};
    if (!formValues.title){
        errors.title = 'You must enter a title';
    }
    if (!formValues.description){
        errors.description = 'You must enter a description';
    }
    return errors;
}
export default reduxForm({
    form: 'streamForm',
    validate
}) (StreamForm);

// export default connect(null,{createStream})(formWrapped);


/* export default reduxForm({
    form: 'streamCreate',
    validate
}) (StreamCreate); */
