// إعداد الاتصال بقاعدة بيانات Supabase
const SUPABASE_URL = 'https://qjtqbtxagdzfyaixnfso.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFqdHFidHhhZ2R6ZnlhaXhuZnNvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTAyNzg1ODksImV4cCI6MjEwNTg1NDU4OX0.H2CDch43Bj6F3FKVPjLuAjXeFBEzRUDEt3fkYCEiJTc';

const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// مصفوفات لتخزين المنتجات والسلة
let listaProdutos = [];
let carrinho = [];

// جلب المنتجات من قاعدة البيانات عند تحميل الصفحة (تحديث اسم الجدول لـ produtors)
async function carregarProdutos() {
    const { data: produtors, error } = await _supabase
        .from('produtors')
        .select('*')
        .order('id', { ascending: true });

    if (error) {
        console.error("Erro ao buscar produtors:", error.message);
        return;
    }

    // حفظ المنتجات في المصفوفة الأساسية لضمان عمل الفلترة والبحث
    listaProdutos = produtors.map(p => ({
        ...p,
        preco: Number(p.preco) // ضمان تحويل السعر لرقم
    }));

    renderizarProdutos(listaProdutos);
}

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
function renderizarProdutos(produtors) {
    const grid = document.getElementById('produtosGrid');
    grid.innerHTML = '';

    if (produtors.length === 0) {
        grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #666; font-size: 1.1rem;">Nenhum produto encontrado.</p>';
        return;
    }

    produtors.forEach(produto => {
        grid.innerHTML += `
            <div class="produto-card">
                <img src="${produto.imagem}" alt="${produto.nome}" onclick="abrirModalProduto(${produto.id})" style="cursor: pointer;" onerror="this.src='https://via.placeholder.com/300'">
                <div class="produto-info">
                    <h3 onclick="abrirModalProduto(${produto.id})" style="cursor: pointer; color: var(--primary-color);">${produto.nome}</h3>
                    <p>${produto.descricao || ''}</p>
                    <span class="produto-preco">R$ ${produto.preco.toFixed(2)}</span>
                    <button class="btn-add" onclick="event.stopPropagation(); addToCart('${produto.nome}', ${produto.preco}, '${produto.thumb || produto.imagem}')">Adicionar ao Carrinho</button>
                </div>
            </div>
        `;
    });
}

// فتح نافذة تفاصيل المنتج وصورته المكبرة (تم تصحيح اسم المصفوفة إلى listaProdutos)
function abrirModalProduto(id) {
    const produto = listaProdutos.find(p => p.id === id);
    if (!produto) return;

    const content = document.getElementById('productDetailContent');
    content.innerHTML = `
        <div style="text-align: center;">
            <img src="${produto.imagem}" alt="${produto.nome}" style="width: 100%; max-height: 350px; object-fit: cover; border-radius: 10px; margin-bottom: 15px; box-shadow: 0 4px 10px rgba(0,0,0,0.15);" onerror="this.src='https://via.placeholder.com/300'">
            <h2 style="color: var(--primary-color); margin-bottom: 10px; font-size: 1.4rem;">${produto.nome}</h2>
            <p style="color: #555; line-height: 1.6; margin-bottom: 20px; font-size: 0.95rem; text-align: left;">${produto.descricao || ''}</p>
            <div style="font-size: 1.5rem; font-weight: bold; color: var(--primary-color); margin-bottom: 20px;">
                R$ ${produto.preco.toFixed(2)}
            </div>
            <button class="btn-add" style="width: 100%; padding: 12px; font-size: 1.05rem;" onclick="addToCart('${produto.nome}', ${produto.preco}, '${produto.thumb || produto.imagem}'); fecharModalProduto();">
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
                        <img src="${item.imagem}" alt="${item.nome}" onerror="this.src='https://via.placeholder.com/50'">
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

// تحميل المنتجات عند تشغيل الصفحة (تم تصحيح اسم الدالة إلى carregarProdutos)
document.addEventListener('DOMContentLoaded', () => {
    carregarProdutos();
});
