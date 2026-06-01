# Dashboard de Vendas Porsche

## Visão Geral
Um dashboard **premium**, estilizado como o site oficial da Porsche Brasil, que visualiza os dados de vendas do arquivo `Dados_porsche_sanitizado.xlsx`. Os dados são incorporados como JSON (`full_data.json`) e renderizados com **Chart.js**. A interface utiliza tema escuro, painéis em glass‑morphism, acentos vermelhos e micro‑animações sutis.

## Funcionalidades
- **Interface elegante**: Gradiente escuro, vermelho da Porsche, painéis em glass‑morphism e efeitos de foco suaves.
- **Dados embutidos**: Todo o conjunto de dados (105 linhas) está incluído como `const embeddedData = [...]` no `script.js`.
- **Filtros interativos** (modelo, ano, cidade, método de pagamento) que atualizam os gráficos em tempo real.
- **Três gráficos**: contagem de veículos por modelo (barra), preço médio por ano (linha) e potência vs consumo (scatter).
- **Tabela Top‑10**: lista os veículos mais caros após filtragem.
- **Responsivo**: layout adaptável a diferentes tamanhos de tela.
- **Sem backend**: tudo roda no cliente, sem necessidade de servidor.
- **Acessibilidade**: contraste adequado, tipografia legível, foco por teclado.

## Tecnologias Utilizadas
- **HTML5** – marcação semântica e meta tags SEO.
- **CSS3** – tema escuro customizado, glass‑morphism, grid responsivo.
- **JavaScript (ES6)** – manipulação de dados e integração com Chart.js.
- **Chart.js v4** – renderização dos gráficos (via CDN).
- **SheetJS (xlsx.full.min.js)** – (opcional) para importação futura de arquivos Excel.
- **Google Font – Inter** – tipografia moderna.
- **Python** – script `process_data.py` opcional para gerar `full_data.json` a partir da planilha.

## Instalação e Configuração
1. **Clonar o repositório**
   ```bash
   git clone <url-do-repositorio>
   cd "Excel com IA"
   ```
2. **Criar um ambiente virtual Python** (necessário apenas para o script de processamento de dados)
   ```bash
   python3 -m venv .venv
   source .venv/bin/activate   # Linux/macOS
   # Windows: .venv\Scripts\activate
   pip install -r requirements.txt   # caso exista um requirements.txt
   ```
3. **Gerar o JSON a partir do XLSX** (se você modificar a planilha)
   ```bash
   python process_data.py   # lê Dados_porsche_sanitizado.xlsx e gera full_data.json
   ```
   O dashboard já inclui `full_data.json` gerado a partir da planilha original.

4. **Abrir o dashboard**
   - Abra `dashboard.html` diretamente no navegador (Chrome, Firefox, Edge). 
   - **Opcional**: servir o arquivo via servidor estático local para evitar warnings de CORS:
     ```bash
     python -m http.server 8000
     # depois acesse http://localhost:8000/dashboard.html
     ```

## Estrutura do Projeto
```
Excel com IA/
├─ dashboard.html                # ponto de entrada HTML
├─ style.css                    # estilos – tema Porsche premium
├─ script.js                    # lógica JavaScript e renderização dos charts
├─ full_data.json                # dados incorporados (gerados a partir do XLSX)
├─ Dados_porsche_sanitizado.xlsx # planilha original (referência)
├─ process_data.py               # script Python de conversão XLSX → JSON
├─ .venv/                       # ambiente virtual Python (opcional)
└─ README.md                    # este documento
```

## Decisões de Design
- **Paleta de cores** – vermelho Porsche `#d5001d` combinado com fundo escuro `#111111` e gradiente `linear-gradient(135deg, #0a0a0a, #1a1a1a)`. 
- **Tipografia** – Google Font **Inter** (pesos 400/600/700) para leitura clara e moderna. 
- **Glass‑morphism** – painéis usam `backdrop-filter: blur(6‑12px)` com fundo semitransparente para criar profundidade. 
- **Micro‑animações** – `fadeInUp` nos cards e transições suaves ao passar o mouse nos controles. 
- **Acessibilidade** – contraste adequado, foco visível nos elementos de formulário e cores legíveis.

## Testes e Validação
* **Manual** – abra a página, verifique o carregamento dos gráficos, o funcionamento dos filtros e a exibição correta da imagem hero. Teste em desktop e dispositivos móveis.
* **Automatizado (opcional)** – use Selenium ou Playwright para validar que não há erros de console e que os elementos essenciais estão presentes.

## Contribuindo
1. **Fork** o repositório.
2. **Crie uma branch** (`git checkout -b feature/nova-interface`).
3. **Faça suas alterações** mantendo a consistência com as variáveis CSS em `:root` e o padrão de glass‑morphism.
4. **Commit** e **push**.
5. **Abra um Pull Request** descrevendo a mudança e, se necessário, inclua capturas de tela.

## Licença
Este projeto é fornecido **como está** para fins educacionais. Sinta‑se livre para adaptar o código e o design para uso pessoal ou comercial, mas dê crédito ao autor original.

---
*Criado com 🤖 Antigravity IDE*
