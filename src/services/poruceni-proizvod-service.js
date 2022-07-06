import axios from "axios";
import { getToken } from "./token-service";

const URL = "http://localhost:8083/poruceniProizvod";
export function postPoruceniProizvod(poruceniProizvodId, kolicina, porudzbina, proizvod) {
    axios.defaults.headers.common["Authorization"] = "Bearer " + getToken();
    // console.log(poruceniProizvodId, kolicina, proizvod.proizvodId)
    axios.post(URL, {
        poruceniProizvodId: poruceniProizvodId,
        kolicina: kolicina,
        porudzbina: porudzbina,
        proizvod: {
            proizvodId: proizvod.proizvodId,
            cena: proizvod.cena,
            jedinica: proizvod.jedinica,
            naStanju: proizvod.naStanju,
            nazivProizvoda: proizvod.nazivProizvoda,
            kategorija: {
                kategorijaId: proizvod.kategorija.kategorijaId,
                nazivKategorija: proizvod.kategorija.nazivKategorija
            },
            proizvodjac: {
                proizvodjacId: proizvod.proizvodjac.proizvodjacId,
                nazivProizvodjaca: proizvod.proizvodjac.nazivProizvodjaca
            },
            vrsta: {
                vrstaId: proizvod.vrsta.vrstaId,
                nazivVrste: proizvod.vrsta.nazivVrste
            }
        }
    }).then((resp) => {
        console.log(resp)
    })
}
