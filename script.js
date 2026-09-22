// قائمة المنتجات
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

// عرض المنتجات ديناميكياً
function renderizarProdutos(produtos) {
    const grid = document.getElementById('produtosGrid');
    grid.innerHTML = '';

    if (produtos.length === 0) {
        grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #666; font-size: 1rem; padding: 20px 0;">Nenhum produto encontrado com essa palavra.</p>';
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

// دالة البحث المباشر
function filtrarProdutos() {
    const termo = document.getElementById('searchInput').value.toLowerCase();
    const produtosFiltrados = listaProdutos.filter(produto => 
        produto.nome.toLowerCase().includes(termo)
    );
    renderizarProdutos(produtosFiltrados);
}

// إدارة السلة
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
                            <h4 style="font-size: 0.85rem;">${item.nome}</h4>
                            <p style="color: var(--primary-color); font-weight: bold; font-size: 0.85rem;">R$ ${item.preco.toFixed(2)}</p>
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

// إرسال الطلب عبر Web3Forms
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

// تشغيل المنتجات عند التحميل
document.addEventListener('DOMContentLoaded', () => {
    renderizarProdutos(listaProdutos);
});
