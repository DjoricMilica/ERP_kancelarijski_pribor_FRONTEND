import { useEffect, useState } from "react";
import { findKorisnik, getId, getKorisnici, getKorisnik } from "../services/korisnik-service";
import { postPoruceniProizvod } from "../services/poruceni-proizvod-service";
import { getPorudzbinaById, getPorudzbine, postPorudzbina, putPorudzbina } from "../services/porudzbina-service";
import { getProizvodById } from "../services/proizvodi-service";
import { getUsernameFromToken } from "../services/token-service";

function Korpa(props) {
    const [korpa, setKorpa] = useState(JSON.parse(localStorage.getItem("korpa")));
    const [kolicina, setKolicina] = useState(1);
    const [adresaIsporuke, setAdresaIsporuke] = useState("");
    const [porudzbina, setPorudzbina] = useState({
        porudzbinaId: 885,
        adresaIsporuke: adresaIsporuke,
        datumKreiranja: "2022-05-01",
        statusIsporuke: false,
        statusNaplate: false,
        ukupnaCena: 0,
        vremeKreiranja: "11:11:11",
        korisnik: {
            korisnikId: 1, ime: "", prezime: "", kontakt: "", lozinka: "", korisnickoIme: "",
            email: "", stanjeNaRacunu: 0, jmbg: "", tipKorisnika: ""
        }
    })
    var date = new Date();
    var datumKreiranja = date.getFullYear() + "-0" + date.getMonth() + "-0" + date.getDate();
    var vremeKreiranja = date.getHours() + ':0' + date.getMinutes() + ':' + date.getSeconds();
    const [korisnici, setKorisnici] = useState([]);
    const [porudzbine, setPorudzbine] = useState([]);
    const [kreiranaPorudzbina, setKreiranaPorudzbina] = useState(false);
    const [ucitanePorudzbine, setUcitanePorudzbine] = useState(false);
    const [dodavanjeProizvodaNaPorudzbinu, setDodavanjeProizvodaNaPorudzbinu] = useState(false);
    const [proizvodiIzKorpe, setProizvodiIzKorpe] = useState([]);

    useEffect(() => {
        // console.log(date.to);
        getKorisnici("korisnickoIme").then((resp) => {
            setKorisnici(resp.data);
        })
    }, [])

    useEffect(() => {
        if (kreiranaPorudzbina === true) {
            getPorudzbine().then((resp) => {
                setPorudzbine(resp.data);
                setUcitanePorudzbine(true);
            })
        }
    }, [kreiranaPorudzbina])


    useEffect(() => {
        if (ucitanePorudzbine === true) {
            setPorudzbina(porudzbine.find(porudzbina => {
                return porudzbina.datumKreiranja === datumKreiranja && porudzbina.adresaIsporuke === adresaIsporuke
            }))
            setDodavanjeProizvodaNaPorudzbinu(true);
        }
    }, [ucitanePorudzbine])

    useEffect(() => {
        if (dodavanjeProizvodaNaPorudzbinu === true) {
            //console.log(korpa);
            korpa.map((proizvod, i) => {
                console.log(proizvod)
                postPoruceniProizvod(55, proizvod.kolicina, porudzbina, proizvod)
            })
        }
    }, [dodavanjeProizvodaNaPorudzbinu])

    const btnPoruciClicked = () => {
        if (adresaIsporuke === "") {
            alert("Unesite adresu isporuke!")
        } else {
            porudzbina.adresaIsporuke = adresaIsporuke;
            porudzbina.korisnik = korisnici.find(korisnik => { return korisnik.korisnickoIme === getUsernameFromToken() })
            porudzbina.datumKreiranja = datumKreiranja;
            porudzbina.vremeKreiranja = vremeKreiranja;
            console.log(porudzbina);
            postPorudzbina(porudzbina).then(() => {
                setKreiranaPorudzbina(true);
            }).catch((e) => { console.log(e.message) });
        }
    }

    const btnObrisiProizvodClicked = (i) => {
        console.log(i)
        setKorpa(korpa.splice(i, 1))
        console.log(korpa);
    }
    const handleChangeKolicina = (i, kolicina) => {
        setKolicina(kolicina);
        korpa[i].kolicina = kolicina;
    }
    const handleAdresaIsporuke = (adresa) => {
        setAdresaIsporuke(adresa);
        //pronalazenje korisnika i kreiranje porudzbine
    }
    return (
        <div>
            {korpa === null ? <h1>Nema proizvoda u korpi</h1> :
                <div className="row" >
                    <div className="col-md-2"></div>
                    <div className="col-md-8">
                        <div className="text-center">
                            <br />
                            <h4>Vasa korpa</h4>
                        </div>
                        <br />
                        <div className="card-body">
                            <table className="table  table-hover">
                                <thead className="thead-dark">
                                    <tr>
                                        <th>ID</th>
                                        <th>Naziv</th>
                                        <th>Vrsta</th>
                                        <th>Kategorija</th>
                                        <th>Proizvodi</th>
                                        <th>Cena</th>
                                        <th>Kolicina</th>
                                        <th>Opcije</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {korpa.map((proizvod, i) => {
                                        return (
                                            <tr key={i}>
                                                <td>{proizvod.proizvodId}</td>
                                                <td>{proizvod.naziv}</td>
                                                <td>{proizvod.vrsta.nazivVrste}</td>
                                                <td>{proizvod.kategorija.nazivKategorija}</td>
                                                <td>{proizvod.proizvodjac.nazivProizvodjaca}</td>
                                                <td>{proizvod.cena}</td>
                                                <td>
                                                    <input type="number" defaultValue={kolicina} onChange={(e) => handleChangeKolicina(i, e.target.value)}></input>
                                                </td>
                                                <td>
                                                    <button onClick={() => btnObrisiProizvodClicked(i)}>Obrisi</button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                    }
                                </tbody>
                            </table>
                            <label>Unesi adresu isporuke </label> <br></br>
                            <input type='text' defaultValue={adresaIsporuke} onChange={(e) => handleAdresaIsporuke(e.target.value)}></input>
                            <button
                                className="btn btn-primary"
                                onClick={btnPoruciClicked}>Poruci</button>
                        </div>
                    </div>
                    <div className="col-md-2"></div>

                </div>}
        </div>
    );
}
export default Korpa;