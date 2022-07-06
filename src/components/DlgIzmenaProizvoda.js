import React from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState, useEffect } from "react";
import { getProizvodjaci } from "../services/proizvodjac-service";
import { getKategorije } from "../services/kategorija-service";
import { getVrste } from "../services/vrsta-service"
import { putProizvod } from "../services/proizvodi-service";
import { useNavigate } from "react-router-dom";

function DlgIzmenaProizvoda(props) {
    const [proizvodjaci, setProizvodjaci] = useState([]);
    const [kategorije, setKategorije] = useState([]);
    const [vrste, setVrste] = useState([]);
    const [cena, setCena] = useState(props.proizvod.cena);
    const [naziv, setNaziv] = useState(props.proizvod.naziv);
    const [naStanju, setNaStanju] = useState(props.proizvod.naStanju);
    const [jedinica, setJedinica] = useState(props.proizvod.jedinica);
    const [vrsta, setVrsta] = useState(props.proizvod.vrsta.nazivVrste);
    const [vrstaId, setVrstaId] = useState(props.proizvod.vrsta.vrstaId);
    const [proizvodjacId, setProizvodjacId] = useState(props.proizvod.proizvodjac.proizvodjacId);
    const [kategorijaId, setKategorijaId] = useState(props.proizvod.kategorija.kategorijaId);
    const [kategorija, setKategorija] = useState(props.proizvod.kategorija.nazivKategorija);
    const [proizvodjac, setProizvodjac] = useState(props.proizvod.proizvodjac.nazivProizvodjaca);
    const navigate = useNavigate()

    const btnPotvrdiClicked = () => {
        putProizvod(
            props.proizvod.proizvodId, cena, naziv, naStanju, jedinica, vrsta, vrstaId, kategorija, kategorijaId, proizvodjac, proizvodjacId
        ).then((resp) => {
            console.log("izmenjeno");
            navigate("../proizvodi", { replace: true });
        }).catch((e) => {
            console.log(e.response.data);
        })
    }
    const ucitajProizvodjace = () => {
        getProizvodjaci()
            .then((resp) => {
                console.log(resp.data)
                setProizvodjaci(resp.data)
            }).catch((e) => {
                console.log(e);
            })
    }
    const ucitajKategorije = () => {
        getKategorije()
            .then((resp) => {
                setKategorije(resp.data)
            }).catch((e) => {
                console.log(e)
            })
    }
    const ucitajVrste = () => {
        getVrste()
            .then((resp) => {
                setVrste(resp.data)
                // console.log(resp.data)
            }).catch((e) => {
                console.log(e);
            })
    }
    useEffect(() => {
        ucitajProizvodjace();
        ucitajKategorije();
        ucitajVrste();
    }, [])

    const handleVrsta = (e) => {
        setVrsta(e.target.value);
        const index = e.target.options.selectedIndex;
        setVrstaId(e.target.options[index].getAttribute('id'));
    }
    const handleProizvodjac = (e) => {
        setProizvodjac(e.target.value);
        const index = e.target.options.selectedIndex;
        setProizvodjacId(e.target.options[index].getAttribute('id'));
    }
    const handleKategorija = (e) => {
        setKategorija(e.target.value);
        const index = e.target.options.selectedIndex;
        setKategorijaId(e.target.options[index].getAttribute('id'));
        console.log(kategorija, kategorijaId)
    }
    return (
        <div>
            <Dialog open >
                <DialogTitle>Izmena proizvoda</DialogTitle>
                <DialogContent >
                    <DialogContentText>
                        Izmenite osnovne podatke o proizvodima
                    </DialogContentText>
                    <br />
                    <TextField type="text" fullWidth variant="standard" label="Naziv"
                        defaultValue={props.proizvod.naziv} onChange={(e) => setNaziv(e.target.value)}></TextField>
                    <br />
                    <TextField type="number" fullWidth variant="standard" label="Cena"
                        defaultValue={props.proizvod.cena} onChange={(e) => setCena(e.target.value)}></TextField>
                    <br />
                    <br />
                    <TextField type="text" fullWidth variant="standard" label="Jedinica"
                        defaultValue={props.proizvod.jedinica} onChange={(e) => setJedinica(e.target.value)}></TextField>
                    <br />
                    <br />
                    <TextField type="number" fullWidth variant="standard" label="Na stanju"
                        defaultValue={props.proizvod.naStanju} onChange={(e) => setNaStanju(e.target.value)}></TextField>
                    <br />
                    <label >Kategorija</label>
                    <select className="form-select" onChange={(e) => handleKategorija(e)} value={kategorija}>
                        <option>{props.proizvod.kategorija.nazivKategorija}</option>
                        {kategorije.map((kategorija, i) => {
                            return (
                                <option key={i} id={kategorija.kategorijaId} value={kategorija.nazivKategorija} >{kategorija.nazivKategorija} </option>
                            )
                        })}
                    </select>
                    <br />
                    <label >Proizvodjac</label>
                    <select className="form-select" onChange={(e) => handleProizvodjac(e)} value={proizvodjac}>
                        <option>{props.proizvod.proizvodjac.nazivProizvodjaca}</option>
                        {proizvodjaci.map((proizvodjac, i) => {
                            return (
                                <option key={i} id={proizvodjac.proizvodjacId} value={proizvodjac.nazivProizvodjaca}>{proizvodjac.nazivProizvodjaca}</option>
                            )
                        })}
                    </select>
                    <br />
                    <label >Vrsta</label>
                    <select className="form-select" onChange={(e) => handleVrsta(e)} value={vrsta} >
                        <option>{props.proizvod.vrsta.nazivVrste}</option>
                        {vrste.map((vrsta, i) => {
                            return (
                                <option key={i} id={vrsta.vrstaId} value={vrsta.nazivVrste} >{vrsta.nazivVrste}</option>
                            )
                        })}
                    </select>

                </DialogContent>
                <DialogActions>
                    <Button onClick={btnPotvrdiClicked}>Potvrdi</Button>
                    <Button onClick={() => navigate("../proizvodi", { replace: true })}>Otkazi</Button>
                </DialogActions>
            </Dialog>
        </div >
    );
}

export default DlgIzmenaProizvoda;