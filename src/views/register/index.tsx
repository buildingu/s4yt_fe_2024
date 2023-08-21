import React, {useState, useEffect, FormEvent} from 'react';
import {connect} from 'react-redux';
import Layout from '@components/layout';
import Header from '@components/header';
import Content from '@components/content';
import {registration} from '@actions/user';
import {getCountries,getRegions,getCities} from '@actions/locations';
import {getGrades,getEducation} from '@actions/options';
import s from './styles.module.css';

interface RegisterForm {
	name: string | null,
  	email: string | null,
  	grade_id: string | null,
  	education_id: string | null,
  	password: string | null,
  	password_confirmation: string | null,
  	country_iso: string | null,
  	city_id: string | null,
  	state_iso: string | null
}

const Register:React.FC<Props> = ({registration,options,getCountries,getRegions,getCities,getGrades,getEducation} : {registerPost:Function,options:Array<String>,getCountries:Function,getRegions:Function,getCities:Function,getEducation:Function}) => {
	const [form, setForm] = useState({
		processing:false,
		valid:false,
		submitted:false,
		error:null,
	});
	const [states, setStates] = useState([]);
	const [cities, setCities] = useState([]);
	const [data, setData] = useState<RegisterForm>({
		name:null,
	  	email:null,
	  	password:null,
	  	password_confirmation:null,
	  	grade_id:null,
	  	education_id:null,
	  	country_iso:null,
	  	city_id:null,
	  	state_iso:null,
	});

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

		let valid = true;

		Object.entries(data).map((key) => {
			if((!key[1] || key[1] === '') && valid){
				valid = false;
			}
		})
		console.log(data);
		if(valid && data.password === data.password_confirmation){
			registration(data,(res) => {
				if(!res.errors){

				}else{
					const key = Object.keys(res.errors)[0];
					
					alert(res.errors[key]);
					setForm({...form,processing:false});
				}
			});
		}

		setForm({...form,valid:valid,submitted:true,processing:valid});
		
		return false;
	}
	
	const updateField = (event: FormEvent) => {
		const node = event.target as HTMLTextAreaElement;
		const key = node.getAttribute('name') as keyof typeof data;
		
		setData({...data,[key]:node.value});
	}

	return (
		<Layout>
			<Header />
			<Content>
				<form onSubmit={submit} className={s.form} autoComplete="off" noValidate>
					<fieldset>
						<label>Name</label>
						<input name="name" type="text" onKeyUp={updateField} className={form.submitted && (!data.name || data.name === '') ? s.error : null} readOnly={form.processing} autoComplete="off" />
					</fieldset>
					<fieldset>
						<label>Email</label>
						<input name="email" type="email" onKeyUp={updateField} className={form.submitted && (!data.email || data.email === '') ? s.error : null} readOnly={form.processing} autoComplete="off" />
					</fieldset>
					<fieldset>
						<label>Pass</label>
						<input name="password" type="password" className={form.submitted && (!data.password || data.password === '') ? s.error : null} readOnly={form.processing} onKeyUp={updateField} autoComplete="off" />
						<label>Confirm Pass</label>
						<input name="password_confirmation" type="password" onKeyUp={updateField} className={form.submitted && (!data.password_confirmation || data.password_confirmation === '') ? s.error : null} onKeyUp={updateField} readOnly={form.processing} autoComplete="off" />
						{form.submitted && data.password_confirmation !== '' && data.password !== '' && data.password_confirmation !== data.password && <span>Passwords do not match!</span>}
					</fieldset>
					<fieldset>
						<label>Education</label>
						<select name="education_id" onChange={updateField} className={form.submitted && (!data.education_id || data.education_id === '') ? s.error : null} readOnly={form.processing}>
							<option>- Select -</option>
							{options.education && options.education.map((education,index) => {
								return <option key={index} value={education.id}>{education.name}</option>
							})}
						</select>
					</fieldset>
					<fieldset>
						<label>Grade</label>
						<select name="grade_id" onChange={updateField} className={form.submitted && (!data.grade_id || data.grade_id === '') ? s.error : null} readOnly={form.processing}>
							<option>- Select -</option>
							{options.grades && options.grades.map((grade,index) => {
								return <option key={index} value={grade.id}>{grade.name}</option>
							})}
						</select>
					</fieldset>
					<fieldset>
						<label>Country</label>
						<select name="country_iso" onChange={updateField} className={form.submitted && (!data.country_iso || data.country_iso === '') ? s.error : null} readOnly={form.processing}>
							<option value="">- Select -</option>
							{options.countries && options.countries.map((country,index) => {
								return <option key={index} value={country.iso2}>{country.name}</option>
							})}
						</select>
						{(data.country_iso && data.country_iso !== '') && states.length > 0 && <><label>Region</label>
						<select name="state_iso" onChange={updateField} className={form.submitted && (!data.state_iso || data.state_iso === '') ? s.error : null} readOnly={form.processing}>
							<option value="">- Select -</option>
							{states && states.map((state,index) => {
								return <option key={index} value={state.iso2}>{state.name}</option>
							})}</select></>}
					</fieldset>
					{data.country_iso && data.state_iso && <fieldset>
						<label>City</label>
						{cities.length > 0 && <select name="city_id" onChange={updateField} className={form.submitted && (!data.city_id || data.city_id === '') ? s.error : null} readOnly={form.processing}>
							<option value="">- Select -</option>
							{cities && cities.map((city,index) => {
								return <option key={index} value={city.id}>{city.name}</option>
							})}
						</select>}
					</fieldset>}
					<fieldset>
						{form.processing}
						<button disabled={form.processing}></button>
					</fieldset>
				</form>
			</Content>
		</Layout>
	)
}

const mapStateToProps = ({ options }:{ options:Array<String> }) => ({ options });
const mapDispatchToProps = (dispatch: Function) => ({
	registration: (data: Array<String>, callback: Function) => dispatch(registration(data,callback)),
	getCountries: () => dispatch(getCountries()),
	getGrades: () => dispatch(getGrades()),
	getRegions: (ciso,callback) => dispatch(getRegions(ciso,callback)),
	getCities: (ciso,siso,callback) => dispatch(getCities(ciso,siso,callback)),
	getEducation: () => dispatch(getEducation())
});

export default connect(mapStateToProps,mapDispatchToProps)(Register);