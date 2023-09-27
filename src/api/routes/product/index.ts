import { Router } from "express"
import ProductRepository from "@medusajs/medusa/dist/repositories/product"
import * as fs from 'fs';
import MeiliSearch from "meilisearch";

export const saveProductJson = (rootDirectory, pluginOptions) => {
    const router = Router()
    router.get("/save-product-json", async (req, res) => {
        res.header("Access-Control-Allow-Origin", "*");
        const products = await ProductRepository.query(
            `
            SELECT * FROM public.product where deleted_at is null;
        `
        );
        const jsonString = JSON.stringify(products, null, 2);
        const filePath = 'products.json'
        try {
            fs.writeFile(filePath, jsonString, 'utf-8', (err) => {
                if (err) {
                    console.error('Error writing JSON data to file:', err);
                } else {
                    console.log('JSON data has been written to', filePath);
                }
            });
            return res.status(200).json({
                status: "success"
            })
        } catch (err) {
            return res.status(501).json({
                status: "fail"
            })
        }
    })

    router.get("/update-search", async (req, res) => {
        res.header("Access-Control-Allow-Origin", "*");

        try {
            const filePath = 'products.json'
            fs.readFile(filePath, 'utf-8', async (err, data) => {
                if (err) {
                    console.error('Error reading JSON data from file:', err);
                    return res.status(501).json({
                        status: "fail"
                    })
                } else {
                    try {
                        const jsonData = JSON.parse(data);
                        const client = new MeiliSearch({
                            host: 'http://localhost:7700',
                            apiKey: process.env.MEILISEARCH_API_KEY,
                        })
                        const response = await client.index('products').addDocuments(jsonData)
                        if (response)
                            return res.status(200).json({
                                status: "success",
                                data: response
                            })

                    } catch (parseError) {
                        console.error('Error parsing JSON data:', parseError);
                    }
                }
            });
        } catch (err) {
            return res.status(501).json({
                status: "fail"
            })
        }
    })
    return router
}

