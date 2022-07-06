import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { postAuthenticate } from "../services/authencticate-service";
import { getTipKorisnikaFromToken, setToken } from "../services/token-service";
import { useNavigate } from "react-router-dom";

function Logovanje(props) {
	const [korisnickoIme, setKorisnickoIme] = useState("");
	const [lozinka, setLozinka] = useState("");
	const navigate = useNavigate();

	function handleSubmit(e) {
		e.preventDefault();
		console.log(korisnickoIme + " " + lozinka);
		postAuthenticate(korisnickoIme, lozinka)
			.then((resp) => {
				setToken(resp.data.jwt);
				props.setStatusLogovanja(true);
				navigate("../pocetna", { replace: true });
			})
			.catch((e) => {
				console.log(e);
				alert("Losi kredencijali");
			});
	};
	return (
		<div className="row" >
			<div className="col-md-4"></div>
			<div className="col-md-4">
				<form onSubmit={handleSubmit}>
					<br />
					<br />
					<div className="form-group">
						<label htmlFor="korisnickoIme">Korisnicko ime</label>
						<input
							type="text"
							className="form-control"
							name="korisnickoIme"
							placeholder="Korisniko ime"
							vlaue={korisnickoIme}
							onChange={(e) => { setKorisnickoIme(e.target.value) }}
						></input>
					</div>
					<br />
					<div className="form-group">
						<label htmlFor="lozinka">Lozinka</label>
						<input
							type="password"
							className="form-control"
							name="lozinka"
							placeholder="Lozinka"
							value={lozinka}
							onChange={(e) => { setLozinka(e.target.value) }}
						></input>
					</div>
					<br />
					<button
						type="submit"
						className="btn btn-primary"
						onSubmit={handleSubmit}
					>
						Potvrdi
					</button>
				</form>
			</div>
			<div className="col-md-4"></div>

		</div>);
}
export default Logovanje;
