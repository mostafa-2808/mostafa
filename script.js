// Array to store product list
const listaProdutos = [
    {
        id: 1,
        nome: "Furadeira de Impacto Profissional",
        descricao: "Potência de 800W, ideal para perfurações em concreto e madeira. Alta durabilidade e controle de velocidade variável.",
        preco: 349.90,
        imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBWtgdMChdqqEfhT327hbISMimyV9yXjtXX7NxO-gXuw&s=10",
        thumb: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBWtgdMChdqqEfhT327hbISMimyV9yXjtXX7NxO-gXuw&s=10"
    },
    {
        id: 2,
        nome: "Multímetro Digital Smart",
        descricao: "Medição precisa de tensão, corrente e resistência com visor LCD retroiluminado e seleção automática de escala.",
        preco: 129.50,
        imagem: "https://images.unsplash.com/photo-1588524451241-11d73919e13a?auto=format&fit=crop&w=800&q=80",
        thumb: "https://images.unsplash.com/photo-1588524451241-11d73919e13a?auto=format&fit=crop&w=50px&q=80"
    },
    {
        id: 3,
        nome: "Parafusadeira a Bateria 20V",
        descricao: "Acompanha 2 baterias de lítio e maleta com acessórios. Torque ajustável com 18 níveis.",
        preco: 499.00,
        imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQt5Szh7qVjvSRpUIZPi4ZK0i6hxj1dnLCNOgOb2mdskg&s=10",
        thumb: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQt5Szh7qVjvSRpUIZPi4ZK0i6hxj1dnLCNOgOb2mdskg&s=10"
    },
    {
        id: 4,
        nome: "Kit Alicates Isolados 1000V",
        descricao: "Segurança máxima para eletricistas. Contém 3 peças essenciais com cabo emborrachado e certificado VDE.",
        preco: 185.00,
        imagem: "https://images.unsplash.com/photo-1581783342308-f792db80eb81?auto=format&fit=crop&w=800&q=80",
        thumb: "https://images.unsplash.com/photo-1581783342308-f792db80eb81?auto=format&fit=crop&w=50px&q=80"
    },
    {
        id: 5,
        nome: "Esmerilhadeira Angular 850W",
        descricao: "Ideal para cortes, desbastes e polimentos em metais e alvenaria. Design compacto e ergonômico.",
        preco: 259.90,
        imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQujUJsgyLBufidBG65HD--8IHjj6H5Q5sdq_Z2gPT7XA&s=10",
        thumb: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQujUJsgyLBufidBG65HD--8IHjj6H5Q5sdq_Z2gPT7XA&s=10"
    },
    {
        id: 6,
        nome: "Soprador Térmico Profissional",
        descricao: "Temperatura ajustável de 50°C a 600°C. Acompanha 4 bicos variados para moldar e remover tintas.",
        preco: 145.00,
        imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQc2e37v3o4QsXcXzqZmFQKatvgCxTlJhjaKf0cOZ1_vQ&s=10",
        thumb: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQc2e37v3o4QsXcXzqZmFQKatvgCxTlJhjaKf0cOZ1_vQ&s=10"
    },
    {
        id: 7,
        nome: "Trena a Laser 50 Metros",
        descricao: "Medição rápida e precisa com cálculo automático de área e volume. Memória para últimas 20 medições.",
        preco: 189.90,
        imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNdN5IyUeDOGEXWne6FA1fn8p6E2OZuaicW_z9JVCm1A&s=10",
        thumb: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNdN5IyUeDOGEXWne6FA1fn8p6E2OZuaicW_z9JVCm1A&s=10"
    },
    {
        id: 8,
        nome: "Jogo de Chaves de Fenda Isoladas",
        descricao: "Kit com 6 peças isoladas para 1000V. Ponta magnética e cabo ergonômico antiderrapante.",
        preco: 75.50,
        imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPzm-0FeNqvqY-nzDIv7YASA9SfW1kwBbw7SULiT5a1w&s=10",
        thumb: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPzm-0FeNqvqY-nzDIv7YASA9SfW1kwBbw7SULiT5a1w&s=10"
    },
];

let carrinho = [];

