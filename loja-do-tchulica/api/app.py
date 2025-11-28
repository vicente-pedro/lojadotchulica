from flask import Flask, jsonify, request
from flask_cors import CORS
import json
import os

app = Flask(__name__)
CORS(app)

# Dados dos produtos
products = [
    {
        "id": 1,
        "name": "iPhone 16",
        "category": "smartphone",
        "brand": "iPhone",
        "price": 7799.0,
        "image": "https://cdsassets.apple.com/live/7WUAS350/images/tech-specs/iphone-16.png",
        "description": "iPhone 16 com 128GB, chip A18, câmera de 48MP e tela Super Retina XDR de 6.1\"",
        "stock": 20,
        "colors": ["Preto", "Branco", "Rosa", "Verde", "Ultramarine"]
    },
    {
        "id": 2,
        "name": "iPhone 16e",
        "category": "smartphone",
        "brand": "iPhone",
        "price": 5799.0,
        "image": "https://fastshopbr.vtexassets.com/arquivos/ids/2125697/4_4_67dcb5bd2954dd4c582455bc.jpg?v=638920920658400000",
        "description": "iPhone 16e com 128GB, chip A18, câmera de 48MP e design elegante",
        "stock": 25,
        "colors": ["Branco", "Preto"]
    },
    {
        "id": 3,
        "name": "iPhone 16 Pro",
        "category": "smartphone",
        "brand": "iPhone",
        "price": 10499.0,
        "image": "https://images.tcdn.com.br/img/img_prod/616573/apple_iphone_16_pro_6_3_esim_1228_1_e00152fd87b553278a51b66b9c780942.jpg",
        "description": "iPhone 16 Pro com 256GB, chip A18 Pro, câmera de 48MP Pro e tela Super Retina XDR de 6.3\"",
        "stock": 15,
        "colors": ["Black Titanium", "Natural Titanium", "White Titanium", "Desert Titanium"]
    },
    {
        "id": 4,
        "name": "iPhone 16 Pro Max",
        "category": "smartphone",
        "brand": "iPhone",
        "price": 15499.0,
        "image": "https://cdn.mos.cms.futurecdn.net/BUjnMt43qGRgpsaBo2nvcC-1200-80.jpg",
        "description": "iPhone 16 Pro Max com 256GB, chip A18 Pro, câmera de 48MP Pro e tela Super Retina XDR de 6.9\"",
        "stock": 10,
        "colors": ["Black Titanium", "Natural Titanium", "White Titanium", "Desert Titanium"]
    },
    {
        "id": 5,
        "name": "iPhone 17",
        "category": "smartphone",
        "brand": "iPhone",
        "price": 7999.0,
        "image": "https://www.losdistribuidores.com/wp-content/uploads/2025/09/apple-iphone-17-colores.webp",
        "description": "iPhone 17 com 128GB, chip A19, câmera avançada e design inovador",
        "stock": 18,
        "colors": ["Preto", "Branco", "Azul", "Sálvia", "Lavanda"]
    },
    {
        "id": 6,
        "name": "iPhone 17 Pro",
        "category": "smartphone",
        "brand": "iPhone",
        "price": 11499.0,
        "image": "https://www.att.com/scmsassets/global/devices/phones/apple/apple-iphone-17-pro/carousel/silver-6.png",
        "description": "iPhone 17 Pro com 256GB, chip A19 Pro, câmera profissional e tela OLED de 6.3\"",
        "stock": 12,
        "colors": ["Azul", "Laranja", "Prata"]
    },
    {
        "id": 7,
        "name": "iPhone 17 Pro Max",
        "category": "smartphone",
        "brand": "iPhone",
        "price": 12499.0,
        "image": "https://images.kabum.com.br/produtos/fotos/magalu/928978/xlarge/Apple-iPhone-17-Pro-Max-2TB-Azul-intenso-6-9-48MP-iOS-5G_1758028436.jpg",
        "description": "iPhone 17 Pro Max com 512GB, chip A19 Pro, câmera de 48MP e tela OLED de 6.9\"",
        "stock": 8,
        "colors": ["Azul", "Laranja", "Prata"]
    },
    {
        "id": 8,
        "name": "Samsung Galaxy S24",
        "category": "smartphone",
        "brand": "Samsung",
        "price": 3999.0,
        "image": "https://images.samsung.com/is/image/samsung/p6pim/br/sm-s911bliwvxz/gallery/br-galaxy-s24-sm-s911-sm-s911bliwvxz-533505760?$1300_1038_PNG$",
        "description": "Samsung Galaxy S24 com 128GB, processador Snapdragon 8 Gen 3 e câmera de 50MP",
        "stock": 22,
        "colors": ["Onyx", "Marble Gray", "Cobalt Violet"]
    },
    {
        "id": 9,
        "name": "Samsung Galaxy S24 Ultra",
        "category": "smartphone",
        "brand": "Samsung",
        "price": 7499.0,
        "image": "https://images.samsung.com/is/image/samsung/p6pim/br/sm-x920bzidxzz/gallery/br-galaxy-tab-s10-sm-x920-sm-x920bzidxzz-539400627?$1300_1038_PNG$",
        "description": "Samsung Galaxy S24 Ultra com 256GB, processador Snapdragon 8 Gen 3 e câmera de 200MP",
        "stock": 16,
        "colors": ["Titanium Black", "Titanium Gray", "Titanium Violet", "Titanium Orange", "Titanium Yellow"]
    },
    {
        "id": 10,
        "name": "Google Pixel 9",
        "category": "smartphone",
        "brand": "Google",
        "price": 4599.0,
        "image": "https://lh3.googleusercontent.com/keep-it-simple/image.jpg",
        "description": "Google Pixel 9 com 128GB, chip Tensor G4 e câmera com IA avançada",
        "stock": 19,
        "colors": ["Obsidian", "Porcelain", "Peony"]
    },
    {
        "id": 11,
        "name": "Google Pixel 9 Pro",
        "category": "smartphone",
        "brand": "Google",
        "price": 7199.0,
        "image": "https://lh3.googleusercontent.com/keep-it-simple/image2.jpg",
        "description": "Google Pixel 9 Pro com 256GB, chip Tensor G4 Pro e câmera profissional",
        "stock": 14,
        "colors": ["Obsidian", "Porcelain", "Hazel"]
    },
    {
        "id": 12,
        "name": "AirPods Pro",
        "category": "accessories",
        "brand": "Apple",
        "price": 1899.0,
        "image": "https://www.apple.com/newsroom/images/product/audio/standard/Apple_AirPods-Pro_Hero_110622.jpg.large.jpg",
        "description": "AirPods Pro com cancelamento de ruído ativo e modo transparência",
        "stock": 45,
        "colors": ["Branco"]
    },
    {
        "id": 13,
        "name": "Apple Watch Series 10",
        "category": "accessories",
        "brand": "Apple",
        "price": 3299.0,
        "image": "https://www.apple.com/newsroom/images/product/watch/standard/Apple_announces_apple-watch-series10_hero_09_16_24.jpg.large.jpg",
        "description": "Apple Watch Series 10 com tela Always-On LTPO OLED e bateria de 18 horas",
        "stock": 32,
        "colors": ["Jet Black", "Polished Silver", "Gold", "Rose Gold"]
    },
    {
        "id": 14,
        "name": "Samsung Galaxy Buds3",
        "category": "accessories",
        "brand": "Samsung",
        "price": 1199.0,
        "image": "https://images.samsung.com/is/image/samsung/p6pim/br/sm-r625nzwabtu/gallery/br-galaxy-buds3-sm-r625-sm-r625nzwabtu-537393424?$1300_1038_PNG$",
        "description": "Samsung Galaxy Buds3 com cancelamento de ruído e 6 horas de bateria",
        "stock": 38,
        "colors": ["Phantom Black", "Silver", "White"]
    },
    {
        "id": 15,
        "name": "Carregador Rápido USB-C 65W",
        "category": "accessories",
        "brand": "Genérico",
        "price": 149.0,
        "image": "https://images-na.ssl-images-amazon.com/images/I/61pPoOvEHoL.jpg",
        "description": "Carregador rápido USB-C 65W compatível com iPhone, Samsung e outros dispositivos",
        "stock": 120,
        "colors": ["Preto", "Branco"]
    },
    {
        "id": 16,
        "name": "Capinha de Silicone para iPhone 16",
        "category": "accessories",
        "brand": "Genérico",
        "price": 79.0,
        "image": "https://store.apple.com/xr/product/MTTE3ZM/A/silicone-case-with-magsafe-iphone-16-pro-max-black",
        "description": "Capinha de silicone com proteção MagSafe para iPhone 16",
        "stock": 200,
        "colors": ["Preto", "Branco", "Azul", "Vermelho"]
    },
    {
        "id": 17,
        "name": "Película Protetora de Vidro Temperado",
        "category": "accessories",
        "brand": "Genérico",
        "price": 49.0,
        "image": "https://images-na.ssl-images-amazon.com/images/I/61W3UOeqhpL.jpg",
        "description": "Película de vidro temperado com alta resistência e clareza cristalina",
        "stock": 300,
        "colors": ["Transparente"]
    }
]

