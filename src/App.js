import MyNavbar from "./components/Navbar";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import * as  React from "react";
import { useState } from "react";
import { getTipKorisnikaFromToken } from "./services/token-service";
import Logovanje from "./components/Logovanje";
import PocetnaStrana from "./components/PocetnaStrana";
import Porudzbine from "./components/Porudzbine.js";
import Proizvodi from "./components/Proizvodi";
import DlgIzmenaProizvoda from "./components/DlgIzmenaProizvoda";
import Korpa from "./components/Korpa";
import { getKorisnici } from "./services/korisnik-service";
import { useEffect } from "react";
import Placanja from "./components/Placanja";

function App() {
	const [statusLogovanja, setStatusLogovanja] =
		useState(
			localStorage.getItem("token") !== null
		);
	const promenaStatusaLogovanja = (statusLogovanjapar) => {
		setStatusLogovanja(statusLogovanjapar);
		setUloga(getTipKorisnikaFromToken());
		console.log(uloga);
	};
	const promenaProizvodaZaImenu = (proizvod) => {
		console.log(proizvod)
		setProizvodZaIzmenu(proizvod);
	}

	const [uloga, setUloga] = useState(getTipKorisnikaFromToken());
	const [proizvodZaIzmenu, setProizvodZaIzmenu] = useState();


	return (
		<div>
			<MyNavbar statusLogovanja={statusLogovanja} setStatusLogovanja={promenaStatusaLogovanja}>
				uloga={uloga} </MyNavbar>
			<BrowserRouter>
				<Routes>
					<Route
						exact
						path="logovanje"
						element={
							<Logovanje
								//statusLogovanja={statusLogovanja}
								setStatusLogovanja={promenaStatusaLogovanja}
							/>
						}
					></Route>
					<Route exact path="registracija"></Route>
					<Route exact path="proizvodi" element={<Proizvodi uloga={uloga} setProizvodZaIzmenu={promenaProizvodaZaImenu}></Proizvodi>}></Route>
					<Route
						exact
						path="pocetna"
						element={<PocetnaStrana></PocetnaStrana>}
					></Route>
					<Route exact path="porudzbine" element={<Porudzbine></Porudzbine>}></Route>
					<Route exact path="" element={<PocetnaStrana></PocetnaStrana>}></Route>
					<Route exact path="izmenaProizvoda" element={< DlgIzmenaProizvoda proizvod={proizvodZaIzmenu}></ DlgIzmenaProizvoda>}></Route>
					<Route exact path="korpa" element={<Korpa ></Korpa>}></Route>
					<Route exact path="placanja" element={<Placanja></Placanja>}></Route>
				</Routes>
			</BrowserRouter>
		</div >
	);
}

export default App;
