let cart = {};
let total = 0;
let entrega = 0;

// ADICIONAR / REMOVER
function alterarQtd(nome, preco, change, selectId) {

    let nomeFinal = nome;

    if (selectId) {
        let sabor = document.getElementById(selectId).value;
        nomeFinal = nome + " - " + sabor;
    }

    if (!cart[nomeFinal]) {
        cart[nomeFinal] = { qtd: 0, preco: preco };
    }

    cart[nomeFinal].qtd += change;

    if (cart[nomeFinal].qtd <= 0) {
        delete cart[nomeFinal];
    }

    atualizarTela(nome);
    atualizarCarrinho();
}

// ATUALIZA QUANTIDADE NA TELA
function atualizarTela(nomeBase) {
    let el = document.getElementById("qtd-" + nomeBase);
    let totalQtd = 0;

    for (let item in cart) {
        if (item.includes(nomeBase)) {
            totalQtd += cart[item].qtd;
        }
    }

    if (el) el.textContent = totalQtd;
}

// ATUALIZA CARRINHO
function atualizarCarrinho() {

    let lista = document.getElementById("cart-list");
    lista.innerHTML = "";
    total = 0;

    for (let item in cart) {
        let dados = cart[item];
        let subtotal = dados.qtd * dados.preco;
        total += subtotal;

        let li = document.createElement("li");
        li.textContent = `${item} x${dados.qtd} - R$ ${subtotal.toFixed(2)}`;
        lista.appendChild(li);
    }

    document.getElementById("total").textContent =
        "Total: R$ " + (total + entrega).toFixed(2);
}
function verificarPagamento() {
    let pagamento = document.getElementById("pagamento").value;
    let troco = document.getElementById("areaTroco");

    if (pagamento === "Dinheiro") {
        troco.style.display = "block";
    } else {
        troco.style.display = "none";
    }
}
function verificarLoja() {
    const hoje = new Date().getDay(); // 0=domingo, 1=segunda...
    const status = document.getElementById("statusLoja");

    // Dias abertos: segunda(1), terça(2), quinta(4), sábado(6)
    if (hoje === 1 || hoje === 2 || hoje === 4 || hoje === 6) {
        status.innerHTML = "🟢 Aberto hoje - 19h às 23h";
        status.style.color = "lightgreen";
    } else {
        status.innerHTML = "🔴 Fechado hoje";
        status.style.color = "red";
    }
}

verificarLoja();

// ENVIAR PRO WHATSAPP
function enviarWhats() {

    let nome = document.getElementById("nome").value;
    let endereco = document.getElementById("endereco").value;
    let obs = document.getElementById("obs").value;
    let pagamento = document.getElementById("pagamento").value;
    let troco = document.getElementById("troco").value;

    if (Object.keys(cart).length === 0) {
        alert("Adicione algum item!");
        return;
    }

   function finalizarPedido() {
  let mensagem = "🍔 *SANTOS BURGUER*\n";
  mensagem += "📍 Vitória do Xingu - PA\n\n";
  mensagem += "🧾 *Pedido:*\n";

  let total = 0;

  carrinho.forEach(item => {
    mensagem += `• ${item.nome} x${item.qtd} - R$ ${(item.preco * item.qtd).toFixed(2)}\n`;
    total += item.preco * item.qtd;
  });

  mensagem += `\n💰 *Total:* R$ ${total.toFixed(2)}\n`;

  const pagamento = document.querySelector('input[name="pagamento"]:checked').value;

  mensagem += `💳 Pagamento: ${pagamento}\n`;

  if (pagamento === "Dinheiro") {
    const troco = document.getElementById("troco").value;
    mensagem += `💵 Troco para: R$ ${troco}\n`;
  }

  mensagem += "\n📲 Pedido automático";

  const numero = "5593991681029"; // 🔴 COLOCA SEU NÚMERO AQUI

  const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;

  window.open(url, "_blank");
}