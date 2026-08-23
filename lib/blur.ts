/**
 * Placeholder de carregamento das imagens (`placeholder="blur"` do
 * next/image). As fotos surgem com um fade em vez de "pipocar" na tela.
 *
 * Portado do Marcelo Imóveis, com uma diferença: lá o tom era cinza-claro
 * porque o site é claro. Aqui o retângulo tem que ser rgb(var(--superficie)) (nevoa), a
 * cor das superfícies do tema escuro — um placeholder claro daria um
 * flash branco no meio de uma página quase preta, que é pior que não ter
 * placeholder nenhum.
 */
export const BLUR_ESCURO =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='12'%3E%3Crect width='16' height='12' fill='%2314121E'/%3E%3C/svg%3E";