# ==================== ROTAS ====================

@app.route('/api/products', methods=['GET'])
def get_products():
    """Retorna lista de todos os produtos"""
    category = request.args.get('category')
    brand = request.args.get('brand')
    
    result = products
    
    if category:
        result = [p for p in result if p['category'] == category]
    if brand:
        result = [p for p in result if p['brand'] == brand]
    
    return jsonify(result), 200

@app.route('/api/products/<int:product_id>', methods=['GET'])
def get_product(product_id):
    """Retorna um produto específico pelo ID"""
    product = next((p for p in products if p['id'] == product_id), None)
    if not product:
        return jsonify({"error": "Produto não encontrado"}), 404
    return jsonify(product), 200

@app.route('/api/products', methods=['POST'])
def create_product():
    """Cria um novo produto (requer dados válidos)"""
    data = request.get_json()
    
    # Validação básica
    required_fields = ['name', 'category', 'brand', 'price', 'stock']
    if not all(field in data for field in required_fields):
        return jsonify({"error": "Campos obrigatórios faltando"}), 400
    
    # Gera novo ID
    new_id = max([p['id'] for p in products]) + 1 if products else 1
    
    new_product = {
        "id": new_id,
        "name": data['name'],
        "category": data['category'],
        "brand": data['brand'],
        "price": data['price'],
        "image": data.get('image', ''),
        "description": data.get('description', ''),
        "stock": data['stock'],
        "colors": data.get('colors', [])
    }
    
    products.append(new_product)
    return jsonify(new_product), 201

