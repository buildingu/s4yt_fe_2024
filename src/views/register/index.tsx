import React, {useState, useEffect, FormEvent} from 'react';
import {connect} from 'react-redux';
import Layout from '@components/layout';
import Header from '@components/header';
import Content from '@components/content';
import {registration} from '@actions/user';
import {getCountries,getRegions,getCities} from '@actions/locations';
import {getGrades,getEducation} from '@actions/options';
import {setNotification} from '@actions/notifications';
import s from './styles.module.css';

interface Props {
	registerPost:Function,
	options:Array<String>,
	getCountries:Function,
	getRegions:Function,
	getCities:Function,
	getEducation:Function
}

const Register:React.FC<Props> = ({registration,options,getCountries,getRegions,getCities,getGrades,getEducation,setNotification}) => {
	const [form, setForm] = useState({processing:false,valid:false,submitted:false,error:null});
	const [states, setStates] = useState([]);
	const [cities, setCities] = useState([]);
	const [data, setData] = useState({});

	useEffect(() => {
		if(options.countries.length === 0){
			getCountries();
		}

		if(options.grades.length === 0){
			getGrades();
		}

		if(options.education.length === 0){
			getEducation();
		}
	},[]);	
	
	useEffect(() => {
		if(data.country_iso){
			getRegions(data.country_iso,(data) => {
				setStates(data);
				setCities([]);
			});
		}else{
			setStates([]);
			setCities([]);
		}
	},[data.country_iso]);

	useEffect(() => {
		if(data.state_iso){
			getCities(data.country_iso,data.state_iso,(data) => {
				setCities(data);
			});
		}else{
			setStates([]);
			setCities([]);
		}
	},[data.state_iso]);

	const submit = (event: FormEvent) => {
		event.preventDefault();

		const fields = document.querySelectorAll('#registrationForm input,select');
		let valid = true;

		for(let x=0;x<fields.length;x++){
			fields[x].setAttribute('data-valid',fields[x].validity.valid ? 1 : 0);

			if(!fields[x].validity.valid && valid){
				valid = false;
			}
		}

		if(valid){
			registration(data,(res) => {
				if(!res.errors){
					setNotification({display:true,error:false,content:'You have been registered, please check your inbox to verify your email!',timed:false});
				}else{
					const key = Object.keys(res.errors)[0];
					
					setNotification({display:true,error:true,content:res.errors[key],timed:true});
					setForm({...form,processing:false});
				}
			});
		}

		setForm({...form,valid:valid,submitted:true,processing:valid});
		
		return false;
	}
	
	const updateField = (event) => {
		const node = event.target;
		const key = node.getAttribute('name');

		if(form.submitted){
			node.setAttribute('data-valid',node.validity.valid ? 1 : 0);
		}
		
		setData({...data,[key]:node.value});
	}

	return (
		<Layout>
			<Header />
			<Content>
				<form id="registrationForm" onSubmit={submit} className={s.form} autoComplete="off" noValidate>
					<fieldset>
						<label htmlFor="name">Name</label>
						<input id="name" name="name" type="text" onKeyUp={updateField} readOnly={form.processing} autoComplete="off" required />
					</fieldset>
					<fieldset>
						<label htmlFor="email">Email</label>
						<input id="email" name="email" type="email" onKeyUp={updateField} readOnly={form.processing} autoComplete="off" required />
					</fieldset>
					<fieldset>
						<label htmlFor="password">Pass</label>
						<input id="password" name="password" type="password" readOnly={form.processing} onKeyUp={updateField} autoComplete="off" minLength="8" maxLength="24" required />
						<label htmlFor="password_confirmation">Confirm Pass</label>
						<input id="password_confirmation" name="password_confirmation" type="password" onKeyUp={updateField} onKeyUp={updateField} readOnly={form.processing} autoComplete="off" required />
					</fieldset>
					<fieldset>
						<label htmlFor="education">Education</label>
						<select id="education" name="education_id" onChange={updateField} disabled={form.processing} required>
							<option value="">- Select -</option>
							{options.education && options.education.map((education,index) => {
								return <option key={index} value={education.id}>{education.name}</option>
							})}
						</select>
					</fieldset>
					<fieldset>
						<label htmlFor="grade">Grade</label>
						<select id="grade" name="grade_id" onChange={updateField} disabled={form.processing} required>
							<option value="">- Select -</option>
							{options.grades && options.grades.map((grade,index) => {
								return <option key={index} value={grade.id}>{grade.name}</option>
							})}
						</select>
					</fieldset>
					<fieldset>
						<label htmlFor="country">Country</label>
						<select id="country" name="country_iso" onChange={updateField} disabled={form.processing} required>
							<option value="">- Select -</option>
							{options.countries && options.countries.map((country,index) => {
								return <option key={index} value={country.iso2}>{country.name}</option>
							})}
						</select>
						<label htmlFor="region">Region</label>
						<select id="region" name="state_iso" onChange={updateField} required disabled={!data.country_iso || data.country_iso === '' || states.length === 0 || form.processing}>
							<option value="">- Select -</option>
							{states && states.map((state,index) => {
								return <option key={index} value={state.iso2}>{state.name}</option>
							})}</select>
					</fieldset>
					<fieldset>
						<label htmlFor="city">City</label>
						<select id="city" name="city_id" onChange={updateField} required disabled={!(data.country_iso && data.state_iso) || form.processing}>
							<option value="">- Select -</option>
							{cities && cities.map((city,index) => {
								return <option key={index} value={city.id}>{city.name}</option>
							})}
						</select>
					</fieldset>
					<fieldset>
						<button disabled={form.processing}></button>
					</fieldset>
				</form>
			</Content>
		</Layout>
	)
}

const mapStateToProps = ({ options }) => ({ options });
const mapDispatchToProps = (dispatch) => ({
	registration: (data,callback) => dispatch(registration(data,callback)),
	getCountries: () => dispatch(getCountries()),
	getGrades: () => dispatch(getGrades()),
	getRegions: (ciso,callback) => dispatch(getRegions(ciso,callback)),
	getCities: (ciso,siso,callback) => dispatch(getCities(ciso,siso,callback)),
	getEducation: () => dispatch(getEducation()),
	setNotification: (data) => dispatch(setNotification(data))
});

export default connect(mapStateToProps,mapDispatchToProps)(Register);