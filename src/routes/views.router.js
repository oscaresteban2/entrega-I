import express from "express";
import { ProductModel } from "../dao/models/products.model.js";
import { productManager } from "../dao/productManager.js";
import { cartManager } from "../dao/cartManager.js";

const viewsRouter = express.Router();
const ProductService = new productManager();
const CartService = new cartManager(ProductService);

viewsRouter.get("/products", async (req, res) => {
    try {
        const productos = await ProductModel.find();
        res.render("home", { productos, css: 'style' });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

viewsRouter.get('/products/:pid', async (req, res) => {
    const { pid } = req.params;
    try {
        // Buscar el producto por su ID
        const product = await ProductModel.findById(pid);

        // Verificar si el producto no fue encontrado
        if (!product) {
            return res.status(404).render('home', {
                error: 'Producto no encontrado'
            });
        }

        // Renderizar los detalles del producto
        res.render('infoproduct', {
            product: {
                _id: product._id,
                titulo: product.title,
                description: product.description,
                imagen: product.thumbnails,
                precio: product.price,
                stock: product.stock,
                categoria: product.category
            },
            css: 'infoprod'
        });
    } catch (error) {
        console.error("Error al obtener el producto:", error);
        res.status(500).render('home', {
            error: 'Error interno del servidor'
        });
    }
});

viewsRouter.get("/realtimeproducts", async (req, res) => {
    try {
        const productos = await ProductModel.find();
        res.render("realTimeProducts", { productos });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

viewsRouter.get('/cart/:cid', async (req, res) => {
    const response = await CartService.getProductsFromCartByID(req.params.cid);

    if (response.status === 'error') {
        return res.render(
            'notFound',
            {
                title: 'Not Found',
                style: 'style.css'
            }
        );
    }

    res.render(
        'cart',
        {
            title: 'Carrito',
            style: 'carts.css',
            products: JSON.parse(JSON.stringify(response.products))
        }
    )
});

// rutas para el sistema de login 

viewsRouter.get('/', async (req, res) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }
})

viewsRouter.get('/register', async (req, res) => {
  res.render('register')
})

viewsRouter.get('/login', async (req, res) => {
  res.render('login')  
})

export default viewsRouter;