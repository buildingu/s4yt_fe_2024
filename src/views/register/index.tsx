import React, {useState, useEffect, FormEvent} from 'react';
import {connect} from 'react-redux';
import Layout from '@components/layout';
import Header from '@components/header';
import Content from '@components/content';
import {registration} from '@actions/user';
import {getCountries,getRegions,getCities} from '@actions/locations';
import {getGrades} from '@actions/options';
import s from './styles.module.css';

interface RegisterForm {
	name: string | null,
  	email: string | null,
  	grade: string | null,
  	password: string | null,
  	confirm_password: string | null,
  	country: string | null,
  	city: string | null,
  	region: string | null
}

const Register:React.FC<Props> = ({registration,options,getCountries,getRegions,getCities,getGrades} : {registerPost:Function,options:Array<String>,getCountries:Function,getRegions:Function,getCities:Function}) => {
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
	  	confirm_password:null,
	  	country:null,
	  	city:null,
	  	region:null,
	});

	useEffect(() => {
		if(options.countries.length === 0){
			getCountries();
		}

		if(options.grades.length === 0){
			getGrades();
		}
	},[]);

	useEffect(() => {
		if(data.country){
			getRegions(data.country,(data) => {
				setStates(data);
				setCities([]);
			});
		}else{
			setStates([]);
			setCities([]);
		}
	},[data.country]);

	useEffect(() => {
		if(data.region){
			getCities(data.country,data.region,(data) => {
				setCities(data);
			});
		}else{
			setStates([]);
			setCities([]);
		}
	},[data.region]);

	const submit = (event: FormEvent) => {
		event.preventDefault();

		let valid = true;

		Object.entries(data).map((key) => {
			if((!key[1] || key[1] === '') && valid){
				valid = false;
			}
		})

		if(valid && data.password === data.confirm_password){

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
			<Header>
				<img src="/assets/s4yt.png" alt="s4yt" className={s.logo} />
			</Header>
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
						<input name="confirm_password" type="password" onKeyUp={updateField} className={form.submitted && (!data.confirm_password || data.confirm_password === '') ? s.error : null} onKeyUp={updateField} readOnly={form.processing} autoComplete="off" />
						{form.submitted && data.confirm_password !== '' && data.password !== '' && data.confirm_password !== data.password && <span>Passwords do not match!</span>}
					</fieldset>
					<fieldset>
						<label>Grade</label>
						<select name="grade" onChange={updateField} className={form.submitted && (!data.grade || data.grade === '') ? s.error : null} readOnly={form.processing}>
							<option>- Select -</option>
							{options.grades && options.grades.map((grade,index) => {
								return <option key={index} value={grade.id}>{grade.name}</option>
							})}
						</select>
					</fieldset>
					<fieldset>
						<label>Country</label>
						<select name="country" onChange={updateField} className={form.submitted && (!data.country || data.country === '') ? s.error : null} readOnly={form.processing}>
							<option value="">- Select -</option>
							{options.countries && options.countries.map((country,index) => {
								return <option key={index} value={country.iso2}>{country.name}</option>
							})}
						</select>
						{(data.country && data.country !== '') && states.length > 0 && <><label>Region</label>
						<select name="region" onChange={updateField} className={form.submitted && (!data.region || data.region === '') ? s.error : null} readOnly={form.processing}>
							<option value="">- Select -</option>
							{states && states.map((state,index) => {
								return <option key={index} value={state.iso2}>{state.name}</option>
							})}</select></>}
					</fieldset>
					{data.country && data.region && <fieldset>
						<label>City</label>
						{cities.length === 0 && <input name="city" type="text" />}
						{cities.length > 0 && <select name="city" onChange={updateField} className={form.submitted && (!data.city || data.city === '') ? s.error : null} readOnly={form.processing}>
							<option value="">- Select -</option>
							{cities && cities.map((city,index) => {
								return <option key={index} value={city.name}>{city.name}</option>
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
	getCities: (ciso,siso,callback) => dispatch(getCities(ciso,siso,callback))
});

export default connect(mapStateToProps,mapDispatchToProps)(Register);