@app.route('/api/products/<int:product_id>', methods=['PUT'])
def update_product(product_id):
    """Atualiza um produto existente"""
    product = next((p for p in products if p['id'] == product_id), None)
    if not product:
        return jsonify({"error": "Produto não encontrado"}), 404
    
    data = request.get_json()
    
    # Atualiza campos permitidos
    allowed_fields = ['name', 'category', 'brand', 'price', 'image', 'description', 'stock', 'colors']
    for field in allowed_fields:
        if field in data:
            product[field] = data[field]
    
    return jsonify(product), 200

@app.route('/api/products/<int:product_id>', methods=['DELETE'])
def delete_product(product_id):
    """Deleta um produto"""
    global products
    product = next((p for p in products if p['id'] == product_id), None)
    if not product:
        return jsonify({"error": "Produto não encontrado"}), 404
    
    products = [p for p in products if p['id'] != product_id]
    return jsonify({"message": "Produto deletado com sucesso"}), 200

@app.route('/api/categories', methods=['GET'])
def get_categories():
    """Retorna lista de categorias disponíveis"""
    categories = list(set(p['category'] for p in products))
    return jsonify(categories), 200

@app.route('/api/brands', methods=['GET'])
def get_brands():
    """Retorna lista de marcas disponíveis"""
    brands = list(set(p['brand'] for p in products))
    return jsonify(brands), 200

@app.route('/health', methods=['GET'])
def health():
    """Health check da API"""
    return jsonify({"status": "API rodando com sucesso"}), 200

# ==================== ERRO 404 ====================

@app.errorhandler(404)
def not_found(error):
    return jsonify({"error": "Rota não encontrada"}), 404

# ==================== MAIN ====================

if __name__ == '__main__':
    print("🚀 API iniciada em http://localhost:5000")
    print("📚 Documentação dos endpoints:")
    print("  GET  /api/products              - Lista todos os produtos")
    print("  GET  /api/products/<id>         - Detalhes de um produto")
    print("  POST /api/products              - Criar novo produto")
    print("  PUT  /api/products/<id>         - Atualizar produto")
    print("  DELETE /api/products/<id>       - Deletar produto")
    print("  GET  /api/categories            - Lista de categorias")
    print("  GET  /api/brands                - Lista de marcas")
    print("  GET  /health                    - Health check")
    app.run(debug=True, host='0.0.0.0', port=5000)
