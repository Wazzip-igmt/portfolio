# Douglas · Wazzip

Portfólio estático em português, feito com **HTML5, CSS3 e JavaScript puro**. Não depende de Node.js, compilação, frameworks, serviços de formulário ou recursos externos para funcionar.

## Abrir

Abra `index.html` no navegador. Também é possível usar um servidor estático:

```bash
python3 -m http.server 8000
```

Execute o comando nesta pasta e abra `http://localhost:8000`.

## Estrutura

- `index.html`: apresentação, imagem de perfil, resumo e projetos.
- `sobre.html`: formação, perfil e forma de estudar.
- `trajetoria.html`: evolução dos estudos, sem datas inventadas.
- `tecnologias.html`: linguagens, ferramentas e conhecimentos de Java.
- `projetos.html`: quatro projetos com descrições e prévias.
- `objetivos.html`: próximos objetivos de aprendizado.
- `contato.html`: GitHub e espaços preparados para e-mail e LinkedIn.
- `styles.css`: fontes, tokens, componentes, interações e responsividade.
- `script.js`: menu móvel, parallax, revelação ao rolar e controle de animações.
- `config.js`: informações opcionais ainda não fornecidas.
- `assets/`: fontes, ícones e imagens locais.

## Preencher os dados restantes

Edite somente os valores vazios de `config.js`:

| Campo | Conteúdo esperado |
| --- | --- |
| `email` | Seu endereço de e-mail real, sem `mailto:`. |
| `linkedin` | URL HTTPS completa do seu perfil no LinkedIn. |
| `imcRepository` | URL HTTPS real do repositório da calculadora no GitHub. |
| `swingRepository` | URL HTTPS real do repositório das aplicações Swing no GitHub. |

Os campos vazios aparecem como **A adicionar**, sem âncoras falsas ou botões que não funcionam. Depois de preenchidos com endereços válidos, o JavaScript os transforma em links. E-mail e LinkedIn não têm dados presumidos. Não existe formulário simulando o envio de mensagens.

Os links já confirmados são:

- Perfil: https://github.com/Wazzip-igmt
- Sistema bancário: https://github.com/Wazzip-igmt/JavaBank
- Star Wars: https://github.com/Wazzip-igmt/Acerca-StarWars-
- Site Star Wars: https://wazzip-igmt.github.io/Acerca-StarWars-/

## Referência e recursos

A recriação preserva a linguagem visual do projeto de referência em `/home/douglas/Downloads/portifolio-main`: tema preto e off-white, acento coral, Satoshi, Anton, JetBrains Mono, cartazes, faixas tipográficas, símbolos, papel quadriculado e bordas rasgadas. A navegação continua organizada em páginas. A referência não foi modificada.

- O quadriculado usa um pequeno SVG repetido. **Não há gradientes no HTML, CSS ou SVG do portfólio.**
- A imagem `assets/images/douglas.jpg` é uma cópia integral do JPG fornecido, sem edição, recompressão ou alteração de proporção. O enquadramento e a moldura coral são feitos em CSS.
- As fontes Satoshi foram copiadas da referência; Anton e JetBrains Mono foram obtidas no Google Fonts e são servidas localmente.
- Os símbolos decorativos e os ícones Git, GitHub, Gmail e LinkedIn vêm da referência. Os logos Java, HTML5, CSS3, IntelliJ IDEA e Apache NetBeans vêm do [Devicon](https://github.com/devicons/devicon), preservando as marcas correspondentes.
- A prévia de Star Wars é uma captura real do site publicado. As outras prévias são representações vetoriais identificadas nas legendas, não capturas fictícias. A do banco se baseia no menu documentado no repositório.
- Os créditos do modelo visual são de [Thiago Dutra](https://github.com/dutrathiagodev/portifolio). As informações apresentadas no novo site são exclusivamente as fornecidas por Douglas.

## Acessibilidade e movimento

Há link para pular ao conteúdo, navegação por teclado, foco visível, identificação da página atual e menu móvel com `aria-expanded`, fechamento por Escape e devolução do foco. Os textos continuam disponíveis sem JavaScript.

As faixas podem ser pausadas pelo botão **Pausar animações**. A preferência é lembrada no navegador quando permitido. O site respeita a preferência de movimento reduzido do sistema e desativa o parallax em dispositivos de toque. O cursor nativo é preservado: a interação da referência é feita pelas camadas do hero e pelos estados de hover.

## Publicação

Envie o conteúdo completo desta pasta para qualquer hospedagem de sites estáticos. Os caminhos são relativos e funcionam também em subpastas, como no GitHub Pages. Ao definir o domínio final, substitua os valores relativos de `og:image` nos arquivos HTML pela URL pública absoluta de `assets/images/compartilhamento.jpg` para maior compatibilidade com serviços de compartilhamento. Não foi inventado um domínio para o portfólio.

## Verificações realizadas

- Sete documentos HTML válidos e JavaScript sem erros de sintaxe.
- **84 cenários de layout no Chromium**: sete páginas em 12 larguras, de 320 a 1920 pixels, sem rolagem horizontal, títulos cortados ou imagens ausentes.
- **14 verificações automatizadas de acessibilidade com axe-core**, em desktop e emulação móvel, sem violações detectadas nas regras WCAG A/AA avaliadas. Isso não equivale a uma certificação de acessibilidade.
- Menu móvel, Escape, retorno do foco, link para pular ao conteúdo, navegação, âncoras dos projetos, parallax e pausa das animações testados.
- Preferência de movimento reduzido testada tanto no carregamento quanto durante o parallax.
- Abertura direta por `file://`, navegação sem JavaScript e ativação dos campos opcionais com dados de teste em memória verificadas. Nenhum dado de teste foi salvo em `config.js`.
- Os quatro endereços externos publicados responderam com HTTP 200. Todos os caminhos locais foram conferidos, incluindo fontes e imagem de compartilhamento.
- Nenhum erro de execução ou recurso HTTP local ausente nos testes de navegador.
- Os **101 arquivos da referência** permaneceram inalterados, conferidos por SHA-256. A foto usada é idêntica, byte a byte, ao JPG indicado.

Os testes móveis foram feitos por emulação de viewport e toque no Chromium, não em um celular físico. A sensação do toque e o comportamento das barras do navegador ainda devem ser conferidos em um aparelho real.
