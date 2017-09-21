import React from 'react';
import CurrencyInput from 'react-currency-input';
import './css/servicebot-base-field.css';
import ReactTooltip from 'react-tooltip'
import dollarsToCents from 'dollars-to-cents';
// import CurrencyInput from 'react-currency-masked-input'

class inputField extends React.Component {

    constructor(props) {
        super(props);
    }

    render(){
        let props = this.props;
        let {input, placeholder, label, type, meta: {touched, error, warning}} = props;
        let autofocus = props && props.willAutoFocus;

        console.log("do i have error?", error);
        let formControlClass = `form-control ${touched && error && 'has-error'} ${touched && warning && 'has-warning'}`;

        return(
            <div className={`form-group form-group-flex`}>
                {label && <label className="control-label form-label-flex-md">{label}</label>}
                <div className="form-input-flex">
                    {type === "textarea" && <textarea className={formControlClass} {...input} placeholder={label} autoFocus={autofocus}/> }
                    {(type === "text" || type === "number") && <input className={formControlClass} {...input} placeholder={placeholder || label} type={type} autoFocus={autofocus}/> }
                    {type === "checkbox" && <input className={`${formControlClass} checkbox`} {...input} placeholder={label} type={type} autoFocus={autofocus}/> }
                    {touched && ((error && <span className="form-error">{error}</span>) || (warning && <span className="form-warning">{warning}</span>)) }
                </div>
            </div>
        );
    }
}

class selectField extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }
/*    componentDidMount(){
        let {options, defaultValue} = this.props;
        let self = this;
        this.props.input.onChange(options[0]);

    }*/
    componentDidUpdate(prevProps, prevState){
        let {options, defaultValue, input} = this.props;
        let self = this;
        console.log("IOTIONS", options);
        //if there is a default value, set it, other wise, use the first option
        if((!input.value || !options.find(option =>option.id == input.value)) && options.length > 0 ){
            input.onChange(options[0].id);
        }
        else if(options.length == 0 && prevProps.options.length > 0){
            input.onChange(undefined);
        }
    }

    render() {
        let {input, label, type, options, valueKey, labelKey, meta: {touched, error, warning}} = this.props;
        return (
            <div className="form-group form-group-flex">
                {label && <label className="control-label form-label-flex-md">{label}</label>}
                <div className="form-input-flex">
                    <select className="form-control" {...input} placeholder={label}>
                        {options && options.map((option, index) =>
                            <option key={index} value={valueKey ? option[valueKey] : option.id}>
                                {labelKey ? option[labelKey] : option.name}
                            </option>
                        )
                        }
                    </select>
                    {touched && ((error && <span className="form-error">{error}</span>) || (warning && <span className="form-warning">{warning}</span>))}
                </div>
            </div>
        );
    }
}

class OnOffToggleField extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: this.props.input.value,
            hover: false,
        };

        this.toggle = this.toggle.bind(this);
        this.hoverOn = this.hoverOn.bind(this);
        this.hoverOff = this.hoverOff.bind(this);
    }

    toggle(){
        console.log(this.state);
        let newVal = !this.state.value;
        this.setState({value: newVal});
        // this.props.setValue(newVal);
        this.props.input.onChange(newVal);
    }

    hoverOn(){
        this.setState({hover:true});
    }
    hoverOff(){
        this.setState({hover:false});
    }

    render(){
        console.log("icon toggle .props", this.props);

        let { faIcon, icon, color, input, input:{name, value, onChange}, label, type} = this.props;
        let style = {};

        if( value == true || this.state.value == true ){
            style = { ...style, color: "#ffffff", backgroundColor: color};
        }else if( this.state.hover ){
            style = { ...style, color: color, borderColor: color};
        }else{
            style = { ...style, color: "#dedede" };
        }

        return(
            <div className="form-group form-group-flex">
                {label && <label className="control-label form-label-flex-md">{label}</label>}
                <div className={`iconToggleField slideToggle ${this.state.value && 'active'} ${this.state.hover && 'hover'}`}
                     data-tip={label} onMouseEnter={this.hoverOn} onMouseLeave={this.hoverOff} onClick={this.toggle}>
                    <span style={style} className="itf-icon">
                        <i className={`fa fa-${faIcon}`}/>
                    </span>
                    <ReactTooltip place="bottom" type="dark" effect="solid"/>
                    <input className="hidden checkbox"
                           name={name}
                           value={value || this.state.value}
                           placeholder={label}
                           type={type}/>
                </div>
            </div>
        )
    }
}

class iconToggleField extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value || this.props.defaultValue,
            hover: false,
        };

        this.toggle = this.toggle.bind(this);
        this.hoverOn = this.hoverOn.bind(this);
        this.hoverOff = this.hoverOff.bind(this);
    }

    toggle(){
        console.log(this.state);
        let newVal = !this.state.value;
        this.setState({value: newVal});
        this.props.setValue(newVal);
    }

    hoverOn(){
        this.setState({hover:true});
    }
    hoverOff(){
        this.setState({hover:false});
    }

    render(){
        console.log("icon toggle .props", this.props);

        let { faIcon, icon, color, input, input:{name, value, onChange}, label, type, meta: {touched, error, warning} } = this.props;
        let style = {};

        if( value == true || this.state.value == true ){
            style = { ...style, color: "#ffffff", backgroundColor: color};
        }else if( this.state.hover ){
            style = { ...style, color: color, borderColor: color};
        }else{
            style = { ...style, color: "#dedede" };
        }

        return(
            <div className={`iconToggleField ${value || this.state.value && 'active'} ${this.state.hover && 'hover'}`}
                 style={style} data-tip={label}
                 onMouseEnter={this.hoverOn} onMouseLeave={this.hoverOff}>
                <span className="itf-icon" onClick={this.toggle}>
                    <i className={`fa fa-${faIcon}`}/>
                </span>
                <ReactTooltip place="bottom" type="dark" effect="solid"/>
                <input className="hidden checkbox"
                       name={name}
                       value={value || this.state.value}
                       onChange={onChange}
                       placeholder={label}
                       type={type}/>
            </div>
        )
    }
}

class priceField extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            amount: "0.00"
        };
        this.handleChange = this.handleChange.bind(this);
    };

    handleChange(e, maskedValue, floatvalue) {
        let name = e.target.name;
        let self = this;
        this.setState({[name]: floatvalue}, () => {
            self.props.input.onChange(self.state[name]);
        });
    }

    render() {
        let {input:{name, value, onChange}, label, type, meta: {touched, error, warning}} = this.props;
        // console.log("Price Input", input);
        console.log("the value", value);
        return (
            <div className={`form-group form-group-flex`}>
                {label && <label className="control-label form-label-flex-md">{label}</label>}
                <div className="form-input-flex">
                    <CurrencyInput className="form-control" name={name}
                        prefix="$" decimalSeparator="." thousandSeparator="," precision="2"
                        onChangeEvent={this.handleChange} value={this.state[name]}
                    />
                    {touched && ((error && <span className="form-error">{error}</span>) || (warning &&
                    <span className="form-warning">{warning}</span>))}
                </div>
            </div>
        );
    };
}

export {inputField, selectField, OnOffToggleField, iconToggleField, priceField};