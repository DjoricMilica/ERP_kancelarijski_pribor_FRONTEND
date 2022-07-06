import { useEffect, useState } from "react";
import { getKorisnici } from "../services/korisnik-service";
import { getPlacanja } from "../services/placanje-service";

function Placanja() {
    const [placanja, setPlacanja] = useState([]);
    const [kupci, setKupci] = useState([]);
    useEffect(() => {
        getPlacanja().then((resp) => {
            setPlacanja(resp.data);
        }).catch((e) => {
            console.log(e.response)
        })
        getKorisnici("tipKorisnika").then((resp) => {
            setKupci(resp.data);
        })
    }, [])
    return (
        <>
            <div className="row" >
                <div className="col-md-2"></div>
                <div className="col-md-8">

                    <div className="text-center">
                        <br />
                        <h4>Placanja</h4>
                    </div>

                    <br />
                    <div className="card-body">
                        <table className="table  table-hover">
                            <thead className="thead-dark">
                                <tr>
                                    <th>ID</th>
                                    <th>Stripe id</th>
                                    <th>Iznos</th>
                                    <th>Ime i prezime kupca</th>
                                    <th>Email kupca</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {placanja.map((placanje, i) => {
                                    return (
                                        <tr key={i}>
                                            <td>{placanje.placanjeId}</td>
                                            <td>{placanje.stripeId}</td>
                                            <td>{placanje.ukupnaCena}</td>
                                            {kupci.map((kupac, j) => {
                                                if (kupac.email === placanje.kupac) {
                                                    return (
                                                        <>
                                                            <td>{kupac.ime + kupac.prezime}</td>
                                                            <td>{kupac.email}</td>
                                                        </>
                                                    )
                                                }
                                            })}

                                        </tr>
                                    )
                                })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="col-md-2"></div>
            </div>
        </>
    )
}

export default Placanja;