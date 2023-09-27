import { Router } from "express"
import { dataSource } from "@medusajs/medusa/dist/loaders/database"

const getConstantShippingRate = async () => {
    // weight in grams, price in usd
    return [
        {
            weight: 250,
            amount: 2.50,
        },
        {
            weight: 500,
            amount: 5
        },
        {
            weight: 750,
            amount: 7.50
        },
        {
            weight: 1000,
            amount: 10
        },
        {
            weight: 1250,
            amount: 12.50
        },
        {
            weight: 1500,
            amount: 15
        },
        {
            weight: 1750,
            amount: 17.50
        },
        {
            weight: 2000,
            amount: 20
        },
        {
            weight: 2250,
            amount: 22.50
        },
        {
            weight: 2500,
            amount: 25
        },
        {
            weight: 2750,
            amount: 27.50
        },
        {
            weight: 3000,
            amount: 30
        },
        {
            weight: 3250,
            amount: 32.50
        },
        {
            weight: 3500,
            amount: 35
        },
        {
            weight: 3750,
            amount: 37.50
        },
        {
            weight: 4000,
            amount: 40
        },
        {
            weight: 4250,
            amount: 42.50
        },
        {
            weight: 4500,
            amount: 45
        },
        {
            weight: 4750,
            amount: 47.50
        },
        {
            weight: 5000,
            amount: 50
        },
    ]
}

export const getShippingRates = (rootDirectory, pluginOptions) => {
    const router = Router()

    router.get("/get-shipping-rates", async (req, res) => {
        res.header("Access-Control-Allow-Origin", "*");
        try {
            const constantShippingTable = await getConstantShippingRate()
            return res.status(200).json({
                status: "success",
                data: constantShippingTable
            })
        } catch (err) {
            return res.status(501).json({
                status: "fail"
            })
        }
    })
    return router
}