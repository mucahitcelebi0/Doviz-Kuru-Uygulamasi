import React, { useState } from "react";
import "../css/currency.css";
import { FaArrowCircleRight } from "react-icons/fa";
import axios from "axios";

let BASE_URL = "https://api.freecurrencyapi.com/v1/latest";
let API_KEY = "fca_live_li2l9yjifLftH9FW23TZnXXTLMmLBuS627cI0UXA";

function Currency() {
    const [amount, setAmount] = useState(0);
    const [fromCurrency, setFromCurrency] = useState("USD");
    const [toCurrency, setToCurrency] = useState("TRY");
    const [result, setResult] = useState(0);

    const exchange = async () => {
        try {

            const sanitizedFromCurrency = fromCurrency === "TL" ? "TRY" : fromCurrency;
            const sanitizedToCurrency = toCurrency === "TL" ? "TRY" : toCurrency;


            const response = await axios.get(
                `${BASE_URL}?apikey=${API_KEY}&base_currency=${sanitizedFromCurrency}`
            );


            if (response.data && response.data.data) {
                const rates = response.data.data;
                const rate = rates[sanitizedToCurrency];

                if (rate) {
                    setResult((amount * rate).toFixed(2));
                } else {
                    alert(`${toCurrency} için döviz kuru bulunamadı.`);
                }
            } else {
                console.error("API'den beklenen veri alınamadı.");
                alert("API'den döviz verisi alınamadı.");
            }
        } catch (error) {
            console.error("API çağrısı sırasında bir hata oluştu:", error);
            alert("Döviz bilgisi alınırken bir hata oluştu. Lütfen tekrar deneyin.");
        }
    };

    return (
        <div className="currency-div">
            <div
                style={{
                    fontFamily: "arial",
                    backgroundColor: "transparent",
                    color: "#fff",
                    width: "100%",
                    textAlign: "center",
                }}
            >
                <h3>Döviz Kuru Uygulaması</h3>
            </div>
            <div style={{ marginTop: "25px" }}>
                <input
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    type="number"
                    className="amount"
                    placeholder="Miktar"
                />
                <select
                    value={fromCurrency}
                    onChange={(e) => setFromCurrency(e.target.value)}
                    className="from-currency-option"
                >
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="TRY">TRY</option>
                </select>

                <FaArrowCircleRight style={{ fontSize: "25px", marginRight: "10px" }} />

                <select
                    value={toCurrency}
                    onChange={(e) => setToCurrency(e.target.value)}
                    className="to-currency-option"
                >
                    <option value="TRY">TRY</option>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                </select>
                <input
                    value={result}
                    readOnly
                    type="number"
                    className="result"
                    placeholder="Sonuç"
                />
            </div>
            <div>
                <button onClick={exchange} className="exchange-button">
                    Çevir
                </button>
            </div>
        </div>
    );
}

export default Currency;
