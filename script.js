// مصفوفة تخزين منتجات السلة
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
