import { Router } from "express";
import { productManager } from "../dao/productManager.js";
import { ProductModel } from "../dao/models/products.model.js";

const router = Router();
const ProductService = new productManager();


// Obtener todos los productos
router.get('/', async (req, res) => {
    try {
        const query = req.query; // Obtiene los parámetros de consulta de la solicitud
        const response = await ProductService.getAllProducts(query);
        res.json({ status: "success", response }); // Envía la respuesta en formato JSON
    } catch (error) {
        res.status(500).send({
            message: error.message
        });
    }
});

// Obtener Productos por ID
router.get("/:pid", async (req, res) => {
    try {
        const id = req.params.pid;
        const product = await ProductService.getProductByID(id)
        res.status(200).json({ status: "success", payload: product });
    } catch (error) {
        res.status(400).send({
            status: 'error',
            message: error.message
        });
    }
});

// Agregar producto a mongos
router.post('/', async (req, res) => {
    try {
        const result = await ProductService.createProduct(req.body);
        res.send({
            status: 'success',
            payload: result
        });
    } catch (error) {
        res.status(400).send({
            status: 'error',
            message: "El producto ya existe"
        });
    }
});

// Actualizar producto por ID en mongos
router.put("/:pid", async (req, res) => {
    try {
        const pid = req.params.pid;
        const productUpdate = req.body;
        const product = await ProductService.updateProduct(pid, productUpdate);
        res.status(201).json({
            message: "Producto actualizado",
            payload: product
        });
    } catch (error) {
        res.status(400).send({
            status: 'error',
            message: "Error al actualizar el producto"
        });
    }
});

// Eliminar producto de mongos
router.delete("/:pid", async (req, res) => {
    try {
        const pid = req.params.pid;
        const product = await ProductService.deleteProduct(pid);
        res.status(201).json({
            message: "Producto eliminado correctamente"
        });
    } catch (error) {
        res.status(400).json({
            status: 'error',
            message: error.message
        });
    }
});

export default router; //export por default para que en otras partes de mi proyecto se pueda utilizar e importar