// إشعار الإضافة للسلة
function mostrarNotificacao() {
    const toast = document.createElement('div');
    toast.innerText = '✅ Produto adicionado ao carrinho!';
    toast.style.cssText = 'position: fixed; bottom: 20px; left: 50%; transform: translateX(-50%); background-color: #4CAF50; color: white; padding: 12px 24px; border-radius: 8px; box-shadow: 0 4px 10px rgba(0,0,0,0.3); font-size: 16px; font-weight: bold; z-index: 9999; transition: opacity 0.5s ease; opacity: 1;';
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 500);
    }, 2500);
}

// عرض المنتجات مع خاصية الضغط لفتح صفحة/نافذة التفاصيل
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
                <img src="${produto.imagem}" alt="${produto.nome}" onclick="abrirModalProduto(${produto.id})" style="cursor: pointer;">
                <div class="produto-info">
                    <h3 onclick="abrirModalProduto(${produto.id})" style="cursor: pointer; color: var(--primary-color);">${produto.nome}</h3>
                    <p>${produto.descricao}</p>
                    <span class="produto-preco">R$ ${produto.preco.toFixed(2)}</span>
                    <button class="btn-add" onclick="event.stopPropagation(); addToCart('${produto.nome}', ${produto.preco}, '${produto.thumb}')">Adicionar ao Carrinho</button>
                </div>
            </div>
        `;
    });
}

// فتح نافذة تفاصيل المنتج وصورته المكبرة
function abrirModalProduto(id) {
    const produto = listaProdutos.find(p => p.id === id);
    if (!produto) return;

    const content = document.getElementById('productDetailContent');
    content.innerHTML = `
        <div style="text-align: center;">
            <img src="${produto.imagem}" alt="${produto.nome}" style="width: 100%; max-height: 350px; object-fit: cover; border-radius: 10px; margin-bottom: 15px; box-shadow: 0 4px 10px rgba(0,0,0,0.15);">
            <h2 style="color: var(--primary-color); margin-bottom: 10px; font-size: 1.4rem;">${produto.nome}</h2>
            <p style="color: #555; line-height: 1.6; margin-bottom: 20px; font-size: 0.95rem; text-align: left;">${produto.descricao}</p>
            <div style="font-size: 1.5rem; font-weight: bold; color: var(--primary-color); margin-bottom: 20px;">
                R$ ${produto.preco.toFixed(2)}
            </div>
            <button class="btn-add" style="width: 100%; padding: 12px; font-size: 1.05rem;" onclick="addToCart('${produto.nome}', ${produto.preco}, '${produto.thumb}'); fecharModalProduto();">
                🛒 Adicionar ao Carrinho
            </button>
        </div>
    `;

    document.getElementById('productModal').classList.add('active');
}

// إغلاق نافذة التفاصيل
function fecharModalProduto() {
    document.getElementById('productModal').classList.remove('active');
}

function filtrarProdutos() {
    const termo = document.getElementById('searchInput').value.toLowerCase();
    const produtosFiltrados = listaProdutos.filter(produto => 
        produto.nome.toLowerCase().includes(termo)
    );
    renderizarProdutos(produtosFiltrados);
}

function toggleCart() {
    const modal = document.getElementById('cartModal');
    modal.classList.toggle('active');
}

function addToCart(nome, preco, imagem) {
    carrinho.push({ nome, preco, imagem });
    atualizarCarrinho();
    mostrarNotificacao();
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

function enviarPedido(event) {
    event.preventDefault();

    const form = document.getElementById('checkoutForm');
    const nome = form.nome.value;
    const telefone = form.telefone.value;
    const endereco = form.endereco.value;
    const detalhes = document.getElementById('pedidoInput').value;

    let mensagem = `🛒 *Novo Pedido - EletroPro*\n\n`;
    mensagem += `👤 *Nome:* ${nome}\n`;
    mensagem += `📞 *Telefone:* ${telefone}\n`;
    mensagem += `📍 *Endereço:* ${endereco}\n\n`;
    mensagem += detalhes;

    const numeroWhatsApp = "5545991317806"; 

    const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;
    window.open(url, '_blank');

    document.getElementById('checkoutFormContent').style.display = 'none';
    document.getElementById('checkoutSuccess').style.display = 'block';
    
    carrinho = [];
    atualizarCarrinho();
    form.reset();
}

function fecharEConcluir() {
    document.getElementById('checkoutFormContent').style.display = 'block';
    document.getElementById('checkoutSuccess').style.display = 'none';
    
    const modal = document.getElementById('checkoutModal');
    modal.classList.remove('active');
}

document.addEventListener('DOMContentLoaded', () => {
    renderizarProdutos(listaProdutos);
});
