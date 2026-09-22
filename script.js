<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>EletroPro - Materiais e Ferramentas Elétricas</title>
    
    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap" rel="stylesheet">
    
    <!-- CSS File -->
    <link rel="stylesheet" href="style.css">
</head>
<body>

    <!-- Header -->
    <header>
        <a href="#inicio" class="logo">⚡ EletroPro</a>
        <nav>
            <ul>
                <li><a href="#inicio">Início</a></li>
                <li><a href="#produtos">Produtos</a></li>
                <li><a href="#sobre">Sobre Nós</a></li>
                <li><a href="#contato">Contato</a></li>
            </ul>
        </nav>
        <div class="cart-icon" onclick="toggleCart()">
            🛒 Carrinho (<span id="cart-count">0</span>)
        </div>
    </header>

    <!-- Hero Section -->
    <section id="inicio">
        <h1>Energia e Precisão para o Seu Projeto</h1>
        <p>Descubra a melhor seleção de ferramentas e materiais elétricos com qualidade profissional e preços imbatíveis.</p>
        <a href="#produtos" class="btn-primary">Ver Produtos</a>
    </section>

    <!-- Products Section -->
    <section id="produtos">
        <h2 class="section-title">Nossos Produtos</h2>
        
        <!-- Search Bar -->
        <div class="search-container">
            <input type="text" id="searchInput" oninput="filtrarProdutos()" placeholder="Buscar produto pelo nome...">
        </div>

        <div class="produtos-grid" id="produtosGrid">
            <!-- Products will be rendered dynamically by JavaScript -->
        </div>
    </section>

    <!-- About Section -->
    <section id="sobre">
        <h2 class="section-title">Sobre Nós</h2>
        <p>A <strong>EletroPro</strong> é líder no mercado de distribuição de materiais elétricos e ferramentas de alta performance. Com mais de 10 anos de experiência, nosso compromisso é oferecer produtos de qualidade internacional, garantindo a segurança e o sucesso de engenheiros, eletricistas e entusiastas do "faça você mesmo" em todo o Brasil.</p>
    </section>

    <!-- Contact Section -->
    <section id="contato">
        <h2 class="section-title">Fale Conosco</h2>
        <div class="contato-container">
            <div class="contato-info">
                <h3>Nossos Contatos</h3>
                <p>📍 <strong>Endereço:</strong> Av. Paulista, 1000 - São Paulo, SP</p>
                <p>📞 <strong>Telefone / WhatsApp:</strong> +55 (45) 99999-9999</p>
                <p>✉️ <strong>Email:</strong> contato@eletropro.com.br</p>
                <p>🕒 <strong>Horário:</strong> Seg - Sex: 08:00 às 18:00</p>
                
                <h3 style="margin-top: 20px;">Redes Sociais</h3>
                <p>Instagram: @eletropro_br</p>
                <p>Facebook: /EletroProOficial</p>
            </div>
            
            <div class="mapa">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.19757650849!2d-46.65866168502224!3d-23.56133748468249!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c8da0aa315%3A0xd59f9431f2c9776a!2sAv.%20Paulista%2C%20S%C3%A3o%20Paulo%20-%20SP!5e0!3m2!1spt-BR!2sbr!4v1619623838234!5m2!1spt-BR!2sbr" allowfullscreen="" loading="lazy"></iframe>
            </div>
        </div>
    </section>

    <!-- Cart Modal -->
    <div class="modal-overlay" id="cartModal">
        <div class="cart-modal">
            <span class="close-btn" onclick="toggleCart()">&times;</span>
            <h2 style="margin-bottom: 20px; color: var(--primary-color);">Seu Carrinho</h2>
            
            <div id="cart-items"></div>
            
            <div class="cart-total">
                <strong>Total: R$ <span id="total-price">0.00</span></strong>
            </div>
            
            <button class="btn-add" style="width: 100%; margin-top: 20px;" onclick="finalizarCompra()">Finalizar Compra</button>
        </div>
    </div>

    <!-- Checkout Modal -->
    <div class="modal-overlay" id="checkoutModal">
        <div class="cart-modal">
            <span class="close-btn" onclick="fecharEConcluir()">&times;</span>
            
            <div id="checkoutFormContent">
                <h2 style="margin-bottom: 20px; color: var(--primary-color);">Dados para Entrega</h2>
                
                <form id="checkoutForm" onsubmit="enviarPedido(event)">
                    <input type="hidden" name="access_key" value="48042b0a-9a1a-44d0-93c9-510edb95448c">
                    <input type="hidden" name="subject" value="Novo Pedido - EletroPro">
                    <input type="hidden" name="detalhes_do_pedido" id="pedidoInput">

                    <div style="margin-bottom: 15px; text-align: left;">
                        <label style="display: block; margin-bottom: 5px; font-weight: 600;">Nome Completo:</label>
                        <input type="text" name="nome" required style="width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 5px;">
                    </div>

                    <div style="margin-bottom: 15px; text-align: left;">
                        <label style="display: block; margin-bottom: 5px; font-weight: 600;">Telefone / WhatsApp:</label>
                        <input type="tel" name="telefone" required style="width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 5px;">
                    </div>

                    <div style="margin-bottom: 15px; text-align: left;">
                        <label style="display: block; margin-bottom: 5px; font-weight: 600;">Endereço de Entrega:</label>
                        <textarea name="endereco" required rows="3" style="width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 5px;"></textarea>
                    </div>

                    <button type="submit" class="btn-add" style="width: 100%; margin-top: 10px;" id="btnEnviar">Enviar Pedido</button>
                </form>
            </div>

            <div id="checkoutSuccess" style="display: none; text-align: center; padding: 20px 0;">
                <div style="font-size: 60px; color: #28a745; margin-bottom: 15px;">✓</div>
                <h2 style="color: #28a745; margin-bottom: 10px;">Pedido Enviado com Sucesso!</h2>
                <p style="color: #555; margin-bottom: 25px; line-height: 1.5;">Obrigado pelo seu pedido. Recebemos suas informações e entraremos em contato em breve!</p>
                <button class="btn-add" onclick="fecharEConcluir()" style="width: 100%;">Concluir</button>
            </div>

        </div>
    </div>

    <!-- Floating WhatsApp Button -->
    <a href="https://wa.me/5545999999999?text=Olá!%20Gostaria%20de%20tirar%20uma%20dúvida." target="_blank" class="whatsapp-float" title="Contato via WhatsApp">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M12.031 0c-6.627 0-12 5.373-12 12 0 2.159.57 4.186 1.564 5.95l-1.594 5.823 5.961-1.56c1.696.92 3.633 1.442 5.669 1.442 6.627 0 12-5.373 12-12s-5.373-12-12-12zm0 21.82c-1.782 0-3.486-.474-4.97-1.298l-.356-.197-3.692.966.984-3.593-.223-.355c-.933-1.488-1.425-3.218-1.425-5.013 0-5.187 4.223-9.41 9.41-9.41 5.187 0 9.41 4.223 9.41 9.41 0 5.188-4.223 9.41-9.41 9.41z"/>
        </svg>
    </a>

    <!-- JavaScript File -->
    <script src="script.js"></script>
