// دالة إرسال الطلب إلى الإيميل مع بيانات السلة
async function enviarPedido(event) {
    event.preventDefault(); // يمنع إعادة تحميل الصفحة عند الضغط على إرسال

    const btn = document.getElementById('btnEnviar') || document.querySelector('button[type="submit"]');
    const textoOriginal = btn ? btn.innerText : 'Enviar';
    
    // تغيير شكل الزر أثناء الإرسال
    if (btn) {
        btn.innerText = "Enviando..."; 
        btn.disabled = true;
    }

    const form = document.getElementById('checkoutForm') || event.target;
    
    // 1. تجميع المنتجات من السلة وحساب الإجمالي
    let produtosCart = "";
    let totalPedido = 0;

    if (typeof carrinho !== 'undefined' && carrinho.length > 0) {
        produtosCart = carrinho.map((item, index) => {
            let preco = parseFloat(item.preco) || 0;
            totalPedido += preco;
            return `${index + 1}. ${item.nome} - R$ ${preco.toFixed(2)}`;
        }).join("\n");
        produtosCart += `\n\nTotal do Pedido: R$ ${totalPedido.toFixed(2)}`;
    } else {
        alert("O carrinho está vazio! Adicione produtos antes de enviar.");
        if (btn) { btn.innerText = textoOriginal; btn.disabled = false; }
        return; // إيقاف الإرسال إذا كانت السلة فارغة
    }

    // 2. تجميع بيانات العميل من الفورم + المنتجات
    const dadosPedido = {
        Nome: form.nome ? form.nome.value : "",
        Telefone: form.telefone ? form.telefone.value : "",
        Endereco: form.endereco ? form.endereco.value : "",
        Detalhes: form.detalhes_do_pedido ? form.detalhes_do_pedido.value : "",
        Produtos_Solicitados: produtosCart // المنتجات ستظهر هنا في الإيميل
    };

    try {
        // 3. الإرسال إلى رابط Formspree الخاص بك
        const response = await fetch("https://formspree.io/f/mnpnvrdy", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(dadosPedido)
        });

        // 4. في حالة النجاح
        if (response.ok) {
            alert("Pedido enviado com sucesso! Entraremos em contato em breve.");
            
            // تفريغ السلة وتحديث الواجهة
            if (typeof carrinho !== 'undefined') carrinho = [];
            if (typeof atualizarCarrinho === 'function') atualizarCarrinho();
            
            form.reset(); // تفريغ خانات الفورم
            
        } else {
            alert("Erro ao enviar o pedido. Tente novamente.");
        }
    } catch (error) {
        console.error("Erro:", error);
        alert("Erro de conexão. Verifique sua internet.");
    } finally {
        // 5. إرجاع الزر لحالته الطبيعية في كل الأحوال
        if (btn) {
            btn.innerText = textoOriginal;
            btn.disabled = false;
        }
    }
}

// تأكد من تشغيل الدالة عند الضغط على زر الإرسال في الفورم
const formCheckout = document.getElementById('checkoutForm');
if (formCheckout) {
    formCheckout.addEventListener('submit', enviarPedido);
}

