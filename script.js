// Array to store product list
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
    },
    // --- المنتجات الـ 5 الجديدة ---
    {
        id: 5,
        nome: "Esmerilhadeira Angular 850W",
        descricao: "Ideal para cortes, desbastes e polimentos em metais e alvenaria.",
        preco: 259.90,
        imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7G4Yx_gcFgQm-41zOAgA62IpQmMt7aKox_vDuARh-bQ&s=10",
        thumb: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7G4Yx_gcFgQm-41zOAgA62IpQmMt7aKox_vDuARh-bQ&s=10"
    },
    {
        id: 6,
        nome: "Soprador Térmico Profissional",
        descricao: "Temperatura ajustável de 50°C a 600°C. Acompanha 4 bicos variados.",
        preco: 145.00,
        imagem: "https://images.unsplash.com/photo-1508873699372-7aeab60b44ab?auto=format&fit=crop&w=500&q=80",
        thumb: "https://images.unsplash.com/photo-1508873699372-7aeab60b44ab?auto=format&fit=crop&w=50px&q=80"
    },
    {
        id: 7,
        nome: "Trena a Laser 50 Metros",
        descricao: "Medição rápida e precisa com cálculo automático de área e volume.",
        preco: 189.90,
        imagem: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&w=500&q=80",
        thumb: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&w=50px&q=80"
    },
    {
        id: 8,
        nome: "Jogo de Chaves de Fenda Isoladas",
        descricao: "Kit com 6 peças isoladas para 1000V. Ponta magnética e cabo ergonômico.",
        preco: 75.50,
        imagem: "https://images.unsplash.com/photo-1590959651373-a3db0f38a961?auto=format&fit=crop&w=500&q=80",
        thumb: "https://images.unsplash.com/photo-1590959651373-a3db0f38a961?auto=format&fit=crop&w=50px&q=80"
    },
    {
        id: 9,
        nome: "Serra Circular de Bancada",
        descricao: "Motor potente para cortes precisos e retos em diversos tipos de madeira.",
        preco: 899.00,
        imagem: "https://images.unsplash.com/photo-1574169208507-84376144848b?auto=format&fit=crop&w=500&q=80",
        thumb: "https://images.unsplash.com/photo-1574169208507-84376144848b?auto=format&fit=crop&w=50px&q=80"
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

// Send form using FormSubmit (GMAIL)
async function enviarPedido(event) {
    event.preventDefault();

    const btn = document.getElementById('btnEnviar');
    btn.innerText = "Enviando...";
    btn.disabled = true;

    const form = document.getElementById('checkoutForm');
    
    const emailDestino = "mostafaayman2810@gmail.com"; 

    // تجميع البيانات
    const object = {
        _subject: "🛒 Novo Pedido - EletroPro", // عنوان الإيميل الذي سيصلك
        Nome: form.nome.value,
        Telefone: form.telefone.value,
        Endereco: form.endereco.value,
        Detalhes: form.detalhes_do_pedido.value,
        _template: "table" // تنسيق الإيميل ليصلك بشكل جدول أنيق داخل الجيميل
    };

    try {
        const response = await fetch(`https://formsubmit.co/ajax/${emailDestino}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(object)
        });

        const data = await response.json();

        if (data.success === "true" || response.ok) {
            // إظهار رسالة النجاح
            document.getElementById('checkoutFormContent').style.display = 'none';
            document.getElementById('checkoutSuccess').style.display = 'block';
            
            // تصفير السلة
            carrinho = [];
            atualizarCarrinho();
            form.reset();
        } else {
            alert("Erro ao enviar o pedido. Tente novamente.");
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
});