</body>
</html>// Array to store product list
const listaProdutos = [
    {
        id: 1,
        nome: "Furadeira de Impacto Profissional",
        descricao: "Potência de 800W, ideal para perfurações em concreto e madeira.",
        preco: 349.90,
        imagem: "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=500&q=80",
        thumb: "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=50px&q=80"
    },
    {
        id: 2,
        nome: "Multímetro Digital Smart",
        descricao: "Medição precisa de tensão, corrente e resistência com visor LCD.",
        preco: 129.50,
        imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMPqSjRtS-kj1dFXfWJVogJXkvG-MUbJM7vg1FS3uBPw&s=10",
        thumb: "https://images.unsplash.com/photo-1580983584852-5207044001cb?auto=format&fit=crop&w=50px&q=80"
    },
    {
        id: 3,
        nome: "Parafusadeira a Bateria 20V",
        descricao: "Acompanha 2 baterias de lítio e maleta com acessórios.",
        preco: 499.00,
        imagem: "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?auto=format&fit=crop&w=500&q=80",
        thumb: "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?auto=format&fit=crop&w=50px&q=80"
    },
    {
        id: 4,
        nome: "Kit Alicates Isolados 1000V",
        descricao: "Segurança máxima para eletricistas. Contém 3 peças essenciais.",
        preco: 185.00,
        imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3X3N6_GOt-sVf0rKX-iI2-1GY3twTc-xuUmX9mRSzWw&s=10",
        thumb: "https://images.unsplash.com/photo-1581783342308-f792db80eb81?auto=format&fit=crop&w=50px&q=80"
    }
];

let carrinho = [];

