import React, { useEffect, useState } from "react";
import { getPorudzbine, putPorudzbina } from "../services/porudzbina-service";
import { getToken, getUsernameFromToken } from "../services/token-service";
import axios from "axios";
import Stripe from "react-stripe-checkout";

function PorudzbineTable() {
    const [porudzbine, setPorudzbine] = useState([]);
    // const [porudzbinaZaPlacanje, setPorudzbinaZaPlacanje] = useState({});

    useEffect(() => {
        getPorudzbine().then((resp) => {
            setPorudzbine(resp.data);
        })
    }, [])

    function handleToken(token, porudzbina) {
        console.log(token);
        console.log(porudzbina)
        console.log(porudzbina.korisnik.ime + " " + porudzbina.korisnik.prezime)
        axios.post("http://localhost:8083/payment/charge", "", {
            headers: {
                token: token.id,
                amount: porudzbina.ukupnaCena,
                Authorization: "Bearer " + getToken()
            },
        }).then(() => {
            porudzbina.statusNaplate = true;
            console.log(porudzbina.statusNaplate);
            putPorudzbina(porudzbina);
            alert("Naplata je uspesna");
            window.location.reload();
        }).catch((error) => {
            console.log(error.message);
        });
    }
    const btnOtkaziClicked = (i) => {

    }
    return (
        <>
            <div className="row" >
                <div className="col-md-2"></div>
                <div className="col-md-8">

                    <div className="text-center">
                        <br />
                        <h4>Porudzbine</h4>
                    </div>

                    <br />
                    <div className="card-body">
                        <table className="table  table-hover">
                            <thead className="thead-dark">
                                <tr>
                                    <th>ID</th>
                                    <th>Adresa Isporuke</th>
                                    <th>Datum kreiranja</th>
                                    <th>Vreme kreiranja</th>
                                    <th>Ukupna cena</th>
                                    <th>Status isporuke</th>
                                    <th>Status naplate</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {porudzbine.map((porudzbina, i) => {
                                    if (porudzbina.korisnik.korisnickoIme === getUsernameFromToken()) {
                                        return (
                                            <tr key={i}>
                                                <td>{porudzbina.porudzbinaId}</td>
                                                <td>{porudzbina.adresaIsporuke}</td>
                                                <td>{porudzbina.datumKreiranja}</td>
                                                <td>{porudzbina.vremeKreiranja}</td>
                                                <td>{porudzbina.ukupnaCena}</td>
                                                <td>{porudzbina.statusIsporuke ? "isporucena" : "nije isporucena"}</td>
                                                <td>{porudzbina.statusNaplate ? "naplacena" : "nije naplacena"}</td>
                                                <td>
                                                    {!porudzbina.statusIsporuke && <button onClick={() => btnOtkaziClicked(i)}>Otkazi</button>}
                                                    {!porudzbina.statusNaplate && <Stripe
                                                        stripeKey="pk_test_51L8tbSG6vmCqCwSKXHpKCEt907tMY0wP4Z27ggaZlPUVm4r7DLfFX8L256A2lK9ZRFO9hf0m4coN1W0VSRfOhnRC00ppZ81q19"
                                                        token={(e) => handleToken(e, porudzbina)}
                                                    />}
                                                </td>
                                            </tr>
                                        )
                                    }

                                })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="col-md-2"></div>

            </div>
        </>
    );

}
export default PorudzbineTable;