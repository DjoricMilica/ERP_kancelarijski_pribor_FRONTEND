import { Container, Nav, Navbar } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { getTipKorisnikaFromToken } from "../services/token-service";

class MyNavbar extends React.Component {
	handleOdjava = (e) => {

		console.log(this.props.uloga);
		localStorage.clear();
		this.props.setStatusLogovanja(false);
	}
	render() {
		return (
			<Navbar bg="dark" variant="dark">
				<Container>
					<Navbar.Brand>Kancelarijski pribor</Navbar.Brand>
					<Nav className="me-auto">
						{this.props.statusLogovanja && <Nav.Link href="proizvodi">Proizvodi</Nav.Link>}
						{!this.props.statusLogovanja && <Nav.Link href="logovanje">Logovanje</Nav.Link>}
						{getTipKorisnikaFromToken() === 'kupac' && <Nav.Link href="porudzbine">Porudzbine</Nav.Link>}
						{getTipKorisnikaFromToken() === 'kupac' && <Nav.Link href="korpa">Korpa</Nav.Link>}
						{getTipKorisnikaFromToken() === 'zaposleni' && <Nav.Link href="placanja">Placanja</Nav.Link>}
						{this.props.statusLogovanja && <Nav.Link href="pocetna" onClick={this.handleOdjava}>Odjava</Nav.Link>}
					</Nav>
				</Container>
			</Navbar>
		);
	}
}
export default MyNavbar;