// Display products dynamically
function renderizarProdutos(produtos) {
    const grid = document.getElementById('produtosGrid');
    grid.innerHTML = '';

    if (produtos.length === 0) {
        grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #666; font-size: 1.1rem;">Nenhum produto encontrado com essa palavra.</p>';
        return;
    }

    produtos.forEach(produto => {
        grid.innerHTML += `
            <div class="produto-card">
                <img src="${produto.imagem}" alt="${produto.nome}">
                <div class="produto-info">
                    <h3>${produto.nome}</h3>
                    <p>${produto.descricao}</p>
                    <span class="produto-preco">R$ ${produto.preco.toFixed(2)}</span>
                    <button class="btn-add" onclick="addToCart('${produto.nome}', ${produto.preco}, '${produto.thumb}')">Adicionar ao Carrinho</button>
                </div>
            </div>
        `;
    });
}

// Live search filter function
function filtrarProdutos() {
    const termo = document.getElementById('searchInput').value.toLowerCase();
    const produtosFiltrados = listaProdutos.filter(produto => 
        produto.nome.toLowerCase().includes(termo)
    );
    renderizarProdutos(produtosFiltrados);
}

// Cart functions
function toggleCart() {
    const modal = document.getElementById('cartModal');
    modal.classList.toggle('active');
}

function addToCart(nome, preco, imagem) {
    carrinho.push({ nome, preco, imagem });
    atualizarCarrinho();
}

function removeFromCart(index) {
    carrinho.splice(index, 1);
    atualizarCarrinho();
}

function atualizarCarrinho() {
    const cartItems = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const totalPrice = document.getElementById('total-price');
    
    cartCount.innerText = carrinho.length;
    cartItems.innerHTML = '';
    let total = 0;

    if (carrinho.length === 0) {
        cartItems.innerHTML = '<p style="text-align:center; color:#666;">Seu carrinho está vazio.</p>';
    } else {
        carrinho.forEach((item, index) => {
            total += item.preco;
            cartItems.innerHTML += `
                <div class="cart-item">
                    <div class="cart-item-info">
                        <img src="${item.imagem}" alt="${item.nome}">
                        <div>
                            <h4 style="font-size: 0.9rem;">${item.nome}</h4>
                            <p style="color: var(--primary-color); font-weight: bold;">R$ ${item.preco.toFixed(2)}</p>
                        </div>
                    </div>
                    <button class="btn-remove" onclick="removeFromCart(${index})">Remover</button>
                </div>
            `;
        });
    }

    totalPrice.innerText = total.toFixed(2);
}

function toggleCheckout() {
    const modal = document.getElementById('checkoutModal');
    modal.classList.toggle('active');
}

function finalizarCompra() {
    if (carrinho.length === 0) return;

    let detalhes = "PRODUTOS SOLICITADOS:\n";
    let total = 0;

    carrinho.forEach((item, i) => {
        detalhes += `${i + 1}. ${item.nome} - R$ ${item.preco.toFixed(2)}\n`;
        total += item.preco;
    });

    detalhes += `\nTOTAL DO PEDIDO: R$ ${total.toFixed(2)}`;
    document.getElementById('pedidoInput').value = detalhes;

    toggleCart();
    toggleCheckout();
}

// Send form using Web3Forms
async function enviarPedido(event) {
    event.preventDefault();

    const btn = document.getElementById('btnEnviar');
    btn.innerText = "Enviando...";
    btn.disabled = true;

    const form = document.getElementById('checkoutForm');
    
    const object = {
        access_key: form.access_key.value,
        subject: form.subject.value,
        nome: form.nome.value,
        telefone: form.telefone.value,
        endereco: form.endereco.value,
        detalhes_do_pedido: form.detalhes_do_pedido.value
    };
    
    const json = JSON.stringify(object);

    try {
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: json
        });

        const data = await response.json();

        if (data.success) {
            document.getElementById('checkoutFormContent').style.display = 'none';
            document.getElementById('checkoutSuccess').style.display = 'block';
            
            carrinho = [];
            atualizarCarrinho();
            form.reset();
        } else {
            alert("Erro ao enviar o pedido: " + (data.message || "Verifique sua Access Key."));
        }
    } catch (error) {
        alert("Erro de conexão. Verifique sua internet.");
    } finally {
        btn.innerText = "Enviar Pedido";
        btn.disabled = false;
    }
}

function fecharEConcluir() {
    document.getElementById('checkoutFormContent').style.display = 'block';
    document.getElementById('checkoutSuccess').style.display = 'none';
    
    const modal = document.getElementById('checkoutModal');
    modal.classList.remove('active');
}

