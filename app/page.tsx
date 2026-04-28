"use client";

import { useState, useEffect } from "react";

const categorias = [
  {
    nome: "BOLO DE POTE",      
    preco: 10,
    imagem: "/bolo.jpg",
    itens: [
      "Ninho com morango",
      "Dois amores",
      "Brigadeiro",
      "Brigadeiro com morango",
      "Brigadeiro com maracujá",
      "Abacaxi com coco",
      "Prestigio",
    ],
  },
  {
    nome: "BOMBOM NO POTE",
    preco: 14,
    imagem: "/bombom.jpg",
    itens: ["Morango", "Uva"],
  },
  {
    nome: "MINI BOLO VULCÃO",
    preco: 15,
    imagem: "/bolo2.jpg",
    itens: [
      "Ninho com morango",
      "Dois amores",
      "Brigadeiro",
      "Brigadeiro com morango",
    ],
  },
  {
    nome: "CONE TRUFADO",
    preco: 10,
    imagem: "/cone.jpg",
    itens: [
      "Brigadeiro",
      "Brigadeiro com maracujá",
      "Dois amores",
      "Prestigio",
    ],
  },
  {
  nome: "BOLO COM NUTELLA",
  preco: 13,
  imagem: "/nutella1.jpg",
  itens: ["Ninho com Nutella"],
},
{
  nome: "VULCÃO COM NUTELLA",
  preco: 19,
  imagem: "/nutella2.jpg",
  itens: ["Ninho com Nutella"],
},
{
  nome: "CONE COM NUTELLA",
  preco: 14,
  imagem: "/nutella3.jpg",
  itens: ["Ninho com Nutella"],
},
];


export default function Home() {
  const [quantidades, setQuantidades] = useState<{ [key: string]: number }>({});
  const [total, setTotal] = useState(0);

  const alterar = (key: string, valor: number) => {
    setQuantidades((prev) => {
      const atual = prev[key] || 0;
      const novo = atual + valor;

      return {
        ...prev,
        [key]: novo < 0 ? 0 : novo,
      };
    });
  };

  // 🔥 AGORA SIM: useEffect no lugar certo
  useEffect(() => {
    let novoTotal = 0;

    categorias.forEach((cat, i) => {
      cat.itens.forEach((item, index) => {
        const key = `${i}-${index}`;
        const qtd = quantidades[key] || 0;

        novoTotal += qtd * cat.preco;
      });
    });

    setTotal(novoTotal);
  }, [quantidades]);

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        backgroundColor: "#fff6f7",
        backgroundImage: "url('/pattern.png')",
        backgroundRepeat: "repeat",
        backgroundSize: "250px",
        backgroundAttachment: "fixed",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        paddingTop: 0,
      }}
    >
      {/* CONTAINER PRINCIPAL */}
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 700,
          padding: "20px 30px 60px 30px",
          boxSizing: "border-box",
        }}
      >
        

        {/* CONTEÚDO */}
        <div
          style={{
            position: "relative",
            zIndex: 1,
            padding: "20px 15px",
            boxSizing: "border-box",
          }}
        >
          {/* LOGO */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: 20,
            }}
          >
            <img
              src="/logo.png"
              style={{
                width: 150,
                borderRadius: "50%",
                boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
              }}
            />
          </div>

          {/* CARDS */}
          {categorias.map((cat, i) => (
            <div
              key={i}
              style={{
                background: "#fff0f3",
                borderRadius: 10,
                padding: "10px 10px",
                marginBottom: 0,
                border: "1px solid #f3c1c6",
              }}
            >
              {/* HEADER */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <h3
                    style={{
                      margin: 0,
                      fontWeight: "700",
                      fontSize: "16px",
                      color: "#c2185b",
                      backgroundColor: "#f6d2dd",
                      padding: "6px 14px",
                      borderRadius: "14px",
                      display: "inline-block",
                    }}
                  >
                    {cat.nome}
                  </h3>

                  <div style={{ display: "flex", flexDirection: "column" }}>
  

  <span style={{ color: "#000", fontWeight: "bold" }}>
    R$ {cat.preco},00
  </span>
</div>
                </div>

                <img
                  src={cat.imagem}
                  style={{
                    width: 90,
                    height: 90,
                    borderRadius: 12,
                    objectFit: "cover",
                  }}
                />
              </div>

              {/* ITENS */}
              {cat.itens.map((item, index) => {
                const key = `${i}-${index}`;

                return (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      borderBottom: "1px solid #eee",
                      padding: "6px 0",
                    }}
                  >
                    <span style={{ color: "#000" }}>{item}</span>

                    <div>
                      <button onClick={() => alterar(key, -1)} style={btn}>
                        -
                      </button>

                      <span style={{ margin: "0 10px", color: "#000" }}>
                        {quantidades[key] || 0}
                      </span>

                      <button onClick={() => alterar(key, 1)} style={btn}>
                        +
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}

          {/* BOTÃO */}
          {total > 0 && (
            <button
              onClick={() => {
                let mensagem =
  "Olá Nanda! quero fazer este pedido:%0A%0A";

                categorias.forEach((cat, i) => {
                  cat.itens.forEach((item, index) => {
                    const key = `${i}-${index}`;
                    const qtd = quantidades[key] || 0;

                    if (qtd > 0) {
                      mensagem += `• ${qtd}x ${item} (${cat.nome})%0A`;
                    }
                  });
                });

                mensagem += `%0A💰 Total: R$ ${total},00`;

                const telefone = "5511981223969";

                const url = `https://wa.me/${telefone}?text=${mensagem}`;

                window.open(url, "_blank");
              }}
              style={{
                width: "80%",
                margin: "15px auto 0 auto",
                display: "block",
                padding: 15,
                borderRadius: 20,
                background: "#25D366",
                color: "white",
                border: "none",
                fontWeight: "bold",
                fontSize: 16,
                marginTop: 15,
              }}
            >
              Finalizar pedido
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

const btn = {
  background: "#f8d4d9",
  border: "none",
  padding: "4px 10px",
  borderRadius: 6,
};