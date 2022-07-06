import { useEffect, useState } from "react";
import { deleteProizvod, getProizvodi } from "../services/proizvodi-service";
import "bootstrap/dist/css/bootstrap.min.css";
import { Dropdown } from "react-bootstrap";
import { getKategorije } from "../services/kategorija-service";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { isVisible } from "@testing-library/user-event/dist/utils";

function Proizvodi(props) {
    const [proizvodi, setProizvodi] = useState([]);
    const [kategorije, setKategorije] = useState([]);
    const navigate = useNavigate();
    const [pageNo, setPageNo] = useState(0);
    const array = [];
    const [search, setSearch] = useState("");

    const ucitajKategorije = () => {
        getKategorije()
            .then((resp) => {
                setKategorije(resp.data)
            }).catch((e) => {
                console.log(e)
            })
    }
    useEffect(() => {
        getProizvodi(pageNo)
            .then((resp) => {
                setProizvodi(resp.data);
            }).catch((e) => {
                console.log(e);
            })
    }, [pageNo])
    useEffect(() => {
        ucitajKategorije();
    }, [])

    const btnObrisiClicked = (id) => {
        deleteProizvod(id).then((resp) => {
        }).catch((e) => {
            console.log(e);
        })
        return;
    }

    const btnIzmeniClicked = (proizvod) => {
        console.log(proizvod.cena)
        props.setProizvodZaIzmenu(proizvod);
        navigate("../izmenaProizvoda", { replace: true });
    }
    const btnDodajUKorpuClicked = (proizvod) => {
        proizvod.kolicina = 1;
        array.push(proizvod);
        localStorage.setItem("korpa", JSON.stringify(array));
        //console.log(localStorage.getItem("korpa"));
    }
    const btnSledecaClicked = () => {
        setPageNo(pageNo + 1);
    }
    const btnPrethodnaClicked = () => {
        setPageNo(pageNo - 1);
    }
    const handleChangeSearch = (e) => {
        setSearch(e);
    }

    return (
        <div>
            <div className="text-center">
                <br />
                <h2>Proizvodi</h2>
                <br />
            </div>
            <div className="row" >
                <div className="col-md-3">
                    <Dropdown.Menu show >
                        <Dropdown.Header ><h3>Kategorije proizvoda</h3></Dropdown.Header>
                        {kategorije.map((kategorija, i) => {
                            return (
                                <Dropdown.Item className="text-uppercase" eventKey={i} onClick={(e) => handleChangeSearch(kategorija.nazivKategorija)} >{kategorija.nazivKategorija}</Dropdown.Item>
                            )
                        })}
                    </Dropdown.Menu>
                </div>

                <div className="col-md-9">
                    <div className="row">
                        <input placeholder="Pretraga..." onChange={e => handleChangeSearch(e.target.value)}></input>
                    </div>
                    <br></br>
                    <div className="card-group">
                        {proizvodi.filter(proizvod => {
                            if (search === "") {
                                return proizvod;
                            } else if (proizvod.naziv.toLowerCase().includes(search.toLocaleLowerCase())) {
                                return proizvod;
                            }
                        }).map((proizvod, i) => {
                            return (
                                <div className="card text-white text-center bg-secondary  col-md-6" key={i}>
                                    <div className="card-header bg-dark">
                                        <h5 className="text-uppercase"> {proizvod.naziv + " " + proizvod.vrsta.nazivVrste}</h5>
                                    </div>

                                    <div className="card-body" key={i}>

                                        <div className="form-inline">
                                            <label className="text-uppercase col-md-6 ">Kategorija</label>
                                            <label className="col-md-6 ">{proizvod.kategorija.nazivKategorija}</label>
                                        </div>

                                        <div className="form-inline">
                                            <label className="col-md-6 text-uppercase">Proizvodjac</label>
                                            <label className="col-md-6 ">{proizvod.proizvodjac.nazivProizvodjaca}</label>

                                        </div>

                                        <div className="form-inline">
                                            <label className="col-md-6 text-uppercase">Cena</label>
                                            <label className="col-md-6 ">{proizvod.cena}</label>

                                        </div>
                                        <div className="form-inline">
                                            <label className="col-md-6 text-uppercase">Stanje na zalihama</label>
                                            <label className="col-md-6 ">{proizvod.naStanju}</label>

                                        </div>
                                        <div className="form-inline">
                                            <label className="col-md-6 text-uppercase">Jedinica pakovanja</label>
                                            <label className="col-md-6 ">{proizvod.jedinica}</label>

                                        </div>
                                    </div>
                                    <div className="card-footer bg-dark border-success">
                                        <div className="form-inline">
                                            {props.uloga === 'zaposleni' && <button className="btn btn-danger save-btn" type="button" onClick={() => btnObrisiClicked(proizvod.proizvodId)}>Obrisi</button>}
                                            {props.uloga === 'zaposleni' && <button className="btn btn-primary" type="button" onClick={() => btnIzmeniClicked(proizvod)}>Izmeni</button>}
                                            {props.uloga === 'kupac' && <button className="btn btn-primary" onClick={() => btnDodajUKorpuClicked(proizvod)} >Dodaj u korpu</button>}

                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <br></br>
                    <div className="form-inline form-center">
                        {pageNo === 0 ? "" : <button className=" btn-sm" onClick={btnPrethodnaClicked}>Prethodna</button>}
                        {proizvodi.length < 2 ? "" : <button className="btn-sm " onClick={btnSledecaClicked}>Sledeca</button>}
                    </div>
                </div>
            </div>

        </div >
    );
}
export default Proizvodi;