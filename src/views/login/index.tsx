import React, {useState} from 'react';
import {connect} from 'react-redux';
import {useNavigate} from "react-router-dom";
import Layout from '@components/layout';
import Header from '@components/header';
import Content from '@components/content';
import {login} from '@actions/user';
import {setNotification,setToken} from '@actions/notifications';
import s from './styles.module.css';

interface Props {
	login: Function,
	notification:Array<String>,
	setNotification: Function,
	setToken: Function
}

const Login:React.FC<Props> = ({login,notification,setNotification,setToken}) => {
	const [form, setForm] = useState({processing:false,valid:false,submitted:false,error:null});
	const [data, setData] = useState({});
	const navigate = useNavigate();
	
	const submit = (event) => {
		event.preventDefault();

		const fields = document.querySelectorAll('#loginForm input,select');
		let valid = true;

		for(let x=0;x<fields.length;x++){
			fields[x].setAttribute('data-valid',fields[x].validity.valid ? 1 : 0);

			if(!fields[x].validity.valid && valid){
				valid = false;
			}
		}

		if(valid){
			login(data,(res) => {
				if(res.success){
					setToken(res.data.token);
				}else{
					setNotification({display:true,error:true,content:res.message});
					setForm({...form,processing:false});
				}
			})
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

	const redirect = () => {
		navigate('/password-reset');
	}

	return (
		<Layout>
			<Header />
			<Content>
				<form id="loginForm" onSubmit={submit} className={s.form} autoComplete="off" noValidate>
					<fieldset>
						<label htmlFor="email">Email</label>
						<input id="email" name="email" type="email" onKeyUp={updateField} readOnly={form.processing} autoComplete="off" required />
					</fieldset>
					<fieldset>
						<label htmlFor="password">Password</label>
						<input id="password" name="password" type="password" onKeyUp={updateField} readOnly={form.processing} autoComplete="off" required />
					</fieldset>
					<fieldset>
						<a onClick={redirect}>Forgot your password?</a>
						<button disabled={form.processing}></button>
					</fieldset>
				</form>
				<a href=""></a>
			</Content>
		</Layout>
	)
}

const mapStateToProps = ({ notification }) => ({ notification });
const mapDispatchToProps = (dispatch) => ({
	login: (data,callback) => dispatch(login(data,callback)),
	setToken: (data,callback) => dispatch(setToken(data)),
	setNotification: (data) => dispatch(setNotification(data))
});

export default connect(mapStateToProps,mapDispatchToProps)(Login);