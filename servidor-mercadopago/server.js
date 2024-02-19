import express from "express";
import cors from "cors";
import { MercadoPagoConfig, Preference } from "mercadopago";
import axios from 'axios';

const client = new MercadoPagoConfig({ accessToken: "TEST-2857713684898535-021819-6c0a360cae0dcbcc925532af19b848df-290207644" });

const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Este el servidor de MercadoPago!");
});

app.post("/create-preference", async (req, res) => {
    try {
        const items = req.body.map(item => ({
            title: item.title,
            quantity: item.quantity,
            unit_price: item.price
        }));

        const body = {
            items,
            back_urls: {
                success: "https://www.mercadolibre.com.ar/",
                pending: "https://www.mercadolibre.com.ar/",
                failure: "https://www.mercadolibre.com.ar/",
            },
            auto_return: "approved"
        };

        console.log("Realizando solicitud a MercadoPago...");

        const preference = new Preference(client);
        const result = await preference.create({ body });

        console.log("Respuesta recibida de MercadoPago:", result);

        res.json({
            id: result.id
        });
    } catch (error) {
        console.error("Error al crear la preferencia:", error);
        res.status(500).json({
            error: "Error al crear la preferencia"
        });
    }
});

app.listen(port, () => {
    console.log(`El servidor está corriendo en el puerto ${port}`);
});
