import * as React from "react";
import { observable, action } from "mobx";
import { observer } from "mobx-react"

// Meterial-UI
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";

const s = require("./style.scss");

export interface ITaskFields {
	name: string;
	user: string;
}

interface IProps {
	onSubmit: (fields: ITaskFields) => void;
	UsersOptions: {
		name: string;
		id: string;
	}[];
}

@observer
export class TaskForm extends React.Component<IProps, {}> {
	@observable name: string = "";
	@observable user: string = "";

	@action
	changeName = (name: string) => this.name = name;

	@action
	changeUser = (user: string) => this.user = user;

	handleSubmit = (e: any) => {
		e.preventDefault();

		this.props.onSubmit({
			name: this.name,
			user: this.user,
		});

		this.changeUser("");
		this.changeName("");
	}

	render() {
		return (
			<Card className={s.card}>
				<div className={s.title}>Adicionar nova tarefa</div>
				<form onSubmit={this.handleSubmit} className={s.form}>
					<div className={s.inputGroup}>
						<TextField
							value={this.name}
							onChange={(e) => this.changeName(e.target.value)}
							label="Nome"
							name="nome"
							required
						/>
					</div>

					<div className={s.inputGroup}>
						<FormControl className={s.select}>
							<InputLabel htmlFor="user">Usuário</InputLabel>
							<Select
								value={this.user}
								onChange={(e) => this.changeUser(e.target.value)}
								input={<Input name="user" id="user" />}
							>
								{this.props.UsersOptions.map((user, index) => (
									<MenuItem value={user.id} key={index}>{user.name}</MenuItem>
								))}
							</Select>
						</FormControl>
					</div>

					<Button variant="raised" size="medium" color="primary" type="submit">
						Adicionar
				</Button>
				</form>
			</Card>
		)
	}
}