// Render initial products on page load
document.addEventListener('DOMContentLoaded', () => {
    renderizarProdutos(listaProdutos);
});// مصفوفة تخزين منتجات السلة
let carrinho = [];

// فتح وإغلاق السلة
function toggleCart() {
    const modal = document.getElementById('cartModal');
    modal.classList.toggle('active');
}

// إضافة منتج للسلة
function addToCart(nome, preco, imagem) {
    carrinho.push({ nome, preco, imagem });
    atualizarCarrinho();
}

// إزالة منتج من السلة
function removeFromCart(index) {
    carrinho.splice(index, 1);
    atualizarCarrinho();
}

// تحديث واجهة السلة وحساب الإجمالي
function atualizarCarrinho() {
    const cartItems = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const totalPrice = document.getElementById('total-price');
    
    // تحديث عدد العناصر فوق السلة
    cartCount.innerText = carrinho.length;
    
    // تفريغ قائمة السلة لربط البيانات الجديدة
    cartItems.innerHTML = '';
    let total = 0;

    if (carrinho.length === 0) {
        cartItems.innerHTML = '<p style="text-align:center; color:#666;">Seu carrinho está vazio.</p>';
    } else {
        carrinho.forEach((item, index) => {
            total += item.preco;
            cartItems.innerHTML += `
                <div class="cart-item">
                    <div class="cart-item-info">
                        <img src="${item.imagem}" alt="${item.nome}">
                        <div>
                            <h4 style="font-size: 0.9rem;">${item.nome}</h4>
                            <p style="color: var(--primary-color); font-weight: bold;">R$ ${item.preco.toFixed(2)}</p>
                        </div>
                    </div>
                    <button class="btn-remove" onclick="removeFromCart(${index})">Remover</button>
                </div>
            `;
        });
    }

    // تحديث المجموع
    totalPrice.innerText = total.toFixed(2);
}

// فتح وإغلاق نافذة بيانات العميل
function toggleCheckout() {
    const modal = document.getElementById('checkoutModal');
    modal.classList.toggle('active');
}

// دالة إنهاء الشراء (تفتح نموذج البيانات)
function finalizarCompra() {
    if (carrinho.length === 0) {
        return; // إذا كانت السلة فارغة لا يفعل شيئاً
    }

    // تجهيز نص تفاصيل الطلب لإرساله مع الإيميل
    let detalhes = "PRODUTOS SOLICITADOS:\n";
    let total = 0;

    carrinho.forEach((item, i) => {
        detalhes += `${i + 1}. ${item.nome} - R$ ${item.preco.toFixed(2)}\n`;
        total += item.preco;
    });

    detalhes += `\nTOTAL DO PEDIDO: R$ ${total.toFixed(2)}`;

    // وضع تفاصيل المنتجات داخل حقل مخفي في النموذج
    document.getElementById('pedidoInput').value = detalhes;

    // إغلاق السلة وفتح نافذة بيانات العميل
    toggleCart();
    toggleCheckout();
}

// دالة إرسال الطلب وإظهار شاشة النجاح
async function enviarPedido(event) {
    event.preventDefault();

    const btn = document.getElementById('btnEnviar');
    btn.innerText = "Enviando...";
    btn.disabled = true;

    const form = document.getElementById('checkoutForm');
    
    // تحويل عناصر النموذج إلى JSON مضمون التسليم لـ Web3Forms
    const object = {
        access_key: form.access_key.value,
        subject: form.subject.value,
        nome: form.nome.value,
        telefone: form.telefone.value,
        endereco: form.endereco.value,
        detalhes_do_pedido: form.detalhes_do_pedido.value
    };
    
    const json = JSON.stringify(object);

    try {
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: json
        });

        const data = await response.json();

        if (data.success) {
            // إخفاء النموذج وإظهار واجهة النجاح داخل نفس النافذة
            document.getElementById('checkoutFormContent').style.display = 'none';
            document.getElementById('checkoutSuccess').style.display = 'block';
            
            carrinho = []; // تفريغ السلة
            atualizarCarrinho();
            form.reset();
        } else {
            alert("Erro ao enviar o pedido: " + (data.message || "48042b0a-9a1a-44d0-93c9-510edb95448c"));
        }
    } catch (error) {
        alert("Erro de conexão. Verifique sua internet.");
    } finally {
        btn.innerText = "Enviar Pedido";
        btn.disabled = false;
    }
}

// دالة إغلاق النافذة وإعادة تعيين الشكل للطلبات القادمة
function fecharEConcluir() {
    document.getElementById('checkoutFormContent').style.display = 'block';
    document.getElementById('checkoutSuccess').style.display = 'none';
    
    const modal = document.getElementById('checkoutModal');
    modal.classList.remove('active');
}// مصفوفة تخزين منتجات السلة
let carrinho = [];

// فتح وإغلاق السلة
function toggleCart() {
    const modal = document.getElementById('cartModal');
    modal.classList.toggle('active');
}

// إضافة منتج للسلة
function addToCart(nome, preco, imagem) {
    carrinho.push({ nome, preco, imagem });
    atualizarCarrinho();
    
}

// إزالة منتج من السلة
function removeFromCart(index) {
    carrinho.splice(index, 1);
    atualizarCarrinho();
}

// تحديث واجهة السلة وحساب الإجمالي
function atualizarCarrinho() {
    const cartItems = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const totalPrice = document.getElementById('total-price');
    
    // تحديث عدد العناصر فوق السلة
    cartCount.innerText = carrinho.length;
    
    // تفريغ قائمة السلة لربط البيانات الجديدة
    cartItems.innerHTML = '';
    let total = 0;

    if (carrinho.length === 0) {
        cartItems.innerHTML = '<p style="text-align:center; color:#666;">Seu carrinho está vazio.</p>';
    } else {
        carrinho.forEach((item, index) => {
            total += item.preco;
            cartItems.innerHTML += `
                <div class="cart-item">
                    <div class="cart-item-info">
                        <img src="${item.imagem}" alt="${item.nome}">
                        <div>
                            <h4 style="font-size: 0.9rem;">${item.nome}</h4>
                            <p style="color: var(--primary-color); font-weight: bold;">R$ ${item.preco.toFixed(2)}</p>
                        </div>
                    </div>
                    <button class="btn-remove" onclick="removeFromCart(${index})">Remover</button>
                </div>
            `;
        });
    }

    // تحديث المجموع
    totalPrice.innerText = total.toFixed(2);
}

// إنهاء عملية الشراء
// فتح وإغلاق نافذة بيانات العميل
function toggleCheckout() {
    const modal = document.getElementById('checkoutModal');
    modal.classList.toggle('active');
}

// دالة إنهاء الشراء (تفتح نموذج البيانات)
function finalizarCompra() {
    if (carrinho.length === 0) {
        return; // إذا كانت السلة فارغة لا يفعل شيئاً
    }

    // تجهيز نص تفاصيل الطلب لإرساله مع الإيميل
    let detalhes = "PRODUTOS SOLICITADOS:\n";
    let total = 0;

    carrinho.forEach((item, i) => {
        detalhes += `${i + 1}. ${item.nome} - R$ ${item.preco.toFixed(2)}\n`;
        total += item.preco;
    });

    detalhes += `\nTOTAL DO PEDIDO: R$ ${total.toFixed(2)}`;

    // وضع تفاصيل المنتجات داخل حقل مخفي في النموذج
    document.getElementById('pedidoInput').value = detalhes;

    // إغلاق السلة وفتح نافذة بيانات العميل
    toggleCart();
    toggleCheckout();
}

// دالة إرسال الطلب وإظهار شاشة النجاح المصممة
async function enviarPedido(event) {
    event.preventDefault();

    const btn = document.getElementById('btnEnviar');
    btn.innerText = "Enviando...";
    btn.disabled = true;

    const form = document.getElementById('checkoutForm');
    const formData = new FormData(form);

    try {
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        if (data.success) {
            // إخفاء النموذج وإظهار واجهة النجاح المميزة داخل نفس النافذة
            document.getElementById('checkoutFormContent').style.display = 'none';
            document.getElementById('checkoutSuccess').style.display = 'block';
            
            carrinho = []; // تفريغ السلة
            atualizarCarrinho();
            form.reset();
        } else {
            alert("Erro ao enviar o pedido. Verifique se a sua Chave (Access Key) foi ativada no Gmail.");
        }
    } catch (error) {
        alert("Erro de conexão. Verifique sua internet.");
    } finally {
        btn.innerText = "Enviar Pedido";
        btn.disabled = false;
    }
}

// دالة إغلاق النافذة وإعادة تعيين الشكل للطلبات القادمة
function fecharEConcluir() {
    document.getElementById('checkoutFormContent').style.display = 'block';
    document.getElementById('checkoutSuccess').style.display = 'none';
    
    const modal = document.getElementById('checkoutModal');
    modal.classList.remove('active');
}
